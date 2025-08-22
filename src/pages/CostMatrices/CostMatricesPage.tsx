import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import Table from '../../components/UI/Table';
import Button from '../../components/UI/Button';
import { mockCostMatrices } from '../../data/mockData';
import { CostMatrix } from '../../types';
import { Edit, Upload, Download, Plus } from 'lucide-react';

export default function CostMatricesPage() {
  const navigate = useNavigate();
  const [matrices] = useState<CostMatrix[]>(mockCostMatrices);

  const columns = [
    { key: 'company', label: 'Company', sortable: true },
    { key: 'currency', label: 'Currency', sortable: true,
      render: (value: string) => (
        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
          {value}
        </span>
      )
    },
    { key: 'tax', label: 'Tax Rate (%)', sortable: true,
      render: (value: number) => `${value}%`
    },
    { key: 'parts', label: 'Parts Count', sortable: true,
      render: (value: any[]) => value.length
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_: any, row: CostMatrix) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/cost-matrices/${row.id}/edit`)}
            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
            title="Edit"
          >
            <Edit size={16} />
          </button>
          <button
            className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
            title="Download CSV"
          >
            <Download size={16} />
          </button>
          <button
            className="p-2 text-orange-600 hover:bg-orange-100 rounded-lg transition-colors"
            title="Upload CSV"
          >
            <Upload size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header title="Cost Matrices" />
      
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Repair Cost Management</h2>
            <p className="text-sm text-gray-600">Manage repair costs by part types, locations, and severities</p>
          </div>
          <Button
            onClick={() => navigate('/cost-matrices/new')}
            className="flex items-center gap-2"
          >
            <Plus size={16} />
            Create New Matrix
          </Button>
        </div>

        <div className="bg-white rounded-lg border border-gray-200">
          <Table columns={columns} data={matrices} />
        </div>
      </div>
    </div>
  );
}