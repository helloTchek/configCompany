import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useAuth } from '@/auth/AuthContext';
import Header from '../../components/Layout/Header';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import Modal from '../../components/UI/Modal';
import ShootInspectionConfig from '../../components/Journey/ShootInspectionConfig';
import { ArrowLeft, Plus, Upload, Download, GripVertical, Save } from 'lucide-react';
import { JourneyBlock, InspectionJourney } from '../../types';
import { ShootInspectionData } from '../../types';
import { workflowsService } from '../../services/workflowsService';
import { screenConfigsService, ScreenConfigType } from '../../services/screenConfigsService';
import onboardingData from '../../data/onboarding.json';
import { toast } from 'react-hot-toast';

const blockTypes = [
  { type: 'form', name: 'Form Block', description: 'Custom form with JSON configuration' },
  { type: 'shootInspect', name: 'Shoot Inspection Block', description: 'Photo capture workflow' },
  { type: 'fastTrack', name: 'Fast Track Block', description: 'Quick inspection process' },
  { type: 'addDamage', name: 'Add Damage Block', description: 'Manual damage reporting' },
  { type: 'static', name: 'Static Screen Block', description: 'Static content screens (onboarding/offboarding)' }
];

export default function EditJourneyPage() {
  const navigate = useNavigate();
  const { id, companyId } = useParams<{ id: string; companyId: string }>();
  const { user } = useAuth();
  const [journey, setJourney] = useState<InspectionJourney | null>(null);
  const [journeyName, setJourneyName] = useState('');
  const [journeyDescription, setJourneyDescription] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [blocks, setBlocks] = useState<JourneyBlock[]>([]);
  const [blockModal, setBlockModal] = useState<{ open: boolean; type?: string; editingBlockId?: string }>({ open: false });
  const [showShootInspectionConfig, setShowShootInspectionConfig] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingBlock, setEditingBlock] = useState<JourneyBlock | null>(null);
  const [currentShootInspectionConfigData, setCurrentShootInspectionConfigData] = useState<ShootInspectionData | null>(null);
  const [blockConfigs, setBlockConfigs] = useState<Map<string, any>>(new Map());

  // Load journey data on component mount
  useEffect(() => {
    const loadJourney = async () => {
      if (!id || !companyId) {
        navigate('/journeys');
        return;
      }

      try {
        const foundJourney = await workflowsService.getWorkflowById(id, companyId);

        if (foundJourney) {
          setJourney(foundJourney);
          setJourneyName(foundJourney.name);
          setJourneyDescription(foundJourney.description || '');
          setIsActive(foundJourney.isActive);
          setBlocks(foundJourney.blocks);

          // Load existing configs for blocks that have configId
          const configsToLoad = new Map<string, any>();
          for (const block of foundJourney.blocks) {
            if (block.configId && ['shootInspect', 'static', 'form'].includes(block.type)) {
              try {
                let configType: ScreenConfigType | null = null;
                if (block.type === 'shootInspect') configType = 'shoot-inspect';
                else if (block.type === 'static') configType = 'static-screen';
                else if (block.type === 'form') configType = 'form-screen';

                if (configType) {
                  const config = await screenConfigsService.getConfigById(configType, block.configId, foundJourney.companyId);
                  if (config) {
                    configsToLoad.set(block.id, config);
                  }
                }
              } catch (error) {
                console.error(`Error loading config for block ${block.id}:`, error);
              }
            }
          }
          setBlockConfigs(configsToLoad);
        } else {
          toast.error('Journey not found');
          navigate('/journeys');
          return;
        }
      } catch (error: any) {
        console.error('Error loading journey:', error);
        toast.error('Failed to load journey');
        navigate('/journeys');
      } finally {
        setLoading(false);
      }
    };

    loadJourney();
  }, [id, companyId, navigate]);

  const handleSave = async () => {
    if (!journeyName.trim()) {
      toast.error('Please enter a journey name');
      return;
    }

    if (blocks.length === 0) {
      toast.error('Please add at least one block to the journey');
      return;
    }

    if (!journey) return;

    try {
      // Save any new or modified screen configs
      const blocksWithConfigIds = await Promise.all(
        blocks.map(async (block) => {
          if (!blockConfigs.has(block.id)) return block;

          const configData = blockConfigs.get(block.id);
          let configType: ScreenConfigType | null = null;

          if (block.type === 'shootInspect') configType = 'shoot-inspect';
          else if (block.type === 'static') configType = 'static-screen';
          else if (block.type === 'form') configType = 'form-screen';

          if (configType && journey.companyId) {
            // Check if this is an existing config (has configId) or a new one
            if (block.configId) {
              // Update existing config
              const savedConfig = await screenConfigsService.updateConfig(
                configType,
                block.configId,
                journey.companyId,
                {
                  name: configData.name,
                  description: configData.description,
                  config: configData.config
                }
              );
              return { ...block, configId: savedConfig.id };
            } else {
              // Create new config
              const savedConfig = await screenConfigsService.createConfig(configType, {
                companyId: journey.companyId,
                id: configData.id,
                name: configData.name,
                description: configData.description,
                config: configData.config
              });
              return { ...block, configId: savedConfig.id };
            }
          }
          return block;
        })
      );

      // Update the workflow
      await workflowsService.updateWorkflow(journey.id, {
        name: journeyName,
        description: journeyDescription,
        isActive,
        blocks: blocksWithConfigIds
      }, journey.companyId);

      toast.success('Journey updated successfully');
      navigate('/journeys');
    } catch (error: any) {
      console.error('Error updating journey:', error);
      toast.error('Failed to update journey');
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

  const editBlock = (block: JourneyBlock) => {
    setEditingBlock(block);

    if (block.type === 'shootInspect') {
      // Load existing config if available
      const existingConfig = blockConfigs.get(block.id);
      const shootInspectionData: ShootInspectionData = existingConfig || {
        id: block.configId || block.id,
        name: block.name,
        description: block.description || '',
        config: []
      };
      setCurrentShootInspectionConfigData(shootInspectionData);
      setShowShootInspectionConfig(true);
    } else {
      // For other block types, open the appropriate modal with editing flag
      setBlockModal({ open: true, type: block.type, editingBlockId: block.id });
    }
  };

  const removeBlock = (blockId: string) => {
    setBlocks(blocks.filter(b => b.id !== blockId));
  };

  const handleShootInspectionSave = (config: ShootInspectionData) => {
    if (editingBlock) {
      // Update existing block
      const updatedBlocks = blocks.map(block =>
        block.id === editingBlock.id
          ? { ...block, name: config.name, description: config.description }
          : block
      );
      setBlocks(updatedBlocks);

      // Update the config in blockConfigs
      if (editingBlock.configId) {
        setBlockConfigs(prev => {
          const newMap = new Map(prev);
          newMap.set(editingBlock.id, { ...config, id: editingBlock.configId });
          return newMap;
        });
      }

      setEditingBlock(null);
    } else {
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

      setBlocks([...blocks, newBlock]);

      // Store the full config data with semantic ID
      setBlockConfigs(prev => {
        const newMap = new Map(prev);
        newMap.set(stepId, { ...config, id: configId });
        return newMap;
      });
    }
    setShowShootInspectionConfig(false);
    setCurrentShootInspectionConfigData(null);
  };

  const BlockConfigModal = () => {
    if (!blockModal.type) return null;

    const blockTypeInfo = blockTypes.find(bt => bt.type === blockModal.type);
    const isEditing = !!blockModal.editingBlockId;
    const editingBlockData = isEditing ? blocks.find(b => b.id === blockModal.editingBlockId) : null;

    // Initialize state with current block data or defaults
    const [modalBlockName, setModalBlockName] = useState('');
    const [modalBlockDesc, setModalBlockDesc] = useState('');
    const [modalConfigJson, setModalConfigJson] = useState('');

    // Update modal state when opening with a block to edit
    useEffect(() => {
      if (blockModal.open) {
        setModalBlockName(editingBlockData?.name || blockTypeInfo?.name || '');
        setModalBlockDesc(editingBlockData?.description || '');

        // Load existing config if editing a block with config
        if (isEditing && editingBlockData?.id) {
          const existingConfig = blockConfigs.get(editingBlockData.id);
          if (existingConfig?.config) {
            setModalConfigJson(JSON.stringify(existingConfig.config, null, 2));
          } else {
            setModalConfigJson('');
          }
        } else if (blockModal.type === 'static') {
          setModalConfigJson(JSON.stringify(onboardingData.screens, null, 2));
        } else {
          setModalConfigJson('');
        }
      }
    }, [blockModal.open, editingBlockData, blockTypeInfo, isEditing]);

    const handleSaveBlock = () => {
      if (isEditing && blockModal.editingBlockId) {
        // Update existing block
        const updatedBlocks = blocks.map(block =>
          block.id === blockModal.editingBlockId
            ? { ...block, name: modalBlockName, description: modalBlockDesc }
            : block
        );
        setBlocks(updatedBlocks);

        // Update config if this is a form or static block
        if (['form', 'static'].includes(blockModal.type!) && modalConfigJson) {
          try {
            const parsedConfig = JSON.parse(modalConfigJson);
            const existingBlock = blocks.find(b => b.id === blockModal.editingBlockId);

            setBlockConfigs(prev => {
              const newMap = new Map(prev);
              newMap.set(blockModal.editingBlockId!, {
                id: existingBlock?.configId || `${blockModal.type}-${Date.now()}`,
                name: modalBlockName,
                description: modalBlockDesc,
                config: parsedConfig
              });
              return newMap;
            });
          } catch (error) {
            toast.error('Invalid JSON configuration');
            return;
          }
        }

        setEditingBlock(null);
      } else {
        // Create new block
        const typeCountMap: { [key: string]: number } = {};
        blocks.forEach(b => {
          typeCountMap[b.type] = (typeCountMap[b.type] || 0) + 1;
        });

        const finalType = blockModal.type || 'unknown';
        const stepCount = (typeCountMap[finalType] || 0) + 1;
        const stepId = `${finalType}-step-${stepCount}`;

        // Generate configId for blocks that need it
        let configId: string | undefined;
        if (['form', 'static'].includes(finalType)) {
          configId = `${finalType}-${stepCount}`;
        }

        const newBlock: JourneyBlock = {
          id: stepId,
          type: finalType as any,
          name: modalBlockName || blockTypeInfo?.name || 'Unnamed Block',
          description: modalBlockDesc,
          ...(configId && { configId }),
          order: blocks.length + 1
        };

        // Save config for form and static blocks
        if (['form', 'static'].includes(finalType) && configId) {
          try {
            const parsedConfig = modalConfigJson ? JSON.parse(modalConfigJson) : {};

            setBlockConfigs(prev => {
              const newMap = new Map(prev);
              newMap.set(stepId, {
                id: configId,
                name: modalBlockName,
                description: modalBlockDesc,
                config: parsedConfig
              });
              return newMap;
            });
          } catch (error) {
            toast.error('Invalid JSON configuration');
            return;
          }
        }

        setBlocks([...blocks, newBlock]);
      }
      setBlockModal({ open: false });
    };

    return (
      <Modal
        isOpen={blockModal.open && !!blockModal.type}
        onClose={() => {
          setBlockModal({ open: false });
          setEditingBlock(null);
        }}
        title={isEditing ? `Edit ${blockTypeInfo?.name}` : `Configure ${blockTypeInfo?.name}`}
        size="lg"
      >
        <div className="space-y-4">
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
                value={modalConfigJson}
                onChange={(e) => setModalConfigJson(e.target.value)}
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

          {blockModal.type === 'static' && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">Static Screens JSON Configuration</label>
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
                rows={12}
                value={modalConfigJson}
                onChange={(e) => setModalConfigJson(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                placeholder="Static screens JSON configuration (onboarding/offboarding)..."
              />
            </div>
          )}

          <div className="flex gap-3 justify-end pt-4">
            <Button variant="secondary" onClick={() => {
              setBlockModal({ open: false });
              setEditingBlock(null);
            }}>
              Cancel
            </Button>
            <Button onClick={handleSaveBlock}>
              {isEditing ? 'Save Changes' : 'Add Block'}
            </Button>
          </div>
        </div>
      </Modal>
    );
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Loading..." />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading journey...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!journey) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Journey Not Found" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-4">The requested journey could not be found.</p>
            <Button onClick={() => navigate('/journeys')}>
              Back to Journeys
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header title={`Edit Journey: ${journey.name}`} />
      
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

          {/* Journey Blocks */}
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
                                variant="secondary" 
                                size="sm"
                                onClick={() => editBlock(block)}
                              >
                                Edit
                              </Button>
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

          {/* JSON Import/Export */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Journey Configuration</h3>
            <textarea
              rows={8}
              placeholder="Journey JSON configuration will appear here..."
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
              value={JSON.stringify([{
                id: journey.id,
                steps: blocks.map((block, index) => ({
                  id: `${block.type}-${index + 1}`,
                  type: block.type,
                  ...(block.configId && { configId: block.configId })
                }))
              }], null, 2)}
              readOnly
            />
          </div>

          {/* Save Buttons */}
          <div className="flex gap-4 justify-end sticky bottom-0 bg-white py-4 border-t border-gray-200">
            <Button 
              variant="secondary"
              onClick={() => navigate('/journeys')}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              disabled={!journeyName || blocks.length === 0}
              className="flex items-center gap-2"
            >
              <Save size={16} />
              Save Changes
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
                  // Initialize shoot inspection data for new block
                  const shootInspectCount = blocks.filter(b => b.type === 'shootInspect').length + 1;
                  const shootInspectionData: ShootInspectionData = {
                    id: `shoot-inspect-${shootInspectCount}`,
                    name: 'Shoot Inspection Block',
                    description: '',
                    config: []
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
          setEditingBlock(null);
          setCurrentShootInspectionConfigData(null);
        }}
        title={editingBlock ? "Edit Shoot Inspection Block" : "Configure Shoot Inspection Block"}
        size="xl"
      >
        {currentShootInspectionConfigData && (
          <ShootInspectionConfig
            initialData={currentShootInspectionConfigData}
            onSave={handleShootInspectionSave}
            onCancel={() => {
              setShowShootInspectionConfig(false);
              setEditingBlock(null);
              setCurrentShootInspectionConfigData(null);
            }}
          />
        )}
      </Modal>
    </div>
  );
}