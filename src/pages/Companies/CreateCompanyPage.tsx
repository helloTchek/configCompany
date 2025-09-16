import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import Tabs from '../../components/UI/Tabs';
import { ArrowLeft, Save, Plus, Trash2, Upload, Download } from 'lucide-react';

interface ChaseUpMessage {
  id: string;
  name: string;
  activationDate: string;
  maxSendings: number;
  utcHour: number;
  utcMinute: number;
  delayDays: number;
  delayMinutes: number;
  recipients: Array<{
    id: string;
    type: 'email' | 'sms';
    address: string;
    enabled: boolean;
  }>;
  templates: {
    [language: string]: {
      email?: {
        subject: string;
        htmlContent: string;
        enabled: boolean;
      };
      sms?: {
        content: string;
        enabled: boolean;
      };
    };
  };
}

const languages = ['en', 'fr', 'de', 'it', 'es', 'nl', 'sv', 'no'];

const variables = [
  { key: '{{customerName}}', description: 'Customer Name' },
  { key: '{{customerEmail}}', description: 'Customer Email' },
  { key: '{{customerPhone}}', description: 'Customer Phone' },
  { key: '{{inspectionId}}', description: 'Inspection ID' },
  { key: '{{inspectionLink}}', description: 'Inspection Link' },
  { key: '{{vehicleMake}}', description: 'Vehicle Make' },
  { key: '{{vehicleModel}}', description: 'Vehicle Model' },
  { key: '{{licensePlate}}', description: 'License Plate' },
  { key: '{{companyName}}', description: 'Company Name' },
  { key: '{{agentName}}', description: 'Agent Name' },
  { key: '{{inspectionDate}}', description: 'Inspection Date' },
  { key: '{{trackingUrl}}', description: 'Tracking URL' }
];

export default function CreateCompanyPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('general-settings');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
  // General Settings
  const [formData, setFormData] = useState({
    name: '',
    identifier: '',
    companyCode: '',
    contractType: 'Client',
    businessSector: 'Insurance',
    logoUrl: '',
    retentionPeriod: 24,
    disableFastTrack: false,
    enableMileageCapture: true,
    enableBlurDetection: true,
    enableVinScanning: true,
    enableBrandModelDetection: true,
    iaValidation: false,
    humanValidationEnabled: true,
    validationPriority: 3,
    maxValidationDelay: 60,
    minTaskProcessingDuration: 5,
    showStartInstantInspection: true,
    showSendInspectionLink: true,
    parentCompany: ''
  });

  // API Configuration
  const [apiConfig, setApiConfig] = useState({
    apiToken: '',
    currentRequests: 0,
    maxRequests: 5000,
    expiryDate: '2025-12-31',
    decisionTree: ''
  });

  // Events & Webhooks
  const [webhookUrl, setWebhookUrl] = useState('');
  const [chaseUpMessages, setChaseUpMessages] = useState<ChaseUpMessage[]>([
    {
      id: '1',
      name: 'First Reminder',
      activationDate: new Date().toISOString().split('T')[0],
      maxSendings: 3,
      utcHour: 9,
      utcMinute: 0,
      delayDays: 1,
      delayMinutes: 0,
      recipients: [
        { id: '1', type: 'email', address: '{{customerEmail}}', enabled: true }
      ],
      templates: languages.reduce((acc, lang) => ({
        ...acc,
        [lang]: {
          email: {
            subject: 'Reminder: Complete your vehicle inspection',
            htmlContent: 'Dear {{customerName}},\n\nThis is a reminder to complete your vehicle inspection.\n\nInspection Link: {{inspectionLink}}\n\nBest regards,\n{{companyName}}',
            enabled: true
          },
          sms: {
            content: 'Hi {{customerName}}, please complete your vehicle inspection: {{inspectionLink}}',
            enabled: false
          }
        }
      }), {})
    }
  ]);

  // Report Settings & Config Modules
  const [reportSettings, setReportSettings] = useState('');
  const [configModules, setConfigModules] = useState('');

  const [errors, setErrors] = useState({
    name: '',
    identifier: '',
    companyCode: ''
  });

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleApiConfigChange = (field: string, value: string | number) => {
    setApiConfig(prev => ({ ...prev, [field]: value }));
  };

  const addChaseUpMessage = () => {
    const newMessage: ChaseUpMessage = {
      id: Date.now().toString(),
      name: `Reminder ${chaseUpMessages.length + 1}`,
      activationDate: new Date().toISOString().split('T')[0],
      maxSendings: 3,
      utcHour: 9,
      utcMinute: 0,
      delayDays: chaseUpMessages.length === 0 ? 1 : 3,
      delayMinutes: 0,
      recipients: [
        { id: '1', type: 'email', address: '{{customerEmail}}', enabled: true }
      ],
      templates: languages.reduce((acc, lang) => ({
        ...acc,
        [lang]: {
          email: {
            subject: 'Reminder: Complete your vehicle inspection',
            htmlContent: 'Dear {{customerName}},\n\nThis is a reminder to complete your vehicle inspection.\n\nInspection Link: {{inspectionLink}}\n\nBest regards,\n{{companyName}}',
            enabled: true
          },
          sms: {
            content: 'Hi {{customerName}}, please complete your vehicle inspection: {{inspectionLink}}',
            enabled: false
          }
        }
      }), {})
    };
    setChaseUpMessages([...chaseUpMessages, newMessage]);
  };

  const removeChaseUpMessage = (id: string) => {
    if (chaseUpMessages.length > 1) {
      setChaseUpMessages(chaseUpMessages.filter(msg => msg.id !== id));
    }
  };

  const updateChaseUpMessage = (id: string, field: string, value: any) => {
    setChaseUpMessages(messages =>
      messages.map(msg =>
        msg.id === id ? { ...msg, [field]: value } : msg
      )
    );
  };

  const updateChaseUpTemplate = (messageId: string, language: string, type: 'email' | 'sms', field: string, value: any) => {
    setChaseUpMessages(messages =>
      messages.map(msg =>
        msg.id === messageId
          ? {
              ...msg,
              templates: {
                ...msg.templates,
                [language]: {
                  ...msg.templates[language],
                  [type]: {
                    ...msg.templates[language]?.[type],
                    [field]: value
                  }
                }
              }
            }
          : msg
      )
    );
  };

  const insertVariable = (variable: string) => {
    if (focusedField) {
      const element = document.querySelector(`[data-field="${focusedField}"]`) as HTMLTextAreaElement;
      if (element) {
        const start = element.selectionStart;
        const end = element.selectionEnd;
        const currentValue = element.value;
        const newValue = currentValue.substring(0, start) + variable + currentValue.substring(end);
        
        // Update the appropriate state
        if (focusedField.includes('chaseup-')) {
          const [, messageId, language, type, field] = focusedField.split('-');
          updateChaseUpTemplate(messageId, language, type as 'email' | 'sms', field, newValue);
        }
        
        // Set cursor position after the inserted variable
        setTimeout(() => {
          element.focus();
          element.setSelectionRange(start + variable.length, start + variable.length);
        }, 0);
      }
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: '',
      identifier: '',
      companyCode: ''
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Company name is required';
    }

    if (!formData.identifier.trim()) {
      newErrors.identifier = 'Company identifier is required';
    }

    if (!formData.companyCode.trim()) {
      newErrors.companyCode = 'Company code is required';
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.identifier && !newErrors.companyCode;
  };

  const handleSave = () => {
    if (!validateForm()) {
      setActiveTab('general-settings');
      return;
    }

    const newCompany = {
      id: `company-${Date.now()}`,
      ...formData,
      apiConfig,
      chaseUpMessages,
      webhookUrl,
      reportSettings,
      configModules,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    console.log('Creating company:', newCompany);
    navigate('/companies');
  };

  const tabs = [
    {
      key: 'general-settings',
      label: 'General Settings',
      content: (
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Input
                label="Company Name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                error={errors.name}
                required
              />

              <Input
                label="Company Identifier"
                value={formData.identifier}
                onChange={(e) => handleInputChange('identifier', e.target.value)}
                error={errors.identifier}
                required
              />

              <Input
                label="Company Code"
                value={formData.companyCode}
                onChange={(e) => handleInputChange('companyCode', e.target.value)}
                error={errors.companyCode}
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contract Type</label>
                <select
                  value={formData.contractType}
                  onChange={(e) => handleInputChange('contractType', e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Client">Client</option>
                  <option value="Prospect">Prospect</option>
                  <option value="Test">Test</option>
                  <option value="Demo">Demo</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Sector</label>
                <select
                  value={formData.businessSector}
                  onChange={(e) => handleInputChange('businessSector', e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Insurance">Insurance</option>
                  <option value="Leasing">Leasing</option>
                  <option value="Rental">Rental</option>
                  <option value="Fleet Management">Fleet Management</option>
                  <option value="Automotive">Automotive</option>
                </select>
              </div>

              <Input
                label="Logo URL"
                value={formData.logoUrl}
                onChange={(e) => handleInputChange('logoUrl', e.target.value)}
                placeholder="https://example.com/logo.png"
              />

              <Input
                label="Retention Period (months)"
                type="number"
                value={formData.retentionPeriod}
                onChange={(e) => handleInputChange('retentionPeriod', parseInt(e.target.value) || 24)}
                min="1"
                max="120"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Parent Company</label>
                <select
                  value={formData.parentCompany}
                  onChange={(e) => handleInputChange('parentCompany', e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">None (Root Company)</option>
                  <option value="1">AutoCorp Insurance</option>
                  <option value="2">FleetMax Leasing</option>
                </select>
              </div>
            </div>
          </div>

          {/* Processing Configuration */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Processing Configuration</h3>
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.disableFastTrack}
                  onChange={(e) => handleInputChange('disableFastTrack', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                />
                <span className="ml-2 text-sm text-gray-700">Disable Fast Track</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.enableMileageCapture}
                  onChange={(e) => handleInputChange('enableMileageCapture', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                />
                <span className="ml-2 text-sm text-gray-700">Enable Mileage Capture</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.enableBlurDetection}
                  onChange={(e) => handleInputChange('enableBlurDetection', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                />
                <span className="ml-2 text-sm text-gray-700">Blur License Plates</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.enableVinScanning}
                  onChange={(e) => handleInputChange('enableVinScanning', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                />
                <span className="ml-2 text-sm text-gray-700">Enable VIN Scanning</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.enableBrandModelDetection}
                  onChange={(e) => handleInputChange('enableBrandModelDetection', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                />
                <span className="ml-2 text-sm text-gray-700">Enable Brand & Model Detection</span>
              </label>
            </div>
          </div>

          {/* Validation Settings */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Validation Settings</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.iaValidation}
                  onChange={(e) => handleInputChange('iaValidation', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                />
                <span className="ml-2 text-sm text-gray-700">IA Validation (Joelle model)</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.humanValidationEnabled}
                  onChange={(e) => handleInputChange('humanValidationEnabled', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                />
                <span className="ml-2 text-sm text-gray-700">Human Validation Enabled</span>
              </label>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Validation Priority (0-5)</label>
                <select
                  value={formData.validationPriority}
                  onChange={(e) => handleInputChange('validationPriority', parseInt(e.target.value))}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value={0}>0 - Lowest Priority</option>
                  <option value={1}>1 - Very Low Priority</option>
                  <option value={2}>2 - Low Priority</option>
                  <option value={3}>3 - Medium Priority</option>
                  <option value={4}>4 - High Priority</option>
                  <option value={5}>5 - Highest Priority</option>
                </select>
              </div>

              <Input
                label="Max Validation Delay (minutes)"
                type="number"
                value={formData.maxValidationDelay}
                onChange={(e) => handleInputChange('maxValidationDelay', parseInt(e.target.value) || 60)}
                min="1"
                max="1440"
              />

              <Input
                label="Min Task Processing Duration (minutes)"
                type="number"
                value={formData.minTaskProcessingDuration}
                onChange={(e) => handleInputChange('minTaskProcessingDuration', parseInt(e.target.value) || 5)}
                min="1"
                max="60"
              />
            </div>
          </div>

          {/* Hub Configuration */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hub Configuration</h3>
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.showStartInstantInspection}
                  onChange={(e) => handleInputChange('showStartInstantInspection', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                />
                <span className="ml-2 text-sm text-gray-700">Show Start Instant Inspection</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.showSendInspectionLink}
                  onChange={(e) => handleInputChange('showSendInspectionLink', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                />
                <span className="ml-2 text-sm text-gray-700">Show Send Inspection Link</span>
              </label>
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'events-webhooks',
      label: 'Events & Webhooks',
      content: (
        <div className="space-y-6">
          {/* Webhook URL */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Webhook Configuration</h3>
            <Input
              label="Webhook URL"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="https://your-domain.com/webhook"
            />
          </div>

          {/* Automated Chase-up Messages */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Automated Chase-up Messages</h3>
                <p className="text-sm text-gray-600">Configure multiple reminder sequences</p>
              </div>
              <Button onClick={addChaseUpMessage} className="flex items-center gap-2">
                <Plus size={16} />
                Add Reminder
              </Button>
            </div>

            <div className="space-y-6">
              {chaseUpMessages.map((message, index) => (
                <div key={message.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-900">Reminder #{index + 1}</h4>
                    {chaseUpMessages.length > 1 && (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => removeChaseUpMessage(message.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    )}
                  </div>

                  {/* General Settings */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <Input
                      label="Reminder Name"
                      value={message.name}
                      onChange={(e) => updateChaseUpMessage(message.id, 'name', e.target.value)}
                    />

                    <Input
                      label="Activation Date"
                      type="date"
                      value={message.activationDate}
                      onChange={(e) => updateChaseUpMessage(message.id, 'activationDate', e.target.value)}
                    />

                    <Input
                      label="Max Sendings"
                      type="number"
                      min="1"
                      max="10"
                      value={message.maxSendings}
                      onChange={(e) => updateChaseUpMessage(message.id, 'maxSendings', parseInt(e.target.value) || 1)}
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">UTC Sending Time</label>
                      <div className="flex gap-2">
                        <select
                          value={message.utcHour}
                          onChange={(e) => updateChaseUpMessage(message.id, 'utcHour', parseInt(e.target.value))}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          {Array.from({ length: 24 }, (_, i) => (
                            <option key={i} value={i}>{i.toString().padStart(2, '0')}</option>
                          ))}
                        </select>
                        <select
                          value={message.utcMinute}
                          onChange={(e) => updateChaseUpMessage(message.id, 'utcMinute', parseInt(e.target.value))}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value={0}>00</option>
                          <option value={15}>15</option>
                          <option value={30}>30</option>
                          <option value={45}>45</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Delay Configuration */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <Input
                      label={index === 0 ? "Delay from inspection completion (days)" : "Delay from previous reminder (days)"}
                      type="number"
                      min="0"
                      value={message.delayDays}
                      onChange={(e) => updateChaseUpMessage(message.id, 'delayDays', parseInt(e.target.value) || 0)}
                    />

                    <Input
                      label="Additional delay (minutes)"
                      type="number"
                      min="0"
                      max="1439"
                      value={message.delayMinutes}
                      onChange={(e) => updateChaseUpMessage(message.id, 'delayMinutes', parseInt(e.target.value) || 0)}
                    />
                  </div>

                  {/* Recipients */}
                  <div className="mb-6">
                    <h5 className="font-medium text-gray-900 mb-3">Recipients</h5>
                    <div className="space-y-2">
                      {message.recipients.map((recipient) => (
                        <div key={recipient.id} className="flex items-center gap-4">
                          <select
                            value={recipient.type}
                            onChange={(e) => {
                              const newRecipients = message.recipients.map(r =>
                                r.id === recipient.id ? { ...r, type: e.target.value as 'email' | 'sms' } : r
                              );
                              updateChaseUpMessage(message.id, 'recipients', newRecipients);
                            }}
                            className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="email">Email</option>
                            <option value="sms">SMS</option>
                          </select>
                          <input
                            type="text"
                            value={recipient.address}
                            onChange={(e) => {
                              const newRecipients = message.recipients.map(r =>
                                r.id === recipient.id ? { ...r, address: e.target.value } : r
                              );
                              updateChaseUpMessage(message.id, 'recipients', newRecipients);
                            }}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder={recipient.type === 'email' ? 'email@example.com or {{customerEmail}}' : 'Phone number or {{customerPhone}}'}
                          />
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={recipient.enabled}
                              onChange={(e) => {
                                const newRecipients = message.recipients.map(r =>
                                  r.id === recipient.id ? { ...r, enabled: e.target.checked } : r
                                );
                                updateChaseUpMessage(message.id, 'recipients', newRecipients);
                              }}
                              className="rounded border-gray-300 text-blue-600 shadow-sm"
                            />
                            <span className="ml-2 text-sm text-gray-700">Enabled</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Templates */}
                  <div>
                    <h5 className="font-medium text-gray-900 mb-3">Message Templates</h5>
                    <div className="space-y-4">
                      {languages.map((language) => (
                        <div key={language} className="border border-gray-200 rounded-lg p-4">
                          <h6 className="font-medium text-gray-800 mb-3 uppercase">{language}</h6>
                          
                          {/* Email Template */}
                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <label className="text-sm font-medium text-gray-700">Email Template</label>
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={message.templates[language]?.email?.enabled || false}
                                  onChange={(e) => updateChaseUpTemplate(message.id, language, 'email', 'enabled', e.target.checked)}
                                  className="rounded border-gray-300 text-blue-600 shadow-sm"
                                />
                                <span className="ml-2 text-sm text-gray-700">Enabled</span>
                              </label>
                            </div>
                            <Input
                              label="Subject"
                              value={message.templates[language]?.email?.subject || ''}
                              onChange={(e) => updateChaseUpTemplate(message.id, language, 'email', 'subject', e.target.value)}
                              className="mb-2"
                            />
                            <textarea
                              rows={4}
                              value={message.templates[language]?.email?.htmlContent || ''}
                              onChange={(e) => updateChaseUpTemplate(message.id, language, 'email', 'htmlContent', e.target.value)}
                              onFocus={() => setFocusedField(`chaseup-${message.id}-${language}-email-htmlContent`)}
                              onBlur={() => setFocusedField(null)}
                              data-field={`chaseup-${message.id}-${language}-email-htmlContent`}
                              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Email content..."
                            />
                          </div>

                          {/* SMS Template */}
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <label className="text-sm font-medium text-gray-700">SMS Template</label>
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={message.templates[language]?.sms?.enabled || false}
                                  onChange={(e) => updateChaseUpTemplate(message.id, language, 'sms', 'enabled', e.target.checked)}
                                  className="rounded border-gray-300 text-blue-600 shadow-sm"
                                />
                                <span className="ml-2 text-sm text-gray-700">Enabled</span>
                              </label>
                            </div>
                            <textarea
                              rows={3}
                              value={message.templates[language]?.sms?.content || ''}
                              onChange={(e) => updateChaseUpTemplate(message.id, language, 'sms', 'content', e.target.value)}
                              onFocus={() => setFocusedField(`chaseup-${message.id}-${language}-sms-content`)}
                              onBlur={() => setFocusedField(null)}
                              data-field={`chaseup-${message.id}-${language}-sms-content`}
                              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="SMS content..."
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              Character count: {(message.templates[language]?.sms?.content || '').length}/160
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Variables Panel */}
          {focusedField && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-3">Available Variables</h4>
              <p className="text-sm text-blue-700 mb-3">Click any variable to insert it into the focused field:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {variables.map((variable) => (
                  <button
                    key={variable.key}
                    onClick={() => insertVariable(variable.key)}
                    className="text-left p-2 bg-white border border-blue-200 rounded hover:bg-blue-100 transition-colors"
                  >
                    <div className="font-mono text-xs text-blue-800">{variable.key}</div>
                    <div className="text-xs text-blue-600">{variable.description}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )
    },
    {
      key: 'api-configuration',
      label: 'API Configuration',
      content: (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">API Settings</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Input
                label="API Token"
                value={apiConfig.apiToken}
                onChange={(e) => handleApiConfigChange('apiToken', e.target.value)}
                placeholder="Generated automatically"
                disabled
              />

              <Input
                label="Current API Requests"
                type="number"
                value={apiConfig.currentRequests}
                onChange={(e) => handleApiConfigChange('currentRequests', parseInt(e.target.value) || 0)}
                min="0"
              />

              <Input
                label="Max API Requests"
                type="number"
                value={apiConfig.maxRequests}
                onChange={(e) => handleApiConfigChange('maxRequests', parseInt(e.target.value) || 5000)}
                min="1"
              />

              <Input
                label="Expiry Date"
                type="date"
                value={apiConfig.expiryDate}
                onChange={(e) => handleApiConfigChange('expiryDate', e.target.value)}
              />
            </div>

            <div className="mt-6">
              <Input
                label="Decision Tree Configuration"
                multiline
                rows={8}
                value={apiConfig.decisionTree}
                onChange={(e) => handleApiConfigChange('decisionTree', e.target.value)}
                placeholder='{"rules": [], "conditions": []}'
              />
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'report-settings',
      label: 'Report Settings',
      content: (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Report Configuration</h3>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" className="flex items-center gap-1">
                  <Upload size={14} />
                  Upload JSON
                </Button>
                <Button variant="secondary" size="sm" className="flex items-center gap-1">
                  <Download size={14} />
                  Download JSON
                </Button>
              </div>
            </div>
            <Input
              multiline
              rows={12}
              value={reportSettings}
              onChange={(e) => setReportSettings(e.target.value)}
              placeholder='{"picturesPreSelected": true, "showDamage": true, "showGallery": true}'
            />
          </div>
        </div>
      )
    },
    {
      key: 'config-modules',
      label: 'Config Modules',
      content: (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Module Configuration</h3>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" className="flex items-center gap-1">
                  <Upload size={14} />
                  Upload JSON
                </Button>
                <Button variant="secondary" size="sm" className="flex items-center gap-1">
                  <Download size={14} />
                  Download JSON
                </Button>
              </div>
            </div>
            <Input
              multiline
              rows={12}
              value={configModules}
              onChange={(e) => setConfigModules(e.target.value)}
              placeholder='{"fastTrack": {"canWearAndTear": true}, "shootInspect": {"autoFinalizationEnabled": false}}'
            />
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header title="Create Company" />
      
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6">
          <Button
            variant="secondary"
            onClick={() => navigate('/companies')}
            className="flex items-center gap-2 mb-4"
          >
            <ArrowLeft size={16} />
            Back to Companies
          </Button>
        </div>

        <div className="max-w-6xl mx-auto">
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/* Save Buttons */}
          <div className="flex gap-4 justify-end sticky bottom-0 bg-white py-4 border-t border-gray-200 mt-6">
            <Button variant="secondary" onClick={() => navigate('/companies')}>
              Cancel
            </Button>
            <Button 
              className="flex items-center gap-2" 
              onClick={handleSave}
            >
              <Save size={16} />
              Create Company
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}