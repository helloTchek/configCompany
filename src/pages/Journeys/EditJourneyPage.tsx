import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
import onboardingData from '../../data/onboarding.json';
import { toast } from 'react-hot-toast';

export default function EditJourneyPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id, companyId } = useParams<{ id: string; companyId: string }>();
  const { user } = useAuth();

  const blockTypes = [
    { type: 'form', name: t('workflows:blockTypes.form.name'), description: t('workflows:blockTypes.form.description') },
    { type: 'shootInspect', name: t('workflows:blockTypes.shootInspection.name'), description: t('workflows:blockTypes.shootInspection.description') },
    { type: 'fastTrack', name: t('workflows:blockTypes.fastTrack.name'), description: t('workflows:blockTypes.fastTrack.description') },
    { type: 'addDamage', name: t('workflows:blockTypes.addDamage.name'), description: t('workflows:blockTypes.addDamage.description') },
    { type: 'static', name: t('workflows:blockTypes.static.name'), description: t('workflows:blockTypes.static.description') }
  ];
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

          // Extract configs from blocks (backend now includes configData in blocks)
          const configsToLoad = new Map<string, any>();
          for (const block of foundJourney.blocks) {
            if (block.configData) {
              configsToLoad.set(block.id, block.configData);
            }
          }
          setBlockConfigs(configsToLoad);
        } else {
          toast.error(t('workflows:messages.journeyNotFound'));
          navigate('/journeys');
          return;
        }
      } catch (error: any) {
        console.error('Error loading journey:', error);
        toast.error(t('workflows:messages.loadJourneyError'));
        navigate('/journeys');
      } finally {
        setLoading(false);
      }
    };

    loadJourney();
  }, [id, companyId, navigate]);

  const handleSave = async () => {
    if (!journeyName.trim()) {
      toast.error(t('workflows:messages.nameRequired'));
      return;
    }

    if (blocks.length === 0) {
      toast.error(t('workflows:messages.blockRequired'));
      return;
    }

    if (!journey) return;

    try {
      // Include configData directly in blocks for the backend to handle
      const blocksWithConfigData = blocks.map((block) => {
        if (blockConfigs.has(block.id) && ['shootInspect', 'static', 'form'].includes(block.type)) {
          const configData = blockConfigs.get(block.id);
          return {
            ...block,
            configData: configData  // Backend will handle creating/updating the config
          };
        }
        return block;
      });

      // Update the workflow with configData - backend handles config creation/updates
      await workflowsService.updateWorkflow(journey.id, {
        name: journeyName,
        description: journeyDescription,
        isActive,
        blocks: blocksWithConfigData
      }, journey.companyId);

      toast.success(t('workflows:messages.updateSuccess'));
      navigate('/journeys');
    } catch (error: any) {
      console.error('Error updating journey:', error);
      toast.error(t('workflows:messages.updateError'));
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
          if (existingConfig) {
            // For both form and static blocks, show the complete JSON structure
            setModalConfigJson(JSON.stringify(existingConfig, null, 2));
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
            let parsedJson = JSON.parse(modalConfigJson);
            const existingBlock = blocks.find(b => b.id === blockModal.editingBlockId);

            // Handle both array and object formats for both types
            if (blockModal.type === 'form' || blockModal.type === 'static') {
              // If the JSON is an array, extract the first element
              if (Array.isArray(parsedJson)) {
                if (parsedJson.length === 0) {
                  toast.error(t('workflows:messages.configArrayEmpty'));
                  return;
                }
                parsedJson = parsedJson[0];
              }

              // Validate that the JSON has required fields
              if (!parsedJson.id) {
                toast.error(t('workflows:messages.configIdRequired'));
                return;
              }

              // Update the block's name, description, and configId from the JSON
              const updatedBlocksWithMetadata = blocks.map(block =>
                block.id === blockModal.editingBlockId
                  ? {
                      ...block,
                      name: parsedJson.name || block.name,
                      description: parsedJson.description || block.description,
                      configId: parsedJson.id
                    }
                  : block
              );
              setBlocks(updatedBlocksWithMetadata);
            }

            setBlockConfigs(prev => {
              const newMap = new Map(prev);
              // For both form and static blocks, use the complete JSON structure as-is
              newMap.set(blockModal.editingBlockId!, parsedJson);
              return newMap;
            });
          } catch (error) {
            toast.error(t('workflows:messages.invalidJson'));
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

        // For blocks that need config stored (form, static), parse JSON first to get metadata
        let configData: any = null;
        if (['form', 'static'].includes(finalType) && configId) {
          try {
            let parsedJson = modalConfigJson ? JSON.parse(modalConfigJson) : {};

            // Handle both array and object formats for both types
            if (finalType === 'form' || finalType === 'static') {
              // If the JSON is an array, extract the first element
              if (Array.isArray(parsedJson)) {
                if (parsedJson.length === 0) {
                  toast.error(t('workflows:messages.configArrayEmpty'));
                  return;
                }
                parsedJson = parsedJson[0];
              }

              // Validate that the JSON has required fields
              if (!parsedJson.id) {
                toast.error(t('workflows:messages.configIdRequired'));
                return;
              }

              configData = parsedJson;
            }
          } catch (error) {
            console.error('JSON parse error:', error);
            toast.error(t('workflows:messages.invalidJson'));
            return;
          }
        }

        const newBlock: JourneyBlock = {
          id: stepId,
          type: finalType as any,
          name: (['form', 'static'].includes(finalType) && configData?.name)
            ? configData.name
            : (modalBlockName || blockTypeInfo?.name || t('workflows:labels.unnamedBlock')),
          description: (['form', 'static'].includes(finalType) && configData?.description)
            ? configData.description
            : modalBlockDesc,
          configId: (['form', 'static'].includes(finalType) && configData?.id)
            ? configData.id
            : configId,
          order: blocks.length + 1
        };

        // Save config for form and static blocks
        if (['form', 'static'].includes(finalType) && configId) {
          try {
            // configData already has the complete structure from earlier parsing
            setBlockConfigs(prev => {
              const newMap = new Map(prev);
              // For both form and static blocks, use the complete JSON structure as-is
              newMap.set(stepId, configData);
              return newMap;
            });
          } catch (error) {
            toast.error(t('workflows:messages.invalidJson'));
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
        title={isEditing ? t('workflows:modals.editBlock', { name: blockTypeInfo?.name }) : t('workflows:modals.configureBlock', { name: blockTypeInfo?.name })}
        size="lg"
      >
        <div className="space-y-4">
          {/* Only show Block Name and Description for non-form and non-static blocks */}
          {!['form', 'static'].includes(blockModal.type!) && (
            <>
              <Input
                label={t('workflows:fields.blockName')}
                value={modalBlockName}
                onChange={(e) => setModalBlockName(e.target.value)}
                placeholder={t('workflows:placeholders.enterBlockName')}
              />
              <Input
                label={t('workflows:fields.description')}
                value={modalBlockDesc}
                onChange={(e) => setModalBlockDesc(e.target.value)}
                placeholder={t('workflows:placeholders.enterDescription')}
              />
            </>
          )}

          {blockModal.type === 'form' && (
            <div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('workflows:labels.formConfiguration')}</label>
                <p className="text-xs text-gray-600 mb-2">
                  {t('workflows:labels.formConfigurationHint')}
                </p>
              </div>

              {/* Example */}
              <details className="mb-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
                <summary className="text-sm font-medium text-blue-900 cursor-pointer">
                  {t('workflows:labels.showExample')}
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
                <label className="block text-sm font-medium text-gray-700">{t('workflows:labels.jsonContent')}</label>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" className="flex items-center gap-1">
                    <Download size={14} />
                    {t('workflows:actions.download')}
                  </Button>
                  <Button variant="secondary" size="sm" className="flex items-center gap-1">
                    <Upload size={14} />
                    {t('workflows:actions.upload')}
                  </Button>
                </div>
              </div>
              <textarea
                rows={12}
                value={modalConfigJson}
                onChange={(e) => setModalConfigJson(e.target.value)}
                placeholder={t('workflows:placeholders.formJsonPlaceholder')}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                {t('workflows:labels.pasteFormJson')}
              </p>
            </div>
          )}

          {blockModal.type === 'shootInspection' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input label={t('workflows:fields.maxRetries')} type="number" defaultValue="3" />
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked={true}
                    className="rounded border-gray-300 text-blue-600 shadow-sm"
                  />
                  <span className="ml-2 text-sm text-gray-700">{t('workflows:labels.qualityCheckEnabled')}</span>
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('workflows:labels.photoAngles')}</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('workflows:labels.allowedDamageTypes')}</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('workflows:labels.staticConfiguration')}</label>
                <p className="text-xs text-gray-600 mb-2">
                  {t('workflows:labels.staticConfigurationHint')}
                </p>
              </div>

              {/* Example */}
              <details className="mb-3 bg-green-50 border border-green-200 rounded-lg p-3">
                <summary className="text-sm font-medium text-green-900 cursor-pointer">
                  {t('workflows:labels.showExample')}
                </summary>
                <pre className="mt-2 text-xs bg-white p-2 rounded border border-green-100 overflow-x-auto">
{`{
  "id": "static-onboard-1",
  "name": "Onboarding Screens",
  "description": "Welcome and instruction screens",
  "config": [
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
  ]
}`}</pre>
              </details>

              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">{t('workflows:labels.jsonContent')}</label>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" className="flex items-center gap-1">
                    <Download size={14} />
                    {t('workflows:actions.download')}
                  </Button>
                  <Button variant="secondary" size="sm" className="flex items-center gap-1">
                    <Upload size={14} />
                    {t('workflows:actions.upload')}
                  </Button>
                </div>
              </div>
              <textarea
                rows={12}
                value={modalConfigJson}
                onChange={(e) => setModalConfigJson(e.target.value)}
                placeholder={t('workflows:placeholders.staticJsonPlaceholder')}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                {t('workflows:labels.pasteStaticJson')}
              </p>
            </div>
          )}

          <div className="flex gap-3 justify-end pt-4">
            <Button variant="secondary" onClick={() => {
              setBlockModal({ open: false });
              setEditingBlock(null);
            }}>
              {t('workflows:actions.cancel')}
            </Button>
            <Button onClick={handleSaveBlock}>
              {isEditing ? t('workflows:actions.saveChanges') : t('workflows:blocks.addBlock')}
            </Button>
          </div>
        </div>
      </Modal>
    );
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={t('workflows:messages.loading')} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">{t('workflows:messages.loadingJourney')}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!journey) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={t('workflows:messages.journeyNotFound')} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-4">{t('workflows:messages.journeyNotFoundDesc')}</p>
            <Button onClick={() => navigate('/journeys')}>
              {t('workflows:actions.backToJourneys')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header title={t('workflows:modals.editJourneyTitle', { name: journey.name })} />

      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6">
          <Button
            variant="secondary"
            onClick={() => navigate('/journeys')}
            className="flex items-center gap-2 mb-4"
          >
            <ArrowLeft size={16} />
            {t('workflows:actions.backToJourneys')}
          </Button>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Journey Details */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('workflows:labels.journeyDetails')}</h3>
            <div className="grid grid-cols-1 gap-4">
              <Input
                label={t('workflows:fields.journeyName')}
                value={journeyName}
                onChange={(e) => setJourneyName(e.target.value)}
                placeholder={t('workflows:placeholders.enterJourneyName')}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('workflows:fields.description')}</label>
                <textarea
                  rows={3}
                  value={journeyDescription}
                  onChange={(e) => setJourneyDescription(e.target.value)}
                  placeholder={t('workflows:placeholders.enterDescription')}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Journey Blocks */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{t('workflows:labels.journeyBlocks')}</h3>
              <div className="relative">
                <Button
                  onClick={() => setBlockModal({ open: true })}
                  className="flex items-center gap-2"
                >
                  <Plus size={16} />
                  {t('workflows:blocks.addBlock')}
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
                        <p>{t('workflows:messages.noBlocksYet')}</p>
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
                                {t('workflows:actions.edit')}
                              </Button>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => removeBlock(block.id)}
                              >
                                {t('workflows:actions.remove')}
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('workflows:labels.journeyConfiguration')}</h3>
            <textarea
              rows={8}
              placeholder={t('workflows:placeholders.journeyJsonPlaceholder')}
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
              {t('workflows:actions.cancel')}
            </Button>
            <Button
              onClick={handleSave}
              disabled={!journeyName || blocks.length === 0}
              className="flex items-center gap-2"
            >
              <Save size={16} />
              {t('workflows:actions.saveChanges')}
            </Button>
          </div>
        </div>
      </div>

      {/* Block Selection Modal */}
      <Modal
        isOpen={blockModal.open && !blockModal.type}
        onClose={() => setBlockModal({ open: false })}
        title={t('workflows:modals.selectBlockType')}
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
                    name: t('workflows:blockTypes.shootInspection.name'),
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
        title={editingBlock ? t('workflows:modals.editShootInspectionBlock') : t('workflows:modals.configureShootInspectionBlock')}
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