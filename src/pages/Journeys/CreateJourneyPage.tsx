import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import Modal from '../../components/UI/Modal';
import { ArrowLeft, Plus, Upload, Download, GripVertical } from 'lucide-react';
import { JourneyBlock } from '../../types';

const blockTypes = [
  { type: 'form', name: 'Form Block', description: 'Custom form with JSON configuration' },
  { type: 'shootInspection', name: 'Shoot Inspection Block', description: 'Photo capture workflow' },
  { type: 'fastTrack', name: 'Fast Track Block', description: 'Quick inspection process' },
  { type: 'addDamage', name: 'Add Damage Block', description: 'Manual damage reporting' },
  { type: 'onboarding', name: 'Onboarding Block', description: 'Customer onboarding form' },
  { type: 'offboarding', name: 'Offboarding Block', description: 'Process completion form' },
  { type: 'sortingRules', name: 'Sorting Rules Block', description: 'Automated filtering rules' },
  { type: 'decisionTree', name: 'Decision Tree Block', description: 'Conditional logic workflow' }
];

export default function CreateJourneyPage() {
  const navigate = useNavigate();
  const [journeyName, setJourneyName] = useState('');
  const [journeyDescription, setJourneyDescription] = useState('');
  const [blocks, setBlocks] = useState<JourneyBlock[]>([]);
  const [blockModal, setBlockModal] = useState<{ open: boolean; type?: string }>({ open: false });
  const [editingBlock, setEditingBlock] = useState<JourneyBlock | null>(null);

  const addBlock = (blockType: string) => {
    const newBlock: JourneyBlock = {
      id: `block-${Date.now()}`,
      type: blockType as any,
      name: blockTypes.find(bt => bt.type === blockType)?.name || 'Unnamed Block',
      description: '',
      config: {},
      order: blocks.length + 1
    };
    setBlocks([...blocks, newBlock]);
    setBlockModal({ open: false });
  };

  const removeBlock = (blockId: string) => {
    setBlocks(blocks.filter(b => b.id !== blockId));
  };

  const BlockConfigModal = () => {
    if (!blockModal.type) return null;

    const blockTypeInfo = blockTypes.find(bt => bt.type === blockModal.type);

    return (
      <Modal
        isOpen={blockModal.open}
        onClose={() => setBlockModal({ open: false })}
        title={`Configure ${blockTypeInfo?.name}`}
        size="lg"
      >
        <div className="space-y-4">
          <Input 
            label="Block Name" 
            defaultValue={blockTypeInfo?.name}
            placeholder="Enter block name"
          />
          <Input 
            label="Description" 
            placeholder="Enter block description"
          />

          {blockModal.type === 'form' && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">JSON Configuration</label>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" className="flex items-center gap-1">
                    <Download size={14} />
                    Download JSON
                  </Button>
                  <Button variant="secondary" size="sm" className="flex items-center gap-1">
                    <Upload size={14} />
                    Upload JSON
                  </Button>
                </div>
              </div>
              <textarea
                rows={6}
                placeholder='{"fields": [{"type": "text", "name": "customerName", "label": "Customer Name", "required": true}]}'
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
              />
            </div>
          )}

          {blockModal.type === 'shootInspection' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input label="Max Retries" type="number" defaultValue="3" />
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked={true}
                    className="rounded border-gray-300 text-blue-600 shadow-sm"
                  />
                  <span className="ml-2 text-sm text-gray-700">Quality Check Enabled</span>
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Photo Angles</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Front', 'Back', 'Left Side', 'Right Side', 'Interior', 'Dashboard'].map((angle) => (
                    <label key={angle} className="flex items-center">
                      <input
                        type="checkbox"
                        defaultChecked={['Front', 'Back', 'Left Side', 'Right Side'].includes(angle)}
                        className="rounded border-gray-300 text-blue-600 shadow-sm"
                      />
                      <span className="ml-2 text-sm text-gray-700">{angle}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {blockModal.type === 'addDamage' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Allowed Damage Types</label>
              <div className="grid grid-cols-2 gap-2">
                {['Car Body', 'Interior', 'Glazings', 'Dashboard', 'Declaration', 'Documents'].map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked={true}
                      className="rounded border-gray-300 text-blue-600 shadow-sm"
                    />
                    <span className="ml-2 text-sm text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 justify-end pt-4">
            <Button variant="secondary" onClick={() => setBlockModal({ open: false })}>
              Cancel
            </Button>
            <Button onClick={() => addBlock(blockModal.type!)}>
              Add Block
            </Button>
          </div>
        </div>
      </Modal>
    );
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header title="Create Inspection Journey" />
      
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6">
          <Button
            variant="secondary"
            onClick={() => navigate('/journeys')}
            className="flex items-center gap-2 mb-4"
          >
            <ArrowLeft size={16} />
            Back to Journeys
          </Button>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Journey Details */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Journey Details</h3>
            <div className="grid grid-cols-1 gap-4">
              <Input
                label="Journey Name"
                value={journeyName}
                onChange={(e) => setJourneyName(e.target.value)}
                placeholder="Enter journey name"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={journeyDescription}
                  onChange={(e) => setJourneyDescription(e.target.value)}
                  placeholder="Enter journey description"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Add Blocks */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Journey Blocks</h3>
              <div className="relative">
                <Button
                  onClick={() => setBlockModal({ open: true })}
                  className="flex items-center gap-2"
                >
                  <Plus size={16} />
                  Add Block
                </Button>
              </div>
            </div>

            {blocks.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No blocks added yet. Click "Add Block" to start building your journey.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {blocks.map((block, index) => (
                  <div key={block.id} className="bg-gray-50 rounded-lg p-4 flex items-center gap-4">
                    <GripVertical size={16} className="text-gray-400" />
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-900">{index + 1}.</span>
                        <h4 className="font-medium text-gray-900">{block.name}</h4>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          {block.type}
                        </span>
                      </div>
                      {block.description && (
                        <p className="text-sm text-gray-600 mt-1">{block.description}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="secondary" size="sm">Edit</Button>
                      <Button 
                        variant="danger" 
                        size="sm"
                        onClick={() => removeBlock(block.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* JSON Import/Export */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Journey Configuration</h3>
            <div className="flex gap-4 mb-4">
              <Button variant="secondary" className="flex items-center gap-2">
                <Upload size={16} />
                Import JSON
              </Button>
              <Button variant="secondary" className="flex items-center gap-2">
                <Download size={16} />
                Export JSON
              </Button>
            </div>
            <textarea
              rows={8}
              placeholder="Journey JSON configuration will appear here..."
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
              value={JSON.stringify({ 
                name: journeyName, 
                description: journeyDescription, 
                blocks: blocks 
              }, null, 2)}
              readOnly
            />
          </div>

          {/* Save Buttons */}
          <div className="flex gap-4 justify-end">
            <Button variant="secondary">Cancel</Button>
            <Button variant="secondary">Save and Add Another</Button>
            <Button disabled={!journeyName || blocks.length === 0}>
              Save Journey
            </Button>
          </div>
        </div>
      </div>

      {/* Block Selection Modal */}
      <Modal
        isOpen={blockModal.open && !blockModal.type}
        onClose={() => setBlockModal({ open: false })}
        title="Select Block Type"
        size="lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {blockTypes.map((blockType) => (
            <button
              key={blockType.type}
              onClick={() => setBlockModal({ open: true, type: blockType.type })}
              className="text-left p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <h4 className="font-medium text-gray-900 mb-1">{blockType.name}</h4>
              <p className="text-sm text-gray-600">{blockType.description}</p>
            </button>
          ))}
        </div>
      </Modal>

      <BlockConfigModal />
    </div>
  );
}