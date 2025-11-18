import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/auth/AuthContext';
import Header from '../../components/Layout/Header';
import Table, { Column } from '../../components/UI/Table';
import Button from '../../components/UI/Button';
import Modal from '../../components/UI/Modal';
import Input from '../../components/UI/Input';
import { User } from '../../types';
import { usersService } from '../../services/usersService';
import { companiesService } from '../../services/companiesService';
import { CreditCard as Edit, Trash2, Plus, Search, ListFilter as Filter, X, Mail, ChevronDown } from 'lucide-react';

export default function UsersPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
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
  const [editModal, setEditModal] = useState<{ open: boolean; user?: User }>({ open: false });
  const [passwordResetModal, setPasswordResetModal] = useState<{ open: boolean; user?: User }>({ open: false });
  const [passwordResetSuccessModal, setPasswordResetSuccessModal] = useState<{ open: boolean; user?: User }>({ open: false });
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

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

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
    } catch (err: any) {
      setError(err.message || 'Failed to load users');
      console.error('Error loading users:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadCompanies = async () => {
    try {
      const companiesData = await companiesService.getAllCompaniesLight();
      setCompanies(companiesData);
    } catch (err: any) {
      console.error('Error loading companies:', err);
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

  // Filtering is now done on the backend via the API

  const columns: Column<User>[] = [
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: true,
      render: (value: unknown) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          value === 'superadmin' ? 'bg-purple-100 text-purple-800' :
          value === 'admin' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {String(value)}
        </span>
      )
    },
    { key: 'company', label: 'Company', sortable: true },
    { key: 'status', label: 'Status', sortable: true,
      render: (value: unknown, row: User) => (
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            value === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {String(value)}
          </span>
          {row.isDeleted && (
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800">
              {row.disabledReason || 'Disabled'}
            </span>
          )}
        </div>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_: unknown, row: User) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleEditUser(row)}
            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
            title="Edit User"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => handleSendPasswordReset(row)}
            className="p-2 text-orange-600 hover:bg-orange-100 rounded-lg transition-colors"
            title="Send Password Reset Email"
          >
            <Mail size={16} />
          </button>
          <button
            onClick={() => handleDeleteUser(row)}
            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
            title="Delete User"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  const handleSendPasswordReset = (user: User) => {
    setPasswordResetModal({ open: true, user });
  };

  const confirmPasswordReset = async () => {
    if (!passwordResetModal.user) return;

    try {
      await usersService.sendPasswordReset(passwordResetModal.user.id);
      setPasswordResetModal({ open: false });
      setPasswordResetSuccessModal({ open: true, user: passwordResetModal.user });
    } catch (err: any) {
      console.error('Error sending password reset:', err);
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
    setEditModal({ open: true, user });
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
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editFormData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!editFormData.role) {
      newErrors.role = 'Role is required';
    }

    if (!editFormData.company) {
      newErrors.company = 'Company is required';
    }

    setEditErrors(newErrors);
    return !newErrors.email && !newErrors.role && !newErrors.company;
  };

  const handleSaveEdit = async () => {
    if (!validateEditForm() || !editModal.user) {
      return;
    }

    try {
      await usersService.updateUser(editModal.user.id, {
        email: editFormData.email,
        role: editFormData.role as 'superadmin' | 'admin' | 'user',
        companyId: editFormData.company,
        status: editFormData.status as 'active' | 'inactive'
      });
      setEditModal({ open: false });
      setEditCompanySearchTerm('');
      setShowEditCompanyDropdown(false);
      await loadUsers(); // Reload users
    } catch (err: any) {
      console.error('Error updating user:', err);
      alert('Failed to update user');
    }
  };

  const handleDeleteUser = async (user: User) => {
    if (!confirm(`Are you sure you want to delete ${user.email}?`)) {
      return;
    }

    try {
      await usersService.deleteUser(user.id, 'Disabled');
      await loadUsers(); // Reload users
    } catch (err: any) {
      console.error('Error deleting user:', err);
      alert('Failed to delete user');
    }
  };

  const validateCreateForm = () => {
    const newErrors = {
      email: '',
      role: '',
      company: ''
    };

    if (!createFormData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(createFormData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!createFormData.role) {
      newErrors.role = 'Role is required';
    }

    if (!createFormData.company) {
      newErrors.company = 'Company is required';
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
    } catch (err: any) {
      console.error('Error creating user:', err);
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
      <Header title="Users" />

      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">User Management</h2>
            <p className="text-sm text-gray-600">Manage user accounts and permissions</p>
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
            Create New User
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
                placeholder="Search users..."
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
              Filters
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select
                    value={filters.role}
                    onChange={(e) => setFilters(prev => ({ ...prev, role: e.target.value }))}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Roles</option>
                    <option value="superadmin">Super Admin</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="relative" ref={filterCompanyDropdownRef}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
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
                      placeholder="All Companies"
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
                        All Companies
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
                    Showing {users.length} of {totalUsers} users
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
          <Table<User> columns={columns} data={users} />

          {users.length === 0 && !loading && (
            <div className="text-center py-8 text-gray-500">
              <p>No users found matching your criteria.</p>
              {hasActiveFilters && (
                <Button variant="secondary" onClick={clearFilters} className="mt-2">
                  Clear Filters
                </Button>
              )}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Show</span>
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
                <span>per page</span>
                <span className="ml-4">
                  Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, totalUsers)} of {totalUsers} users
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                >
                  First
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
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
                  Next
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                >
                  Last
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
        title="Create New User"
        size="md"
      >
        <div className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="john@example.com"
            value={createFormData.email}
            onChange={(e) => {
              setCreateFormData(prev => ({ ...prev, email: e.target.value }));
              setCreateErrors(prev => ({ ...prev, email: '' }));
            }}
            error={createErrors.email}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
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
              <option value="">Select role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>
            {createErrors.role && <p className="text-sm text-red-600 mt-1">{createErrors.role}</p>}
          </div>
          <div className="relative" ref={companyDropdownRef}>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
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
                placeholder="Search company..."
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
                  <div className="px-3 py-2 text-sm text-gray-500">No companies found</div>
                )}
              </div>
            )}
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              <strong>📧 Password Setup:</strong> The user will receive an email with instructions to set their password after account creation.
            </p>
          </div>
          <div className="flex gap-3 justify-end pt-4">
            <Button variant="secondary" onClick={() => {
              setCreateModal(false);
              setCompanySearchTerm('');
              setShowCompanyDropdown(false);
            }}>
              Cancel
            </Button>
            <Button onClick={handleCreateUser}>
              Create User
            </Button>
          </div>
        </div>
      </Modal>

      {/* Password Reset Confirmation Modal */}
      <Modal
        isOpen={passwordResetModal.open}
        onClose={() => setPasswordResetModal({ open: false })}
        title="Send Password Reset Email"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to send a password reset email to{' '}
            <strong>{passwordResetModal.user?.email}</strong>?
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              <strong>📧 Note:</strong> The user will receive an email with instructions to reset their password.
            </p>
          </div>
          <div className="flex gap-3 justify-end pt-4">
            <Button
              variant="secondary"
              onClick={() => setPasswordResetModal({ open: false })}
            >
              Cancel
            </Button>
            <Button
              onClick={confirmPasswordReset}
            >
              Send Reset Email
            </Button>
          </div>
        </div>
      </Modal>

      {/* Password Reset Success Modal */}
      <Modal
        isOpen={passwordResetSuccessModal.open}
        onClose={() => setPasswordResetSuccessModal({ open: false })}
        title="Password Reset Email Sent"
        size="md"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Mail size={24} className="text-green-600" />
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900">Email Sent Successfully</h4>
              <p className="text-sm text-gray-600">
                Password reset instructions have been sent to{' '}
                <strong>{passwordResetSuccessModal.user?.email}</strong>
              </p>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <span className="text-blue-600 text-lg">📧</span>
              <div>
                <p className="text-sm text-blue-800 font-medium mb-1">What happens next:</p>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• The user will receive an email with a secure reset link</li>
                  <li>• The link will expire in 24 hours for security</li>
                  <li>• They can create a new password using the link</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              onClick={() => setPasswordResetSuccessModal({ open: false })}
            >
              Got it
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit User Modal */}
      <Modal
        isOpen={editModal.open}
        onClose={() => {
          setEditModal({ open: false });
          setEditCompanySearchTerm('');
          setShowEditCompanyDropdown(false);
        }}
        title="Edit User"
        size="md"
      >
        <div className="space-y-4">
          <Input 
            label="Email" 
            type="email" 
            value={editFormData.email}
            onChange={(e) => handleEditFormChange('email', e.target.value)}
            error={editErrors.email}
            placeholder="john@example.com" 
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select 
              value={editFormData.role}
              onChange={(e) => handleEditFormChange('role', e.target.value)}
              className={`block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                editErrors.role ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>
            {editErrors.role && <p className="text-sm text-red-600 mt-1">{editErrors.role}</p>}
          </div>
          <div className="relative" ref={editCompanyDropdownRef}>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
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
                placeholder="Search company..."
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
                  <div className="px-3 py-2 text-sm text-gray-500">No companies found</div>
                )}
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select 
              value={editFormData.status}
              onChange={(e) => handleEditFormChange('status', e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="flex gap-3 justify-end pt-4">
            <Button variant="secondary" onClick={() => {
              setEditModal({ open: false });
              setEditCompanySearchTerm('');
              setShowEditCompanyDropdown(false);
            }}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}