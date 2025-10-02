import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/auth/AuthContext';
import Header from '../../components/Layout/Header';
import Table from '../../components/UI/Table';
import Button from '../../components/UI/Button';
import Modal from '../../components/UI/Modal';
import { companyService, chaseupRuleService } from '../../services';
import type { Company } from '../../types';
import { CreditCard as Edit, Archive, Copy, Plus, Upload, Search, ListFilter as Filter, X } from 'lucide-react';
import { PERMISSIONS } from '@/types/auth';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import showToast from '../../components/ui/Toast';

export default function CompaniesPage() {
  const navigate = useNavigate();
  const { user, hasPermission } = useAuth();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    contractType: '',
    businessSector: '',
    parentCompany: '',
    status: '',
    archived: 'active'
  });
  const [sortKey, setSortKey] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [chaseupRulesCache, setChaseupRulesCache] = useState<Record<string, boolean>>({});
  const [archiveModal, setArchiveModal] = useState<{ open: boolean; company?: Company }>({ open: false });
  const [duplicateModal, setDuplicateModal] = useState<{ open: boolean; company?: Company }>({ open: false });
  const [duplicateForm, setDuplicateForm] = useState({
    companyName: '',
    senderName: '',
    webhookUrl: '',
    errors: {
      companyName: '',
      senderName: '',
      webhookUrl: ''
    }
  });

  // Load companies data
  const loadCompanies = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await companyService.getAll({
        search: debouncedSearchTerm,
        contractType: filters.contractType || undefined,
        businessSector: filters.businessSector || undefined,
        parentCompany: filters.parentCompany || undefined,
        status: filters.status || undefined,
        archived: filters.archived || undefined
      });
      setCompanies(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load companies');
    } finally {
      setLoading(false);
    }
  };

  // Load companies on mount and when filters change
  useEffect(() => {
    loadCompanies();
  }, [debouncedSearchTerm, filters]);

  // Debounce search term to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Load chase-up rules status for companies
  useEffect(() => {
    const loadChaseupRulesStatus = async () => {
      if (!companies || companies.length === 0) return;
      
      try {
        const rulesPromises = companies.map(async (company) => {
          try {
            const response = await chaseupRuleService.getChaseupRulesByCompany(company.name);
            return { companyName: company.name, hasRules: response.data.length > 0 };
          } catch {
            return { companyName: company.name, hasRules: false };
          }
        });
        
        const results = await Promise.all(rulesPromises);
        const cache = results.reduce((acc, result) => {
          acc[result.companyName] = result.hasRules;
          return acc;
        }, {} as Record<string, boolean>);
        
        setChaseupRulesCache(cache);
      } catch (error) {
        console.error('Failed to load chase-up rules status:', error);
      }
    };

    loadChaseupRulesStatus();
  }, [companies]);

  const handleArchive = async (company: Company) => {
    try {
      await companyService.archive(company.id);
      setArchiveModal({ open: false });
      showToast.success('Company archived successfully');
      loadCompanies(); // Refresh the list
    } catch (error) {
      console.error('Failed to archive company:', error);
      showToast.error('Failed to archive company');
    }
  };

  const handleDuplicate = async (company: Company) => {
    if (!validateDuplicateForm()) {
      return;
    }

    try {
      await companyService.duplicate(company.id, duplicateForm.companyName);
      setDuplicateModal({ open: false });
      setDuplicateForm({
        companyName: '',
        senderName: '',
        webhookUrl: '',
        errors: { companyName: '', senderName: '', webhookUrl: '' }
      });
      showToast.success('Company duplicated successfully');
      loadCompanies(); // Refresh the list
    } catch (error) {
      console.error('Failed to duplicate company:', error);
      showToast.error('Failed to duplicate company');
    }
  };

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const openDuplicateModal = (company: Company) => {
    setDuplicateForm({
      companyName: `${company.name} (Copy)`,
      senderName: '',
      webhookUrl: '',
      errors: {
        companyName: '',
        senderName: '',
        webhookUrl: ''
      }
    });
    setDuplicateModal({ open: true, company });
  };

  const openArchiveModal = (company: Company) => {
    setArchiveModal({ open: true, company });
  };

  const validateDuplicateForm = () => {
    const errors = {
      companyName: '',
      senderName: '',
      webhookUrl: ''
    };

    if (!duplicateForm.companyName.trim()) {
      errors.companyName = 'Company name is required';
    }

    if (!duplicateForm.senderName.trim()) {
      errors.senderName = 'Sender name is required';
    }

    if (!duplicateForm.webhookUrl.trim()) {
      errors.webhookUrl = 'Webhook URL is required';
    } else if (!/^https?:\/\/.+/.test(duplicateForm.webhookUrl)) {
      errors.webhookUrl = 'Please enter a valid URL';
    }

    setDuplicateForm(prev => ({ ...prev, errors }));
    return !errors.companyName && !errors.senderName && !errors.webhookUrl;
  };

  const handleDuplicateFormChange = (field: string, value: string) => {
    setDuplicateForm(prev => ({
      ...prev,
      [field]: value,
      errors: {
        ...prev.errors,
        [field]: ''
      }
    }));
  };
  const confirmDuplicate = async () => {
    if (!validateDuplicateForm()) {
      return;
    }

    if (duplicateModal.company) {
      try {
        const response = await duplicateCompany?.(
          duplicateModal.company.id, 
          duplicateForm.companyName
        );
        
        if (response) {
          setDuplicateModal({ open: false });
          setDuplicateForm({
            companyName: '',
            senderName: '',
            webhookUrl: '',
            errors: {
              companyName: '',
              senderName: '',
              webhookUrl: ''
            }
          });
        }
      } catch (error) {
        console.error('Failed to duplicate company:', error);
      }
    }
  };

  const clearFilters = () => {
    setFilters({
      contractType: '',
      businessSector: '',
      parentCompany: '',
      status: '',
      archived: 'active'
    });
    setSearchTerm('');
    setDebouncedSearchTerm('');
  };

  const hasActiveFilters = searchTerm || Object.values(filters).some(filter => filter !== '' && filter !== 'active');

  // Helper function to check if company has chase-up rules
  const hasChaseupRules = (companyName: string) => {
    return chaseupRulesCache[companyName] || false;
  };

  const columns = [
    { key: 'name', label: 'Company Name', sortable: true,
      render: (value: string, row: Company) => (
        <div className="flex items-center gap-2">
          <span className={row.isArchived ? 'text-gray-500' : ''}>{value}</span>
          {row.isArchived && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
              Archived
            </span>
          )}
        </div>
      )
    },
    { key: 'identifier', label: 'Identifier', sortable: true },
    { key: 'companyCode', label: 'Company ID', sortable: true },
    { 
      key: 'apiToken', 
      label: 'API Token',
      render: (value: string) => (
        <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
          {value.substring(0, 12)}...
        </span>
      )
    },
    { key: 'currentApiRequests', label: 'Current Requests', sortable: true },
    { key: 'maxApiRequests', label: 'Max Requests', sortable: true },
    { key: 'requestsExpiryDate', label: 'Expiry Date', sortable: true },
    { key: 'parentCompany', label: 'Parent Company' },
    { key: 'childrenCount', label: 'Children', sortable: true },
    {
      key: 'chaseupRules',
      label: 'Chase-up Rules',
      render: (_: unknown, row: Company) => {
        const hasRules = hasChaseupRules(row.name);
        return (
          <div className="flex items-center gap-2">
            {hasRules ? (
              <button
                onClick={() => navigate(`/chaseup-rules?company=${encodeURIComponent(row.name)}`)}
                className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full hover:bg-green-