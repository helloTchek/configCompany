import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import Table from '../../components/UI/Table';
import Button from '../../components/UI/Button';
import Modal from '../../components/UI/Modal';
import Input from '../../components/UI/Input';
import { mockJourneys } from '../../data/mockData';
import { InspectionJourney } from '../../types';
import { Edit, Eye, Copy, Trash2, Plus } from 'lucide-react';

export default function JourneysPage() {
  const navigate = useNavigate();
  const [journeys] = useState<InspectionJourney[]>(mockJourneys);
  const [duplicateModal, setDuplicateModal] = useState<{ open: boolean; journey?: InspectionJourney }>({ open: false });
  const [duplicateName, setDuplicateName] = useState('');

  const handleDuplicate = (journey: InspectionJourney) => {
    setDuplicateName(`${journey.name} (Copy)`);
    setDuplicateModal({ open: true, journey });
  };

  const confirmDuplicate = () => {
    if (!duplicateModal.journey || !duplicateName.trim()) {
      return;
    }

    const duplicatedJourney: InspectionJourney = {
      ...duplicateModal.journey,
      id: `journey-${Date.now()}`,
      name: duplicateName,
      blocks: duplicateModal.journey.blocks.map(block => ({
        ...block,
        id: `block-${Date.now()}-${Math.random()}`,
      })),
    };

    // In a real app, this would make an API call to create the journey
    console.log('Duplicating journey:', duplicatedJourney);
    
    // Add to mock journeys array (in real app this would be handled by API)
    mockJourneys.push(duplicatedJourney);
    
    setDuplicateModal({ open: false });
    setDuplicateName('');
    
    // Refresh the page or update state to show the new journey
    window.location.reload();
  };

  const columns = [
    { key: 'name', label: 'Journey Name', sortable: true },
    { key: 'companyId', label: 'Company', sortable: true,
      render: (value: string) => {
        // In real app, would look up company name by ID
        return value === '1' ? 'AutoCorp Insurance' : 'Unknown Company';
      }
    },
    { key: 'blocks', label: 'Blocks Count', sortable: true,
      render: (value: any[]) => value.length
    },
    { key: 'isActive', label: 'Status', sortable: true,
      render: (value: boolean) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          value ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {value ? 'Active' : 'Inactive'}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_: any, row: InspectionJourney) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/journeys/${row.id}/view`)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="View"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => navigate(`/journeys/${row.id}/edit`)}
            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
            title="Edit"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => handleDuplicate(row)}
            className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
            title="Duplicate"
          >
            <Copy size={16} />
          </button>
          <button
            onClick={() => {/* Handle delete */}}
            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header title="Inspection Journeys" />
      
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Journey Management</h2>
            <p className="text-sm text-gray-600">Create and manage inspection journey workflows</p>
          </div>
          <Button
            onClick={() => navigate('/journeys/new')}
            className="flex items-center gap-2"
          >
            <Plus size={16} />
            Create New Journey
          </Button>
        </div>

        <div className="bg-white rounded-lg border border-gray-200">
          <Table columns={columns} data={journeys} />
        </div>
      </div>

      {/* Duplicate Modal */}
      <Modal
        isOpen={duplicateModal.open}
        onClose={() => setDuplicateModal({ open: false })}
        title="Duplicate Journey"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Create a copy of <strong>{duplicateModal.journey?.name}</strong>
          </p>
          <Input
            label="New Journey Name"
            value={duplicateName}
            onChange={(e) => setDuplicateName(e.target.value)}
            placeholder="Enter new journey name"
          />
          <div className="flex gap-3 justify-end pt-4">
            <Button
              variant="secondary"
              onClick={() => {
                setDuplicateModal({ open: false });
                setDuplicateName('');
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={confirmDuplicate}
              disabled={!duplicateName.trim()}
            >
              Duplicate Journey
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}