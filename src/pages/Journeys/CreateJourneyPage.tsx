import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useAuth } from '@/auth/AuthContext';
import Header from '../../components/Layout/Header';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import Modal from '../../components/UI/Modal';
import CompanySelector from '../../components/UI/CompanySelector';
import ShootInspectionConfig from '../../components/Journey/ShootInspectionConfig';
import { ArrowLeft, Plus, Upload, Download, GripVertical } from 'lucide-react';
import { JourneyBlock } from '../../types';
import { ShootInspectionData } from '../../types';
import { workflowsService } from '../../services/workflowsService';
import { companiesService } from '../../services/companiesService';
import { screenConfigsService, ScreenConfigType } from '../../services/screenConfigsService';
import { toast } from 'react-hot-toast';
import onboardingData from '../../data/onboarding.json';

const blockTypes = [
  { type: 'form', name: 'Form Block', description: 'Custom form with JSON configuration' },
  { type: 'shootInspect', name: 'Shoot Inspection Block', description: 'Photo capture workflow' },
  { type: 'fastTrack', name: 'Fast Track Block', description: 'Quick inspection process' },
  { type: 'addDamage', name: 'Add Damage Block', description: 'Manual damage reporting' },
  { type: 'static', name: 'Static Screen Block', description: 'Static content screens (onboarding/offboarding)' }
];

export default function CreateJourneyPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [journeyName, setJourneyName] = useState('');
  const [journeyDescription, setJourneyDescription] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [blocks, setBlocks] = useState<JourneyBlock[]>([]);
  const [blockModal, setBlockModal] = useState<{ open: boolean; type?: string }>({ open: false });
  const [showShootInspectionConfig, setShowShootInspectionConfig] = useState(false);
  const [currentShootInspectionConfigData, setCurrentShootInspectionConfigData] = useState<ShootInspectionData | null>(null);
  const [saving, setSaving] = useState(false);
  const [companies, setCompanies] = useState<Array<{ objectId: string; id: string; name: string; identifier?: string }>>([]);
  const [loadingCompanies, setLoadingCompanies] = useState(false);
  // Store full config data for blocks that need it (indexed by block id)
  const [blockConfigs, setBlockConfigs] = useState<Map<string, any>>(new Map());

  // Load companies for superAdmin
  useEffect(() => {
    if (user?.role === 'superAdmin') {
      loadCompanies();
    } else if (user?.companyId) {
      setSelectedCompany(user.companyId);
    }
  }, [user]);

  const loadCompanies = async () => {
    try {
      setLoadingCompanies(true);
      const data = await companiesService.getAllCompaniesLight();
      setCompanies(data);
    } catch (error) {
      console.error('Error loading companies:', error);
      toast.error('Failed to load companies');
    } finally {
      setLoadingCompanies(false);
    }
  };

  const handleSave = async (saveAndAddAnother = false) => {
    if (!journeyName.trim()) {
      toast.error('Please enter a journey name');
      return;
    }

    if (!selectedCompany) {
      toast.error('Please select a company');
      return;
    }

    if (blocks.length === 0) {
      toast.error('Please add at least one block to the journey');
      return;
    }

    try {
      setSaving(true);

      // Step 1: Save all screen configs first and get their IDs
      const blocksWithConfigIds = await Promise.all(
        blocks.map(async (block) => {
          // Only process blocks that have configs stored
          if (!blockConfigs.has(block.id)) {
            return block;
          }

          const configData = blockConfigs.get(block.id);
          let configType: ScreenConfigType | null = null;

          // Determine config type based on block type
          if (block.type === 'shootInspect') {
            configType = 'shoot-inspect';
          } else if (block.type === 'static') {
            configType = 'static-screen';
          } else if (block.type === 'form') {
            configType = 'form-screen';
          }

          // If this block needs config saved to backend
          if (configType) {
            try {
              // For form blocks, configData already contains the complete structure
              // For static blocks, configData has {id, name, description, config}
              const configPayload = block.type === 'form'
                ? {
                    companyId: selectedCompany,
                    ...configData  // Already has id, name, description, config
                  }
                : {
                    companyId: selectedCompany,
                    id: configData.id || `${block.type}-${Date.now()}`,
                    name: configData.name || block.name,
                    description: configData.description || block.description,
                    config: configData.config || configData
                  };

              const savedConfig = await screenConfigsService.createConfig(configType, configPayload);

              // Return block with the saved config ID
              return {
                ...block,
                configId: savedConfig.id
              };
            } catch (error) {
              console.error(`Error saving ${configType} config:`, error);
              throw new Error(`Failed to save ${block.name} configuration`);
            }
          }

          return block;
        })
      );

      // Step 2: Create workflow with blocks that now have real config IDs
      await workflowsService.createWorkflow({
        companyId: selectedCompany,
        name: journeyName,
        description: journeyDescription,
        isActive,
        blocks: blocksWithConfigIds
      });

      toast.success('Journey created successfully');

      if (saveAndAddAnother) {
        // Reset form for new journey
        setJourneyName('');
        setJourneyDescription('');
        setBlocks([]);
        setBlockConfigs(new Map());
        setIsActive(true);
      } else {
        // Navigate back to journeys list
        navigate('/journeys');
      }
    } catch (error: any) {
      console.error('Error creating journey:', error);
      toast.error(error.message || 'Failed to create journey');
    } finally {
      setSaving(false);
    }
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    if (result.destination.index === result.source.index) return;

    const items = Array.from(blocks);
    const [reorderedItem] = items.splice(result.source.index, 1);

    if (!reorderedItem) return;

    items.splice(result.destination.index, 0, reorderedItem);

    // Update order property
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index + 1
    }));

    setBlocks(updatedItems);
  };


  const removeBlock = (blockId: string) => {
    const updatedBlocks = blocks
      .filter(b => b.id !== blockId)
      .map((block, index) => ({
        ...block,
        order: index + 1
      }));
    setBlocks(updatedBlocks);

    // Remove config data if it exists
    setBlockConfigs(prev => {
      const newMap = new Map(prev);
      newMap.delete(blockId);
      return newMap;
    });
  };

  const handleShootInspectionSave = (config: ShootInspectionData) => {
    // Generate semantic IDs
    const shootInspectCount = blocks.filter(b => b.type === 'shootInspect').length + 1;
    const stepId = `shoot-inspect-step-${shootInspectCount}`;
    const configId = `shoot-inspect-${shootInspectCount}`;

    const newBlock: JourneyBlock = {
      id: stepId,
      type: 'shootInspect',
      name: config.name,
      description: config.description,
      configId: configId,
      order: blocks.length + 1
    };

    // Store the full config data with semantic ID
    setBlockConfigs(prev => {
      const newMap = new Map(prev);
      newMap.set(stepId, {
        ...config,
        id: configId
      });
      return newMap;
    });

    setBlocks([...blocks, newBlock]);
    setShowShootInspectionConfig(false);
    setCurrentShootInspectionConfigData(null);
  };

  const BlockConfigModal = () => {
    if (!blockModal.type) return null;

    const blockTypeInfo = blockTypes.find(bt => bt.type === blockModal.type);
    const [modalBlockName, setModalBlockName] = useState(blockTypeInfo?.name || '');
    const [modalBlockDesc, setModalBlockDesc] = useState('');
    const [modalConfigJson, setModalConfigJson] = useState(
      blockModal.type === 'static' ? JSON.stringify(onboardingData.screens, null, 2) : ''
    );

    // Reset modal fields when modal opens or type changes
    useEffect(() => {
      if (blockModal.open && blockModal.type) {
        const typeInfo = blockTypes.find(bt => bt.type === blockModal.type);
        setModalBlockName(typeInfo?.name || '');
        setModalBlockDesc('');

        if (blockModal.type === 'static') {
          setModalConfigJson(JSON.stringify(onboardingData.screens, null, 2));
        } else {
          setModalConfigJson('');
        }
      }
    }, [blockModal.open, blockModal.type]);

    const handleAddBlockWithConfig = () => {
      const blockTypeInfo = blockTypes.find(bt => bt.type === blockModal.type);

      // Generate semantic IDs based on block type
      let stepId: string;
      let configId: string | undefined;

      if (blockModal.type === 'static') {
        const staticCount = blocks.filter(b => b.type === 'static').length + 1;
        stepId = `static-step-${staticCount}`;
        configId = `static-${staticCount}`;
      } else if (blockModal.type === 'form') {
        const formCount = blocks.filter(b => b.type === 'form').length + 1;
        stepId = `form-step-${formCount}`;
        configId = `form-${formCount}`;
      } else if (blockModal.type === 'fastTrack') {
        const fastTrackCount = blocks.filter(b => b.type === 'fastTrack').length + 1;
        stepId = `fast-track-step-${fastTrackCount}`;
      } else if (blockModal.type === 'addDamage') {
        const addDamageCount = blocks.filter(b => b.type === 'addDamage').length + 1;
        stepId = `add-damage-step-${addDamageCount}`;
      } else {
        stepId = `${blockModal.type}-step-${blocks.length + 1}`;
      }

      // For blocks that need config stored (form, static), parse JSON first to get metadata
      let formConfigData: any = null;
      if (['form', 'static'].includes(blockModal.type!) && configId) {
        try {
          let parsedJson = modalConfigJson ? JSON.parse(modalConfigJson) : {};

          // For form blocks, handle both array and object formats
          if (blockModal.type === 'form') {
            // If the JSON is an array, extract the first element
            if (Array.isArray(parsedJson)) {
              if (parsedJson.length === 0) {
                toast.error('Form configuration array is empty');
                return;
              }
              parsedJson = parsedJson[0];
            }

            // Validate that the form JSON has required fields
            if (!parsedJson.id) {
              toast.error('Form configuration must have an "id" field');
              return;
            }

            formConfigData = parsedJson;
          }
        } catch (error) {
          console.error('JSON parse error:', error);
          toast.error('Invalid JSON configuration');
          return;
        }
      }

      const newBlock: JourneyBlock = {
        id: stepId,
        type: blockModal.type as any,
        name: (blockModal.type === 'form' && formConfigData?.name)
          ? formConfigData.name
          : (modalBlockName || blockTypeInfo?.name || 'Unnamed Block'),
        description: (blockModal.type === 'form' && formConfigData?.description)
          ? formConfigData.description
          : modalBlockDesc,
        configId: (blockModal.type === 'form' && formConfigData?.id)
          ? formConfigData.id
          : configId,
        order: blocks.length + 1
      };

      // For blocks that need config stored (form, static)
      if (['form', 'static'].includes(blockModal.type!) && configId) {
        try {
          let parsedJson = modalConfigJson ? JSON.parse(modalConfigJson) : {};

          // For form blocks, handle both array and object formats
          if (blockModal.type === 'form') {
            // If the JSON is an array, extract the first element
            if (Array.isArray(parsedJson)) {
              parsedJson = parsedJson[0];
            }
            formConfigData = parsedJson;
          }

          setBlockConfigs(prev => {
            const newMap = new Map(prev);

            // For form blocks, use the complete JSON structure as-is
            if (blockModal.type === 'form') {
              newMap.set(stepId, parsedJson);
            } else {
              // For static blocks, build the structure
              newMap.set(stepId, {
                id: configId,
                name: modalBlockName,
                description: modalBlockDesc,
                config: parsedJson
              });
            }

            return newMap;
          });
        } catch (error) {
          console.error('JSON parse error:', error);
          toast.error('Invalid JSON configuration');
          return;
        }
      }

      setBlocks([...blocks, newBlock]);
      setBlockModal({ open: false });
    };

    return (
      <Modal
        isOpen={blockModal.open}
        onClose={() => setBlockModal({ open: false })}
        title={`Configure ${blockTypeInfo?.name}`}
        size="lg"
      >
        <div className="space-y-4">
          {/* Only show Block Name and Description for non-form blocks */}
          {blockModal.type !== 'form' && (
            <>
              <Input
                label="Block Name"
                value={modalBlockName}
                onChange={(e) => setModalBlockName(e.target.value)}
                placeholder="Enter block name"
              />
              <Input
                label="Description"
                value={modalBlockDesc}
                onChange={(e) => setModalBlockDesc(e.target.value)}
                placeholder="Enter block description"
              />
            </>
          )}

          {blockModal.type === 'form' && (
            <div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Form Configuration (Complete JSON)</label>
                <p className="text-xs text-gray-600 mb-2">
                  Enter the complete form configuration JSON including <code className="bg-gray-100 px-1 rounded">id</code>, <code className="bg-gray-100 px-1 rounded">name</code>, <code className="bg-gray-100 px-1 rounded">description</code>, and <code className="bg-gray-100 px-1 rounded">config</code> fields.
                </p>
              </div>

              {/* Example */}
              <details className="mb-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
                <summary className="text-sm font-medium text-blue-900 cursor-pointer">
                  📖 Show example structure
                </summary>
                <pre className="mt-2 text-xs bg-white p-2 rounded border border-blue-100 overflow-x-auto">
{`{
  "id": "form-onboard-1",
  "name": "Customer Onboarding Form",
  "description": "Form for customer onboarding process",
  "config": {
    "isLogoDisplayed": true,
    "screens": [
      {
        "id": "screen1",
        "order": 1,
        "body": {
          "blockListing": [
            {
              "id": "text-screen1-1",
              "type": "text",
              "form": true,
              "businessType": "save#Vehicle@vin",
              "optional": false,
              "data": {
                "title": "VIN Number"
              }
            }
          ]
        }
      }
    ]
  }
}`}</pre>
              </details>

              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">JSON Content</label>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" className="flex items-center gap-1">
                    <Download size={14} />
                    Download
                  </Button>
                  <Button variant="secondary" size="sm" className="flex items-center gap-1">
                    <Upload size={14} />
                    Upload
                  </Button>
                </div>
              </div>
              <textarea
                rows={12}
                value={modalConfigJson}
                onChange={(e) => setModalConfigJson(e.target.value)}
                placeholder='{"id": "form-1", "name": "Form Name", "description": "Form Description", "config": {...}}'
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                💡 Paste your complete form JSON including id, name, description, and config
              </p>
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

          {blockModal.type === 'static' && (
            <div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Static Screens Configuration</label>
                <p className="text-xs text-gray-600 mb-2">
                  Configure static screens (onboarding/offboarding). Enter the screens array configuration.
                </p>
              </div>

              {/* Example */}
              <details className="mb-3 bg-green-50 border border-green-200 rounded-lg p-3">
                <summary className="text-sm font-medium text-green-900 cursor-pointer">
                  📖 Show example structure
                </summary>
                <pre className="mt-2 text-xs bg-white p-2 rounded border border-green-100 overflow-x-auto">
{`[
  {
    "id": "onboarding-1",
    "order": 1,
    "title": "Welcome",
    "description": "Welcome to the inspection",
    "image": "https://example.com/welcome.png",
    "type": "onboarding"
  },
  {
    "id": "offboarding-1",
    "order": 2,
    "title": "Thank You",
    "description": "Inspection completed",
    "type": "offboarding"
  }
]`}</pre>
              </details>

              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">JSON Content</label>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" className="flex items-center gap-1">
                    <Download size={14} />
                    Download
                  </Button>
                  <Button variant="secondary" size="sm" className="flex items-center gap-1">
                    <Upload size={14} />
                    Upload
                  </Button>
                </div>
              </div>
              <textarea
                rows={12}
                value={modalConfigJson}
                onChange={(e) => setModalConfigJson(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                placeholder="Enter static screens JSON configuration (see example above)"
              />
              <p className="text-xs text-gray-500 mt-1">
                💡 Screen types: onboarding, offboarding, info
              </p>
            </div>
          )}

          <div className="flex gap-3 justify-end pt-4">
            <Button variant="secondary" onClick={() => setBlockModal({ open: false })}>
              Cancel
            </Button>
            <Button onClick={handleAddBlockWithConfig}>
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
              <CompanySelector
                companies={companies}
                selectedCompanyId={selectedCompany}
                onSelect={setSelectedCompany}
                label="Company"
                placeholder="Search and select company..."
                disabled={user?.role !== 'superAdmin' || loadingCompanies}
              />
              <Input
                label="Journey Name"
                value={journeyName}
                onChange={(e) => setJourneyName(e.target.value)}
                placeholder="Enter journey name"
                required
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
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 shadow-sm"
                  />
                  <span className="ml-2 text-sm text-gray-700">Active</span>
                </label>
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

            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="journey-blocks">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-3"
                  >
                    {blocks.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <p>No blocks added yet. Click "Add Block" to start building your journey.</p>
                      </div>
                    )}
                    {blocks.map((block, index) => (
                      <Draggable
                        key={block.id}
                        draggableId={block.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`bg-gray-50 rounded-lg p-4 flex items-center gap-4 ${
                              snapshot.isDragging ? 'shadow-lg' : ''
                            }`}
                          >
                            <div {...provided.dragHandleProps}>
                              <GripVertical
                                size={16}
                                className="text-gray-400 cursor-grab hover:text-gray-600"
                              />
                            </div>
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
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => removeBlock(block.id)}
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>

          {/* Save Buttons */}
          <div className="flex gap-4 justify-end">
            <Button
              variant="secondary"
              onClick={() => navigate('/journeys')}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button
              variant="secondary"
              onClick={() => handleSave(true)}
              disabled={!journeyName || !selectedCompany || blocks.length === 0 || saving}
            >
              {saving ? 'Saving...' : 'Save and Add Another'}
            </Button>
            <Button
              onClick={() => handleSave(false)}
              disabled={!journeyName || !selectedCompany || blocks.length === 0 || saving}
            >
              {saving ? 'Saving...' : 'Save Journey'}
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
              onClick={() => {
                if (blockType.type === 'shootInspect') {
                  // Initialize shoot inspection data with default structure
                  const shootInspectCount = blocks.filter(b => b.type === 'shootInspect').length + 1;
                  const shootInspectionData: ShootInspectionData = {
                    id: `shoot-inspect-${shootInspectCount}`,
                    name: 'Shoot Inspection Block',
                    description: '',
                    config: [] // Will be populated with default steps by ShootInspectionConfig
                  };
                  setCurrentShootInspectionConfigData(shootInspectionData);
                  setShowShootInspectionConfig(true);
                  setBlockModal({ open: false });
                } else {
                  setBlockModal({ open: true, type: blockType.type });
                }
              }}
              className="text-left p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <h4 className="font-medium text-gray-900 mb-1">{blockType.name}</h4>
              <p className="text-sm text-gray-600">{blockType.description}</p>
            </button>
          ))}
        </div>
      </Modal>

      <BlockConfigModal />

      {/* Shoot Inspection Config Modal */}
      <Modal
        isOpen={showShootInspectionConfig}
        onClose={() => {
          setShowShootInspectionConfig(false);
          setCurrentShootInspectionConfigData(null);
        }}
        title="Configure Shoot Inspection Block"
        size="xl"
      >
        {currentShootInspectionConfigData && (
          <ShootInspectionConfig
            initialData={currentShootInspectionConfigData}
            onSave={handleShootInspectionSave}
            onCancel={() => {
              setShowShootInspectionConfig(false);
              setCurrentShootInspectionConfigData(null);
            }}
          />
        )}
      </Modal>
    </div>
  );
}
