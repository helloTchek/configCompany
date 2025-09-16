import React, { useState } from 'react';
import Button from '../UI/Button';
import Input from '../UI/Input';
import { Plus, Trash2, Save, X } from 'lucide-react';
import { ShootStep, ShootInspectionData } from '../../types';

interface ShootInspectionConfigProps {
  onSave: (config: ShootInspectionData) => void;
  onCancel: () => void;
  initialConfig?: ShootInspectionData;
}

export default function ShootInspectionConfig({ 
  onSave, 
  onCancel, 
  initialConfig 
}: ShootInspectionConfigProps) {
  const [configName, setConfigName] = useState(initialConfig?.name || '');
  const [configDescription, setConfigDescription] = useState(initialConfig?.description || '');
  const [steps, setSteps] = useState<ShootStep[]>(initialConfig?.config || []);
  const [showStepModal, setShowStepModal] = useState(false);
  const [editingStep, setEditingStep] = useState<{ index: number; step: ShootStep } | null>(null);
  const [activeTab, setActiveTab] = useState('general');

  const [stepForm, setStepForm] = useState({
    angle: '',
    quality: true,
    optional: false,
    typeImage: 'Exterior',
    stepType: 'body',
    customStepTypeName: '',
    retry: 3,
    showHelp: false,
    runDetection: true,
    urlThumb: '',
    overlayUrl: '',
    title: '',
    helpTitle: '',
    helpContent: ''
  });

  const stepTypes = [
    'body', 'motor', 'wheels', 'trunk', 'windshield', 'Seats', 'Carpets', 
    'RoofLining', 'Fascia', 'DoorPads', 'gearLever', 'media', 'vin', 
    'dashboard', 'speedometer', 'grayCard', 'technicalControl', 'invoices', 'other'
  ];

  const resetStepForm = () => {
    setStepForm({
      angle: '',
      quality: true,
      optional: false,
      typeImage: 'Exterior',
      stepType: 'body',
      customStepTypeName: '',
      retry: 3,
      showHelp: false,
      runDetection: true,
      urlThumb: '',
      overlayUrl: '',
      title: '',
      helpTitle: '',
      helpContent: ''
    });
    setActiveTab('general');
  };

  const handleAddStep = () => {
    setEditingStep(null);
    resetStepForm();
    setShowStepModal(true);
  };

  const handleEditStep = (index: number) => {
    const step = steps[index];
    setStepForm({
      angle: step.angle?.toString() || '',
      quality: step.quality,
      optional: step.optional,
      typeImage: step.typeExterior === 1 ? 'Exterior' : 
                 step.typeInterior === 1 ? 'Interior' : 'Additional',
      stepType: step.title.name || 'body',
      customStepTypeName: stepTypes.includes(step.title.name) ? '' : step.title.name,
      retry: step.retry,
      showHelp: step.showHelp,
      runDetection: step.runDetection || false,
      urlThumb: step.urlThumb,
      overlayUrl: step.overlay?.url || '',
      title: step.title.localization.find(l => l.locale === 'en')?.title || '',
      helpTitle: step.help.localization.find(l => l.locale === 'en')?.title || '',
      helpContent: step.help.localization.find(l => l.locale === 'en')?.content || ''
    });
    setEditingStep({ index, step });
    setShowStepModal(true);
  };

  const handleSaveStep = () => {
    const finalStepType = stepForm.stepType === 'other' ? stepForm.customStepTypeName : stepForm.stepType;
    
    if (stepForm.stepType === 'other' && !stepForm.customStepTypeName.trim()) {
      alert('Please enter a custom step type name');
      return;
    }

    const newStep: ShootStep = {
      angle: stepForm.angle ? parseInt(stepForm.angle) : undefined,
      quality: stepForm.quality,
      optional: stepForm.optional,
      typeImage: stepForm.typeImage === 'Exterior' ? 1 : 
                 stepForm.typeImage === 'Interior' ? 2 : 3,
      typeExterior: stepForm.typeImage === 'Exterior' ? 1 : undefined,
      typeInterior: stepForm.typeImage === 'Interior' ? 1 : undefined,
      typeAdditional: stepForm.typeImage === 'Additional' ? 1 : undefined,
      retry: stepForm.retry,
      showHelp: stepForm.showHelp,
      runDetection: stepForm.runDetection,
      urlThumb: stepForm.urlThumb,
      overlay: stepForm.overlayUrl ? {
        url: stepForm.overlayUrl,
        constraints: {
          portrait: {
            position: 1,
            scaleType: 1,
            marginStart: false,
            marginEnd: false
          },
          landscape: {
            position: 1,
            scaleType: 1,
            marginStart: false,
            marginEnd: false
          }
        }
      } : undefined,
      title: {
        name: finalStepType,
        localization: [
          {
            locale: 'en',
            title: stepForm.title || finalStepType
          }
        ]
      },
      help: {
        localization: [
          {
            locale: 'en',
            title: stepForm.helpTitle || null,
            content: stepForm.helpContent || null
          }
        ]
      }
    };

    if (editingStep !== null) {
      const updatedSteps = [...steps];
      updatedSteps[editingStep.index] = newStep;
      setSteps(updatedSteps);
    } else {
      setSteps([...steps, newStep]);
    }

    setShowStepModal(false);
    setEditingStep(null);
    resetStepForm();
  };

  const handleRemoveStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (!configName.trim()) {
      alert('Please enter a configuration name');
      return;
    }

    const config: ShootInspectionData = {
      id: initialConfig?.id || `config-${Date.now()}`,
      name: configName,
      description: configDescription,
      config: steps
    };

    onSave(config);
  };

  const StepModal = () => (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowStepModal(false)} />
        
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl transform">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              {editingStep ? 'Edit Step' : 'Create New Step'}
            </h3>
            <button
              onClick={() => setShowStepModal(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="p-6">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('general')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'general'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  General Settings
                </button>
                <button
                  onClick={() => setActiveTab('help')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'help'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Help Content
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            {activeTab === 'general' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Step Title"
                    value={stepForm.title}
                    onChange={(e) => setStepForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter step title"
                  />

                  <Input
                    label="Angle (degrees)"
                    type="number"
                    value={stepForm.angle}
                    onChange={(e) => setStepForm(prev => ({ ...prev, angle: e.target.value }))}
                    placeholder="e.g., 45"
                    min="0"
                    max="360"
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type Image</label>
                    <select
                      value={stepForm.typeImage}
                      onChange={(e) => setStepForm(prev => ({ ...prev, typeImage: e.target.value }))}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Exterior">Exterior</option>
                      <option value="Interior">Interior</option>
                      <option value="Additional">Additional</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Step Type</label>
                    <select
                      value={stepForm.stepType}
                      onChange={(e) => setStepForm(prev => ({ ...prev, stepType: e.target.value }))}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {stepTypes.map(type => (
                        <option key={type} value={type}>
                          {type === 'other' ? 'Other (Custom)' : type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {stepForm.stepType === 'other' && (
                  <div className="col-span-2">
                    <Input
                      label="Custom Step Type Name"
                      value={stepForm.customStepTypeName}
                      onChange={(e) => setStepForm(prev => ({ ...prev, customStepTypeName: e.target.value }))}
                      placeholder="Enter custom step type name"
                      required
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Thumbnail URL"
                    value={stepForm.urlThumb}
                    onChange={(e) => setStepForm(prev => ({ ...prev, urlThumb: e.target.value }))}
                    placeholder="https://example.com/thumb.jpg"
                  />

                  <Input
                    label="Overlay URL"
                    value={stepForm.overlayUrl}
                    onChange={(e) => setStepForm(prev => ({ ...prev, overlayUrl: e.target.value }))}
                    placeholder="https://example.com/overlay.png"
                  />

                  <Input
                    label="Max Retries"
                    type="number"
                    value={stepForm.retry}
                    onChange={(e) => setStepForm(prev => ({ ...prev, retry: parseInt(e.target.value) || 3 }))}
                    min="1"
                    max="10"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={stepForm.quality}
                      onChange={(e) => setStepForm(prev => ({ ...prev, quality: e.target.checked }))}
                      className="rounded border-gray-300 text-blue-600 shadow-sm"
                    />
                    <span className="ml-2 text-sm text-gray-700">Quality Check</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={stepForm.optional}
                      onChange={(e) => setStepForm(prev => ({ ...prev, optional: e.target.checked }))}
                      className="rounded border-gray-300 text-blue-600 shadow-sm"
                    />
                    <span className="ml-2 text-sm text-gray-700">Optional Step</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={stepForm.showHelp}
                      onChange={(e) => setStepForm(prev => ({ ...prev, showHelp: e.target.checked }))}
                      className="rounded border-gray-300 text-blue-600 shadow-sm"
                    />
                    <span className="ml-2 text-sm text-gray-700">Show Help</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={stepForm.runDetection}
                      onChange={(e) => setStepForm(prev => ({ ...prev, runDetection: e.target.checked }))}
                      className="rounded border-gray-300 text-blue-600 shadow-sm"
                    />
                    <span className="ml-2 text-sm text-gray-700">Run Detection</span>
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'help' && (
              <div className="space-y-4">
                <Input
                  label="Help Title"
                  value={stepForm.helpTitle}
                  onChange={(e) => setStepForm(prev => ({ ...prev, helpTitle: e.target.value }))}
                  placeholder="Enter help title"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Help Content</label>
                  <textarea
                    rows={6}
                    value={stepForm.helpContent}
                    onChange={(e) => setStepForm(prev => ({ ...prev, helpContent: e.target.value }))}
                    placeholder="Enter help content..."
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            <div className="flex gap-3 justify-end pt-6 border-t border-gray-200 mt-6">
              <Button
                variant="secondary"
                onClick={() => {
                  setShowStepModal(false);
                  setEditingStep(null);
                  resetStepForm();
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveStep}>
                {editingStep ? 'Update Step' : 'Add Step'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Configuration Details */}
      <div className="space-y-4">
        <Input
          label="Configuration Name"
          value={configName}
          onChange={(e) => setConfigName(e.target.value)}
          placeholder="Enter configuration name"
          required
        />
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            rows={3}
            value={configDescription}
            onChange={(e) => setConfigDescription(e.target.value)}
            placeholder="Enter configuration description"
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Steps Management */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold text-gray-900">Inspection Steps</h4>
          <Button
            onClick={handleAddStep}
            className="flex items-center gap-2"
            size="sm"
          >
            <Plus size={16} />
            Add Step
          </Button>
        </div>

        <div className="space-y-3">
          {steps.length === 0 && (
            <div className="text-center py-8 text-gray-500 border border-gray-200 rounded-lg">
              <p>No steps added yet. Click "Add Step" to start building your inspection workflow.</p>
            </div>
          )}
          
          {steps.map((step, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-900">Step {index + 1}</span>
                  <h5 className="font-medium text-gray-900">{step.title.name}</h5>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    {step.typeExterior ? 'Exterior' : step.typeInterior ? 'Interior' : 'Additional'}
                  </span>
                  {step.optional && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                      Optional
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {step.angle && `Angle: ${step.angle}°`}
                  {step.angle && step.retry && ' • '}
                  {step.retry && `Max retries: ${step.retry}`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleEditStep(index)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleRemoveStep(index)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button 
          onClick={handleSave}
          disabled={!configName.trim()}
          className="flex items-center gap-2"
        >
          <Save size={16} />
          Save Configuration
        </Button>
      </div>

      {/* Step Modal */}
      {showStepModal && <StepModal />}
    </div>
  );
}