import { useState, useEffect, useRef, useMemo } from 'react';
import { useAuth } from '@/auth/AuthContext';
import { useTranslation } from 'react-i18next';
import Header from '../../components/Layout/Header';
import Table, { Column } from '../../components/UI/Table';
import Button from '../../components/UI/Button';
import Modal from '../../components/UI/Modal';
import Input from '../../components/UI/Input';
import { User } from '../../types';
import { usersService } from '../../services/usersService';
import { companiesService } from '../../services/companiesService';
import { CreditCard as Edit, Trash2, Plus, Search, ListFilter as Filter, X, Mail, ChevronDown } from 'lucide-react';
import { useModalState, useDebouncedSearch, useColumnOrder } from '@/hooks';
import { createErrorHandler } from '@/utils';

export default function UsersPage() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, debouncedSearchTerm, setSearchTerm] = useDebouncedSearch(500);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    role: '',
    status: '',
    company: ''
  });
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  // Sorting state
  const [sortKey, setSortKey] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [createModal, setCreateModal] = useState(false);
  const [createFormData, setCreateFormData] = useState({
    email: '',
    role: 'user',
    company: ''
  });
  const [createErrors, setCreateErrors] = useState({
    email: '',
    role: '',
    company: ''
  });
  const [companies, setCompanies] = useState<Array<{ objectId: string; id: string; name: string; identifier?: string }>>([]);
  const [companySearchTerm, setCompanySearchTerm] = useState('');
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);
  const companyDropdownRef = useRef<HTMLDivElement>(null);
  const [editCompanySearchTerm, setEditCompanySearchTerm] = useState('');
  const [showEditCompanyDropdown, setShowEditCompanyDropdown] = useState(false);
  const editCompanyDropdownRef = useRef<HTMLDivElement>(null);
  const [filterCompanySearchTerm, setFilterCompanySearchTerm] = useState('');
  const [showFilterCompanyDropdown, setShowFilterCompanyDropdown] = useState(false);
  const filterCompanyDropdownRef = useRef<HTMLDivElement>(null);
  const editModal = useModalState<User>();
  const passwordResetModal = useModalState<User>();
  const passwordResetSuccessModal = useModalState<User>();
  const [editFormData, setEditFormData] = useState({
    email: '',
    role: '',
    company: '',
    status: 'active'
  });
  const [editErrors, setEditErrors] = useState({
    email: '',
    role: '',
    company: ''
  });

  // Error handler
  const handleError = createErrorHandler(setError);

  // Reset to page 1 when search/filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, filters.role, filters.status, filters.company]);

  // Load users on mount and when filters/pagination changes
  useEffect(() => {
    loadUsers();
  }, [currentPage, pageSize, debouncedSearchTerm, filters.role, filters.status, filters.company]);

  // Load companies on mount
  useEffect(() => {
    loadCompanies();
  }, []);

  // Close company dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (companyDropdownRef.current && !companyDropdownRef.current.contains(event.target as Node)) {
        setShowCompanyDropdown(false);
      }
      if (editCompanyDropdownRef.current && !editCompanyDropdownRef.current.contains(event.target as Node)) {
        setShowEditCompanyDropdown(false);
      }
      if (filterCompanyDropdownRef.current && !filterCompanyDropdownRef.current.contains(event.target as Node)) {
        setShowFilterCompanyDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const params: {
        page: number;
        limit: number;
        search?: string;
        role?: string;
        status?: string;
        companyId?: string;
      } = {
        page: currentPage,
        limit: pageSize
      };

      if (debouncedSearchTerm) params.search = debouncedSearchTerm;
      if (filters.role) params.role = filters.role;
      if (filters.status) params.status = filters.status;
      if (filters.company) params.companyId = filters.company;

      const response = await usersService.getUsers(params);
      setUsers(response.data);
      setTotalPages(response.pagination.totalPages);
      setTotalUsers(response.pagination.total);
    } catch (error) {
      handleError(error);
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCompanies = async () => {
    try {
      const companiesData = await companiesService.getAllCompaniesLight();
      setCompanies(companiesData);
    } catch (error) {
      console.error('Error loading companies:', error);
    }
  };

  const clearFilters = () => {
    setFilters({
      role: '',
      status: '',
      company: ''
    });
    setSearchTerm('');
    setFilterCompanySearchTerm('');
  };

  const hasActiveFilters = searchTerm || Object.values(filters).some(filter => filter !== '');

  // Sorting handler
  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  // Apply client-side sorting
  const sortedUsers = sortKey ? [...users].sort((a, b) => {
    const aValue = a[sortKey as keyof User];
    const bValue = b[sortKey as keyof User];

    if (aValue === undefined && bValue === undefined) return 0;
    if (aValue === undefined) return sortDirection === 'asc' ? 1 : -1;
    if (bValue === undefined) return sortDirection === 'asc' ? -1 : 1;

    let comparison = 0;
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      comparison = aValue.localeCompare(bValue);
    } else if (typeof aValue === 'number' && typeof bValue === 'number') {
      comparison = aValue - bValue;
    } else {
      comparison = String(aValue).localeCompare(String(bValue));
    }

    return sortDirection === 'asc' ? comparison : -comparison;
  }) : users;

  const defaultColumns: Column<User>[] = useMemo(() => [
    { key: 'email', label: t('users:fields.email'), sortable: true },
    { key: 'role', label: t('users:fields.role'), sortable: true,
      render: (value: unknown) => {
        const roleKey = value === 'superadmin' ? 'superAdmin' : value === 'admin' ? 'admin' : 'user';
        return (
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            value === 'superadmin' ? 'bg-purple-100 text-purple-800' :
            value === 'admin' ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {t(`users:roles.${roleKey}`)}
          </span>
        );
      }
    },
    { key: 'company', label: t('users:fields.company'), sortable: true },
    { key: 'status', label: t('users:fields.status'), sortable: true,
      render: (value: unknown, row: User) => (
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            value === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {t(`users:status.${value === 'active' ? 'active' : 'inactive'}`)}
          </span>
          {row.isDeleted && (
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800">
              {row.disabledReason || t('users:status.disabled')}
            </span>
          )}
        </div>
      )
    },
    {
      key: 'actions',
      label: t('users:fields.actions'),
      render: (_: unknown, row: User) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleEditUser(row)}
            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
            title={t('users:tooltips.editUser')}
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => handleSendPasswordReset(row)}
            className="p-2 text-orange-600 hover:bg-orange-100 rounded-lg transition-colors"
            title={t('users:tooltips.sendPasswordReset')}
          >
            <Mail size={16} />
          </button>
          <button
            onClick={() => handleDeleteUser(row)}
            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
            title={t('users:tooltips.deleteUser')}
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ], [t]);

  const { orderedColumns, handleReorder } = useColumnOrder<User>(
    'users-column-order',
    defaultColumns
  );

  const handleSendPasswordReset = (user: User) => {
    passwordResetModal.open(user);
  };

  const confirmPasswordReset = async () => {
    if (!passwordResetModal.data) return;

    try {
      await usersService.sendPasswordReset(passwordResetModal.data.id);
      passwordResetModal.close();
      passwordResetSuccessModal.open(passwordResetModal.data);
    } catch (error) {
      console.error('Error sending password reset:', error);
      alert('Failed to send password reset email');
    }
  };

  const handleEditUser = (user: User) => {
    // Find the company objectId from the company name
    const foundCompany = companies.find(c => c.name === user.company);

    setEditFormData({
      email: user.email,
      role: user.role,
      company: foundCompany ? (foundCompany.objectId || foundCompany.id) : '',
      status: user.status
    });
    setEditCompanySearchTerm(user.company || '');
    setEditErrors({
      email: '',
      role: '',
      company: ''
    });
    editModal.open(user);
  };

  const handleEditFormChange = (field: string, value: string) => {
    setEditFormData(prev => ({ ...prev, [field]: value }));
    setEditErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateEditForm = () => {
    const newErrors = {
      email: '',
      role: '',
      company: ''
    };

    if (!editFormData.email.trim()) {
      newErrors.email = t('users:validation.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editFormData.email)) {
      newErrors.email = t('users:validation.emailInvalid');
    }

    if (!editFormData.role) {
      newErrors.role = t('users:validation.roleRequired');
    }

    if (!editFormData.company) {
      newErrors.company = t('users:validation.companyRequired');
    }

    setEditErrors(newErrors);
    return !newErrors.email && !newErrors.role && !newErrors.company;
  };

  const handleSaveEdit = async () => {
    if (!validateEditForm() || !editModal.data) {
      return;
    }

    try {
      await usersService.updateUser(editModal.data.id, {
        email: editFormData.email,
        role: editFormData.role as 'superadmin' | 'admin' | 'user',
        companyId: editFormData.company,
        status: editFormData.status as 'active' | 'inactive'
      });
      editModal.close();
      setEditCompanySearchTerm('');
      setShowEditCompanyDropdown(false);
      await loadUsers(); // Reload users
    } catch (error) {
      console.error('Error updating user:', error);
      alert(t('users:messages.updateUserFailed'));
    }
  };

  const handleDeleteUser = async (user: User) => {
    if (!confirm(t('users:messages.deleteConfirm', { email: user.email }))) {
      return;
    }

    try {
      await usersService.deleteUser(user.id, 'Disabled');
      await loadUsers(); // Reload users
    } catch (error) {
      console.error('Error deleting user:', error);
      alert(t('users:messages.deleteUserFailed'));
    }
  };

  const validateCreateForm = () => {
    const newErrors = {
      email: '',
      role: '',
      company: ''
    };

    if (!createFormData.email.trim()) {
      newErrors.email = t('users:validation.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(createFormData.email)) {
      newErrors.email = t('users:validation.emailInvalid');
    }

    if (!createFormData.role) {
      newErrors.role = t('users:validation.roleRequired');
    }

    if (!createFormData.company) {
      newErrors.company = t('users:validation.companyRequired');
    }

    setCreateErrors(newErrors);
    return !newErrors.email && !newErrors.role && !newErrors.company;
  };

  const handleCreateUser = async () => {
    if (!validateCreateForm()) {
      return;
    }

    try {
      await usersService.createUser({
        email: createFormData.email,
        role: createFormData.role as 'superadmin' | 'admin' | 'user',
        companyId: createFormData.company
      });
      setCreateModal(false);
      setCreateFormData({ email: '', role: 'user', company: '' });
      setCompanySearchTerm('');
      setShowCompanyDropdown(false);
      await loadUsers(); // Reload users
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create user');
    }
  };


  if (loading) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Users" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-500">Loading users...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Users" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-red-600">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header title={t('users:title')} />

      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{t('users:title')}</h2>
            <p className="text-sm text-gray-600">{t('users:subtitle')}</p>
          </div>
          <Button
            onClick={() => {
              setCreateModal(true);
              setCompanySearchTerm('');
              setCreateFormData({ email: '', role: 'user', company: '' });
              setCreateErrors({ email: '', role: '', company: '' });
            }}
            className="flex items-center gap-2"
          >
            <Plus size={16} />
            {t('users:create')}
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          {/* Search Bar */}
          <div className="flex gap-4">
            <div className="relative flex-1 max-w-md">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={t('users:placeholders.searchByEmail')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <Button
              variant="secondary"
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 ${hasActiveFilters ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}`}
            >
              <Filter size={16} />
              {t('users:labels.filters')}
              {hasActiveFilters && (
                <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {Object.values(filters).filter(f => f !== '').length + (searchTerm ? 1 : 0)}
                </span>
              )}
            </Button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('users:fields.role')}</label>
                  <select
                    value={filters.role}
                    onChange={(e) => setFilters(prev => ({ ...prev, role: e.target.value }))}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">{t('users:labels.allRoles')}</option>
                    <option value="superadmin">{t('users:roles.superAdmin')}</option>
                    <option value="admin">{t('users:roles.admin')}</option>
                    <option value="user">{t('users:roles.user')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('users:fields.status')}</label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">{t('users:labels.allStatus')}</option>
                    <option value="active">{t('users:status.active')}</option>
                    <option value="inactive">{t('users:status.inactive')}</option>
                  </select>
                </div>

                <div className="relative" ref={filterCompanyDropdownRef}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('users:fields.company')}</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={filterCompanySearchTerm}
                      onChange={(e) => {
                        setFilterCompanySearchTerm(e.target.value);
                        setShowFilterCompanyDropdown(true);
                      }}
                      onFocus={() => setShowFilterCompanyDropdown(true)}
                      className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder={t('users:placeholders.allCompanies')}
                    />
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>

                  {showFilterCompanyDropdown && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                      <div
                        onClick={() => {
                          setFilters(prev => ({ ...prev, company: '' }));
                          setFilterCompanySearchTerm('');
                          setShowFilterCompanyDropdown(false);
                        }}
                        className="px-3 py-2 hover:bg-blue-50 cursor-pointer border-b border-gray-100 font-medium text-gray-700"
                      >
                        {t('users:placeholders.allCompanies')}
                      </div>
                      {companies
                        .filter(company => {
                          const searchLower = (filterCompanySearchTerm || '').toLowerCase();
                          return (company.name && company.name.toLowerCase().includes(searchLower)) ||
                            (company.identifier && company.identifier.toLowerCase().includes(searchLower));
                        })
                        .map((company) => (
                          <div
                            key={company.objectId || company.id}
                            onClick={() => {
                              setFilters(prev => ({ ...prev, company: company.objectId || company.id }));
                              setFilterCompanySearchTerm(company.name);
                              setShowFilterCompanyDropdown(false);
                            }}
                            className="px-3 py-2 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                          >
                            <div className="font-medium text-sm text-gray-900">{company.name}</div>
                            {company.identifier && (
                              <div className="text-xs text-gray-500">{company.identifier}</div>
                            )}
                          </div>
                        ))}
                      {companies.filter(company => {
                        const searchLower = (filterCompanySearchTerm || '').toLowerCase();
                        return (company.name && company.name.toLowerCase().includes(searchLower)) ||
                          (company.identifier && company.identifier.toLowerCase().includes(searchLower));
                      }).length === 0 && filterCompanySearchTerm && (
                        <div className="px-3 py-2 text-sm text-gray-500">No companies found</div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {hasActiveFilters && (
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Showing {sortedUsers.length} of {totalUsers} users
                  </span>
                  <Button variant="secondary" size="sm" onClick={clearFilters}>
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg border border-gray-200">
          <Table<User>
            columns={orderedColumns}
            data={sortedUsers}
            sortKey={sortKey}
            sortDirection={sortDirection}
            onSort={handleSort}
            onColumnReorder={handleReorder}
          />

          {sortedUsers.length === 0 && !loading && (
            <div className="text-center py-8 text-gray-500">
              <p>{t('users:labels.noUsers')}</p>
              {hasActiveFilters && (
                <Button variant="secondary" onClick={clearFilters} className="mt-2">
                  {t('users:labels.clearFilters')}
                </Button>
              )}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>{t('users:labels.show')}</span>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="border border-gray-300 rounded px-2 py-1"
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                <span>{t('users:labels.perPage')}</span>
                <span className="ml-4">
                  {t('users:labels.showing', {
                    from: ((currentPage - 1) * pageSize) + 1,
                    to: Math.min(currentPage * pageSize, totalUsers),
                    total: totalUsers
                  })}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                >
                  {t('users:actions.first')}
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  {t('users:actions.previous')}
                </Button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-1 text-sm rounded ${
                          currentPage === pageNum
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  {t('users:actions.next')}
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                >
                  {t('users:actions.last')}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create User Modal */}
      <Modal
        isOpen={createModal}
        onClose={() => {
          setCreateModal(false);
          setCompanySearchTerm('');
          setShowCompanyDropdown(false);
        }}
        title={t('users:create')}
        size="md"
      >
        <div className="space-y-4">
          <Input
            label={t('users:fields.email')}
            type="email"
            placeholder={t('users:placeholders.email')}
            value={createFormData.email}
            onChange={(e) => {
              setCreateFormData(prev => ({ ...prev, email: e.target.value }));
              setCreateErrors(prev => ({ ...prev, email: '' }));
            }}
            error={createErrors.email}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('users:fields.role')}</label>
            <select
              value={createFormData.role}
              onChange={(e) => {
                setCreateFormData(prev => ({ ...prev, role: e.target.value }));
                setCreateErrors(prev => ({ ...prev, role: '' }));
              }}
              className={`block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                createErrors.role ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">{t('users:placeholders.selectRole')}</option>
              <option value="user">{t('users:roles.user')}</option>
              <option value="admin">{t('users:roles.admin')}</option>
              <option value="superadmin">{t('users:roles.superAdmin')}</option>
            </select>
            {createErrors.role && <p className="text-sm text-red-600 mt-1">{createErrors.role}</p>}
          </div>
          <div className="relative" ref={companyDropdownRef}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('users:fields.company')}</label>
            <div className="relative">
              <input
                type="text"
                value={companySearchTerm}
                onChange={(e) => {
                  setCompanySearchTerm(e.target.value);
                  setShowCompanyDropdown(true);
                }}
                onFocus={() => setShowCompanyDropdown(true)}
                className={`block w-full px-3 py-2 pr-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  createErrors.company ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder={t('users:placeholders.searchCompany')}
              />
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            {createErrors.company && <p className="text-sm text-red-600 mt-1">{createErrors.company}</p>}

            {showCompanyDropdown && (
              <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                {companies
                  .filter(company => {
                    const searchLower = (companySearchTerm || '').toLowerCase();
                    return (company.name && company.name.toLowerCase().includes(searchLower)) ||
                      (company.identifier && company.identifier.toLowerCase().includes(searchLower));
                  })
                  .map((company) => (
                    <div
                      key={company.objectId || company.id}
                      onClick={() => {
                        setCreateFormData(prev => ({ ...prev, company: company.objectId || company.id }));
                        setCompanySearchTerm(company.name);
                        setShowCompanyDropdown(false);
                        setCreateErrors(prev => ({ ...prev, company: '' }));
                      }}
                      className="px-3 py-2 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                    >
                      <div className="font-medium text-sm text-gray-900">{company.name}</div>
                      {company.identifier && (
                        <div className="text-xs text-gray-500">{company.identifier}</div>
                      )}
                    </div>
                  ))}
                {companies.filter(company => {
                  const searchLower = (companySearchTerm || '').toLowerCase();
                  return (company.name && company.name.toLowerCase().includes(searchLower)) ||
                    (company.identifier && company.identifier.toLowerCase().includes(searchLower));
                }).length === 0 && (
                  <div className="px-3 py-2 text-sm text-gray-500">{t('users:labels.noCompaniesFound')}</div>
                )}
              </div>
            )}
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              <strong>📧 {t('users:fields.password')}:</strong> {t('users:messages.passwordSetupInfo')}
            </p>
          </div>
          <div className="flex gap-3 justify-end pt-4">
            <Button variant="secondary" onClick={() => {
              setCreateModal(false);
              setCompanySearchTerm('');
              setShowCompanyDropdown(false);
            }}>
              {t('users:actions.cancel')}
            </Button>
            <Button onClick={handleCreateUser}>
              {t('users:actions.create')}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Password Reset Confirmation Modal */}
      <Modal
        isOpen={passwordResetModal.isOpen}
        onClose={() => passwordResetModal.close()}
        title={t('users:messages.sendPasswordResetEmail')}
        size="md"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            {t('users:messages.sendPasswordResetConfirm')}{' '}
            <strong>{passwordResetModal.data?.email}</strong>?
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              <strong>📧 Note:</strong> {t('users:messages.passwordResetNote')}
            </p>
          </div>
          <div className="flex gap-3 justify-end pt-4">
            <Button
              variant="secondary"
              onClick={() => passwordResetModal.close()}
            >
              {t('users:actions.cancel')}
            </Button>
            <Button
              onClick={confirmPasswordReset}
            >
              {t('users:messages.sendResetEmail')}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Password Reset Success Modal */}
      <Modal
        isOpen={passwordResetSuccessModal.isOpen}
        onClose={() => passwordResetSuccessModal.close()}
        title={t('users:messages.passwordResetEmailSent')}
        size="md"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Mail size={24} className="text-green-600" />
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900">{t('users:messages.emailSentSuccessfully')}</h4>
              <p className="text-sm text-gray-600">
                {t('users:messages.passwordResetSentTo')}{' '}
                <strong>{passwordResetSuccessModal.data?.email}</strong>
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <span className="text-blue-600 text-lg">📧</span>
              <div>
                <p className="text-sm text-blue-800 font-medium mb-1">{t('users:messages.whatHappensNext')}</p>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• {t('users:messages.resetStep1')}</li>
                  <li>• {t('users:messages.resetStep2')}</li>
                  <li>• {t('users:messages.resetStep3')}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              onClick={() => passwordResetSuccessModal.close()}
            >
              {t('users:messages.gotIt')}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit User Modal */}
      <Modal
        isOpen={editModal.isOpen}
        onClose={() => {
          editModal.close();
          setEditCompanySearchTerm('');
          setShowEditCompanyDropdown(false);
        }}
        title={t('users:edit')}
        size="md"
      >
        <div className="space-y-4">
          <Input
            label={t('users:fields.email')}
            type="email"
            value={editFormData.email}
            onChange={(e) => handleEditFormChange('email', e.target.value)}
            error={editErrors.email}
            placeholder={t('users:placeholders.email')}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('users:fields.role')}</label>
            <select
              value={editFormData.role}
              onChange={(e) => handleEditFormChange('role', e.target.value)}
              className={`block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                editErrors.role ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">{t('users:placeholders.selectRole')}</option>
              <option value="user">{t('users:roles.user')}</option>
              <option value="admin">{t('users:roles.admin')}</option>
              <option value="superadmin">{t('users:roles.superAdmin')}</option>
            </select>
            {editErrors.role && <p className="text-sm text-red-600 mt-1">{editErrors.role}</p>}
          </div>
          <div className="relative" ref={editCompanyDropdownRef}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('users:fields.company')}</label>
            <div className="relative">
              <input
                type="text"
                value={editCompanySearchTerm}
                onChange={(e) => {
                  setEditCompanySearchTerm(e.target.value);
                  setShowEditCompanyDropdown(true);
                }}
                onFocus={() => setShowEditCompanyDropdown(true)}
                className={`block w-full px-3 py-2 pr-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  editErrors.company ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder={t('users:placeholders.searchCompany')}
              />
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            {editErrors.company && <p className="text-sm text-red-600 mt-1">{editErrors.company}</p>}

            {showEditCompanyDropdown && (
              <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                {companies
                  .filter(company => {
                    const searchLower = (editCompanySearchTerm || '').toLowerCase();
                    return (company.name && company.name.toLowerCase().includes(searchLower)) ||
                      (company.identifier && company.identifier.toLowerCase().includes(searchLower));
                  })
                  .map((company) => (
                    <div
                      key={company.objectId || company.id}
                      onClick={() => {
                        setEditFormData(prev => ({ ...prev, company: company.objectId || company.id }));
                        setEditCompanySearchTerm(company.name);
                        setShowEditCompanyDropdown(false);
                        setEditErrors(prev => ({ ...prev, company: '' }));
                      }}
                      className="px-3 py-2 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                    >
                      <div className="font-medium text-sm text-gray-900">{company.name}</div>
                      {company.identifier && (
                        <div className="text-xs text-gray-500">{company.identifier}</div>
                      )}
                    </div>
                  ))}
                {companies.filter(company => {
                  const searchLower = (editCompanySearchTerm || '').toLowerCase();
                  return (company.name && company.name.toLowerCase().includes(searchLower)) ||
                    (company.identifier && company.identifier.toLowerCase().includes(searchLower));
                }).length === 0 && (
                  <div className="px-3 py-2 text-sm text-gray-500">{t('users:labels.noCompaniesFound')}</div>
                )}
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('users:fields.status')}</label>
            <select
              value={editFormData.status}
              onChange={(e) => handleEditFormChange('status', e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="active">{t('users:status.active')}</option>
              <option value="inactive">{t('users:status.inactive')}</option>
            </select>
          </div>
          <div className="flex gap-3 justify-end pt-4">
            <Button variant="secondary" onClick={() => {
              editModal.close();
              setEditCompanySearchTerm('');
              setShowEditCompanyDropdown(false);
            }}>
              {t('users:actions.cancel')}
            </Button>
            <Button onClick={handleSaveEdit}>
              {t('users:actions.save')}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}