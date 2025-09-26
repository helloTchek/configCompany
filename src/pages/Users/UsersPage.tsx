import React, { useState } from 'react';
import Header from '../../components/Layout/Header';
import Table from '../../components/UI/Table';
import Button from '../../components/UI/Button';
import Modal from '../../components/UI/Modal';
import Input from '../../components/UI/Input';
import { mockUsers } from '../../data/mockData';
import { User } from '../../types';
import { CreditCard as Edit, Trash2, Plus, Search, ListFilter as Filter, X, Mail } from 'lucide-react';

export default function UsersPage() {
  const [users] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    role: '',
    status: '',
    company: ''
  });
  const [createModal, setCreateModal] = useState(false);
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

  const clearFilters = () => {
    setFilters({
      role: '',
      status: '',
      company: ''
    });
    setSearchTerm('');
  };

  const hasActiveFilters = searchTerm || Object.values(filters).some(filter => filter !== '');

  // Filter and search logic
  const filteredUsers = users.filter(user => {
    // Search filter
    const matchesSearch = !searchTerm ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company.toLowerCase().includes(searchTerm.toLowerCase());

    // Role filter
    const matchesRole = !filters.role || user.role === filters.role;

    // Status filter
    const matchesStatus = !filters.status || user.status === filters.status;

    // Company filter
    const matchesCompany = !filters.company || user.company === filters.company;

    return matchesSearch && matchesRole && matchesStatus && matchesCompany;
  });

  const columns = [
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: true,
      render: (value: string) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          value === 'superadmin' ? 'bg-purple-100 text-purple-800' :
          value === 'admin' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {value}
        </span>
      )
    },
    { key: 'company', label: 'Company', sortable: true },
    { key: 'status', label: 'Status', sortable: true,
      render: (value: string, row: User) => (
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            value === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {value}
          </span>
          {row.isDisabled && (
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800">
              {row.disabledReason || 'Disabled'}
            </span>
          )}
        </div>
      )
    },
    { key: 'lastLogin', label: 'Last Login',
      render: (value: string) => value ? new Date(value).toLocaleDateString() : 'Never'
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_: any, row: User) => (
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
            onClick={() => {/* Handle delete */}}
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

  const confirmPasswordReset = () => {
    if (!passwordResetModal.user) return;

    // In a real app, this would send a password reset email
    console.log('Sending password reset email to:', passwordResetModal.user.email);
    
    setPasswordResetModal({ open: false });
    setPasswordResetSuccessModal({ open: true, user: passwordResetModal.user });
  };

  const handleEditUser = (user: User) => {
    setEditFormData({
      email: user.email,
      role: user.role,
      company: user.company,
      status: user.status
    });
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

  const handleSaveEdit = () => {
    if (!validateEditForm()) {
      return;
    }

    // In a real app, this would make an API call to update the user
    console.log('Updating user:', editFormData);
    setEditModal({ open: false });
  };

  const CreateUserModal = () => (
    <Modal
      isOpen={createModal}
      onClose={() => setCreateModal(false)}
      title="Create New User"
      size="md"
    >
      <div className="space-y-4">
        <Input label="Email" type="email" placeholder="john@example.com" />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <select className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="superadmin">Super Admin</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
          <select className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="AutoCorp Insurance">AutoCorp Insurance</option>
            <option value="FleetMax Leasing">FleetMax Leasing</option>
          </select>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm text-blue-800">
            <strong>📧 Password Setup:</strong> The user will receive an email with instructions to set their password after account creation.
          </p>
        </div>
        <div className="flex gap-3 justify-end pt-4">
          <Button variant="secondary" onClick={() => setCreateModal(false)}>
            Cancel
          </Button>
          <Button onClick={() => setCreateModal(false)}>
            Create User
          </Button>
        </div>
      </div>
    </Modal>
  );

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
            onClick={() => setCreateModal(true)}
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <select
                    value={filters.company}
                    onChange={(e) => setFilters(prev => ({ ...prev, company: e.target.value }))}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Companies</option>
                    <option value="AutoCorp Insurance">AutoCorp Insurance</option>
                    <option value="FleetMax Leasing">FleetMax Leasing</option>
                  </select>
                </div>
              </div>

              {hasActiveFilters && (
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Showing {filteredUsers.length} of {users.length} users
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
          <Table columns={columns} data={filteredUsers} />
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No users found matching your criteria.</p>
              {hasActiveFilters && (
                <Button variant="secondary" onClick={clearFilters} className="mt-2">
                  Clear Filters
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      <CreateUserModal />

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
        onClose={() => setEditModal({ open: false })}
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
            <select 
              value={editFormData.company}
              onChange={(e) => handleEditFormChange('company', e.target.value)}
              className={`block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                editErrors.company ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select company</option>
              <option value="AutoCorp Insurance">AutoCorp Insurance</option>
              <option value="FleetMax Leasing">FleetMax Leasing</option>
            </select>
            {editErrors.company && <p className="text-sm text-red-600 mt-1">{editErrors.company}</p>}
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
            <Button variant="secondary" onClick={() => setEditModal({ open: false })}>
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