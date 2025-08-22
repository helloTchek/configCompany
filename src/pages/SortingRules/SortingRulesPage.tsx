import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import Table from '../../components/UI/Table';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import { mockSortingRules } from '../../data/mockData';
import { SortingRule } from '../../types';
import { Edit, Copy, Plus, Search } from 'lucide-react';

export default function SortingRulesPage() {
  const navigate = useNavigate();
  const [rules] = useState<SortingRule[]>(mockSortingRules);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRules = rules.filter(rule =>
    rule.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rule.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { key: 'company', label: 'Company', sortable: true },
    { key: 'type', label: 'Type', sortable: true,
      render: (value: string) => (
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
          {value}
        </span>
      )
    },
    { key: 'fromCollection', label: 'From Collection', sortable: true },
    { key: 'targetCollection', label: 'Target Collection', sortable: true },
    { key: 'referenceKey', label: 'Reference Key', sortable: true },
    { key: 'referencePrefix', label: 'Reference Prefix' },
    { key: 'processingPriority', label: 'Priority', sortable: true,
      render: (value: number) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          value === 1 ? 'bg-red-100 text-red-800' :
          value <= 3 ? 'bg-orange-100 text-orange-800' :
          'bg-green-100 text-green-800'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_: any, row: SortingRule) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/sorting-rules/${row.id}/edit`)}
            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
            title="Edit"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => {/* Handle duplicate */}}
            className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
            title="Duplicate"
          >
            <Copy size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header title="Sorting Rules" />
      
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Automated Sorting Rules</h2>
            <p className="text-sm text-gray-600">Configure automated filtering and update rules per company</p>
          </div>
          <Button
            onClick={() => navigate('/sorting-rules/new')}
            className="flex items-center gap-2"
          >
            <Plus size={16} />
            Create New Rule
          </Button>
        </div>

        <div className="mb-6">
          <div className="relative max-w-md">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by company or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200">
          <Table columns={columns} data={filteredRules} />
        </div>
      </div>
    </div>
  );
}