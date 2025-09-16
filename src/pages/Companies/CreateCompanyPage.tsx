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
  maxSendings: number;
  delayDays: number;
  delayMinutes: number;
  webhookEnabled: boolean;
  recipients: {
    customer: {
      enabled: boolean;
      config: { type: 'email' | 'sms'; address: string };
      templates: {
        [language: string]: {
          email: { subject: string; htmlContent: string; enabled: boolean };
          sms: { content: string; enabled: boolean };
        }
      }
    };
    agent: {
      enabled: boolean;
      config: { type: 'email' | 'sms'; address: string };
      templates: {
        [language: string]: {
          email: { subject: string; htmlContent: string; enabled: boolean };
          sms: { content: string; enabled: boolean };
        }
      }
    };
    companyEmailAddress: {
      enabled: boolean;
      config: { type: 'email' | 'sms'; address: string };
      templates: {
        [language: string]: {
          email: { subject: string; htmlContent: string; enabled: boolean };
          sms: { content: string; enabled: boolean };
        }
      }
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
  const [eventConfigs, setEventConfigs] = useState({
    selfInspectionCreation: {
      enabled: false,
      recipients: {
        customerPhone: { enabled: false, address: '{{customerPhone}}' },
        companyEmail: { enabled: false, address: 'company@example.com' },
        agentEmail: { enabled: false, address: 'agent@example.com' }
      },
      templates: languages.reduce((acc, lang) => ({
        ...acc,
        [lang]: {
          email: { subject: 'Vehicle Inspection Created', htmlContent: 'Your inspection has been created.', enabled: true },
          sms: { content: 'Your vehicle inspection is ready.', enabled: false }
        }
      }), {})
    },
    automatedChaseUp: {
      enabled: false,
      recipients: {
        customerPhone: { enabled: false, address: '{{customerPhone}}' },
        companyEmail: { enabled: false, address: 'company@example.com' },
        agentEmail: { enabled: false, address: 'agent@example.com' }
      },
      templates: languages.reduce((acc, lang) => ({
        ...acc,
        [lang]: {
          email: { subject: 'Reminder: Complete your inspection', htmlContent: 'Please complete your vehicle inspection.', enabled: true },
          sms: { content: 'Reminder: Complete your inspection {{inspectionLink}}', enabled: false }
        }
      }), {})
    },
    manualChaseUp: {
      enabled: false,
      recipients: {
        customerPhone: { enabled: false, address: '{{customerPhone}}' },
        companyEmail: { enabled: false, address: 'company@example.com' },
        agentEmail: { enabled: false, address: 'agent@example.com' }
      },
      templates: languages.reduce((acc, lang) => ({
        ...acc,
        [lang]: {
          email: { subject: 'Manual Reminder', htmlContent: 'Manual reminder to complete inspection.', enabled: true },
          sms: { content: 'Manual reminder: {{inspectionLink}}', enabled: false }
        }
      }), {})
    },
    inspectionFinished: {
      enabled: false,
      recipients: {
        customerPhone: { enabled: false, address: '{{customerPhone}}' },
        companyEmail: { enabled: false, address: 'company@example.com' },
        agentEmail: { enabled: false, address: 'agent@example.com' }
      },
      templates: languages.reduce((acc, lang) => ({
        ...acc,
        [lang]: {
          email: { subject: 'Inspection Completed', htmlContent: 'Your vehicle inspection has been completed.', enabled: true },
          sms: { content: 'Your inspection is complete.', enabled: false }
        }
      }), {})
    },
    damageReviewFinished: {
      enabled: false,
      recipients: {
        customerPhone: { enabled: false, address: '{{customerPhone}}' },
        companyEmail: { enabled: false, address: 'company@example.com' },
        agentEmail: { enabled: false, address: 'agent@example.com' }
      },
      templates: languages.reduce((acc, lang) => ({
        ...acc,
        [lang]: {
          email: { subject: 'Damage Review Complete', htmlContent: 'Damage review has been completed.', enabled: true },
          sms: { content: 'Damage review complete.', enabled: false }
        }
      }), {})
    },
    shareUpdatedReport: {
      enabled: false,
      recipients: {
        customerPhone: { enabled: false, address: '{{customerPhone}}' },
        companyEmail: { enabled: false, address: 'company@example.com' },
        agentEmail: { enabled: false, address: 'agent@example.com' }
      },
      templates: languages.reduce((acc, lang) => ({
        ...acc,
        [lang]: {
          email: { subject: 'Updated Report Available', htmlContent: 'Your updated report is available.', enabled: true },
          sms: { content: 'Updated report available.', enabled: false }
        }
      }), {})
    }
  });

  // Automated Chase-up Messages (separate tab)
  const [chaseUpGlobalConfig, setChaseUpGlobalConfig] = useState({
    activationDate: new Date().toISOString().split('T')[0],
    utcHour: 9,
    utcMinute: 0
  });
  const [chaseUpMessages, setChaseUpMessages] = useState<ChaseUpMessage[]>([
    {
      id: '1',
      name: 'First Reminder',
      maxSendings: 3,
      delayDays: 1,
      delayMinutes: 0,
      webhookEnabled: false,
      recipients: {
        customer: {
          enabled: true,
          config: { type: 'email', address: '{{customerEmail}}' },
          templates: languages.reduce((acc, lang) => ({
            ...acc,
            [lang]: {
              email: { subject: 'Reminder: Complete your inspection', htmlContent: 'Dear {{customerName}}, please complete your inspection.', enabled: true },
              sms: { content: 'Hi {{customerName}}, please complete your inspection: {{inspectionLink}}', enabled: false }
            }
          }), {})
        },
        agent: {
          enabled: false,
          config: { type: 'email', address: 'agent@example.com' },
          templates: languages.reduce((acc, lang) => ({
            ...acc,
            [lang]: {
              email: { subject: 'Customer Reminder Sent', htmlContent: 'A reminder has been sent to {{customerName}}.', enabled: true },
              sms: { content: 'Reminder sent to {{customerName}}', enabled: false }
            }
          }), {})
        },
        companyEmailAddress: {
          enabled: false,
          config: { type: 'email', address: 'company@example.com' },
          templates: languages.reduce((acc, lang) => ({
            ...acc,
            [lang]: {
              email: { subject: 'Reminder Activity', htmlContent: 'Reminder sent for inspection {{inspectionId}}.', enabled: true },
              sms: { content: 'Reminder activity for {{inspectionId}}', enabled: false }
            }
          }), {})
        }
      }
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
      maxSendings: 3,
      delayDays: chaseUpMessages.length === 0 ? 1 : 3,
      delayMinutes: 0,
      webhookEnabled: false,
      recipients: {
        customer: {
          enabled: true,
          config: { type: 'email', address: '{{customerEmail}}' },
          templates: languages.reduce((acc, lang) => ({
            ...acc,
            [lang]: {
              email: { subject: 'Reminder: Complete your inspection', htmlContent: 'Dear {{customerName}}, please complete your inspection.', enabled: true },
              sms: { content: 'Hi {{customerName}}, please complete your inspection: {{inspectionLink}}', enabled: false }
            }
          }), {})
        },
        agent: {
          enabled: false,
          config: { type: 'email', address: 'agent@example.com' },
          templates: languages.reduce((acc, lang) => ({
            ...acc,
            [lang]: {
              email: { subject: 'Customer Reminder Sent', htmlContent: 'A reminder has been sent to {{customerName}}.', enabled: true },
              sms: { content: 'Reminder sent to {{customerName}}', enabled: false }
            }
          }), {})
        },
        companyEmailAddress: {
          enabled: false,
          config: { type: 'email', address: 'company@example.com' },
          templates: languages.reduce((acc, lang) => ({
            ...acc,
            [lang]: {
              email: { subject: 'Reminder Activity', htmlContent: 'Reminder sent for inspection {{inspectionId}}.', enabled: true },
              sms: { content: 'Reminder activity for {{inspectionId}}', enabled: false }
            }
          }), {})
        }
      }
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

  const updateChaseUpRecipient = (messageId: string, recipientKey: string, field: string, value: any) => {
    setChaseUpMessages(messages =>
      messages.map(msg =>
        msg.id === messageId
          ? {
              ...msg,
              recipients: {
                ...msg.recipients,
                [recipientKey]: {
                  ...msg.recipients[recipientKey],
                  [field]: value
                }
              }
            }
          : msg
      )
    );
  };

  const updateChaseUpRecipientConfig = (messageId: string, recipientKey: string, field: string, value: any) => {
    setChaseUpMessages(messages =>
      messages.map(msg =>
        msg.id === messageId
          ? {
              ...msg,
              recipients: {
                ...msg.recipients,
                [recipientKey]: {
                  ...msg.recipients[recipientKey],
                  config: {
                    ...msg.recipients[recipientKey].config,
                    [field]: value
                  }
                }
              }
            }
          : msg
      )
    );
  };

  const updateChaseUpRecipientTemplate = (messageId: string, recipientKey: string, language: string, type: 'email' | 'sms', field: string, value: any) => {
    setChaseUpMessages(messages =>
      messages.map(msg =>
        msg.id === messageId
          ? {
              ...msg,
              recipients: {
                ...msg.recipients,
                [recipientKey]: {
                  ...msg.recipients[recipientKey],
                  templates: {
                    ...msg.recipients[recipientKey].templates,
                    [language]: {
                      ...msg.recipients[recipientKey].templates[language],
                      [type]: {
                        ...msg.recipients[recipientKey].templates[language]?.[type],
                        [field]: value
                      }
                    }
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
        if (focusedField.startsWith('event-')) {
          const [, eventKey, language, type, field] = focusedField.split('-');
          setEventConfigs(prev => ({
            ...prev,
            [eventKey]: {
              ...prev[eventKey],
              templates: {
                ...prev[eventKey].templates,
                [language]: {
                  ...prev[eventKey].templates[language],
                  [type]: {
                    ...prev[eventKey].templates[language]?.[type],
                    [field]: newValue
                  }
                }
              }
            }
          }));
        } else if (focusedField.startsWith('chaseup-')) {
          const parts = focusedField.split('-');
          if (parts.length === 6) {
            // chaseup-messageId-recipientKey-language-type-field
            const [, messageId, recipientKey, language, type, field] = parts;
            updateChaseUpRecipientTemplate(messageId, recipientKey, language, type as 'email' | 'sms', field, newValue);
          }
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

          {/* Event Configurations */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Event Notifications</h3>
            
            {Object.entries(eventConfigs).map(([eventKey, eventConfig]) => (
              <div key={eventKey} className="border border-gray-200 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">
                    {eventKey === 'selfInspectionCreation' && 'Self Inspection Creation'}
                    {eventKey === 'automatedChaseUp' && 'Automated Chase-up Message'}
                    {eventKey === 'manualChaseUp' && 'Manual Chase-up Message'}
                    {eventKey === 'inspectionFinished' && 'Inspection Finished Message'}
                    {eventKey === 'damageReviewFinished' && 'Damage Review Finished Message'}
                    {eventKey === 'shareUpdatedReport' && 'Share Updated Report Message'}
                  </h4>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={eventConfig.enabled}
                      onChange={(e) => setEventConfigs(prev => ({
                        ...prev,
                        [eventKey]: { ...prev[eventKey], enabled: e.target.checked }
                      }))}
                      className="rounded border-gray-300 text-blue-600 shadow-sm"
                    />
                    <span className="ml-2 text-sm text-gray-700">Enabled</span>
                  </label>
                </div>

                {/* Recipients */}
                <div className="mb-6">
                  <h5 className="font-medium text-gray-900 mb-3">Recipients</h5>
                  <div className="space-y-3">
                    {Object.entries(eventConfig.recipients).map(([recipientKey, recipient]) => (
                      <div key={recipientKey} className="flex items-center gap-4">
                        <label className="flex items-center min-w-[150px]">
                          <input
                            type="checkbox"
                            checked={recipient.enabled}
                            onChange={(e) => setEventConfigs(prev => ({
                              ...prev,
                              [eventKey]: {
                                ...prev[eventKey],
                                recipients: {
                                  ...prev[eventKey].recipients,
                                  [recipientKey]: { ...recipient, enabled: e.target.checked }
                                }
                              }
                            }))}
                            className="rounded border-gray-300 text-blue-600 shadow-sm"
                          />
                          <span className="ml-2 text-sm text-gray-700 capitalize">
                            {recipientKey === 'customerPhone' && 'Customer Phone'}
                            {recipientKey === 'companyEmail' && 'Company Email'}
                            {recipientKey === 'agentEmail' && 'Agent Email'}
                          </span>
                        </label>
                        <input
                          type="text"
                          value={recipient.address}
                          onChange={(e) => setEventConfigs(prev => ({
                            ...prev,
                            [eventKey]: {
                              ...prev[eventKey],
                              recipients: {
                                ...prev[eventKey].recipients,
                                [recipientKey]: { ...recipient, address: e.target.value }
                              }
                            }
                          }))}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Email address or variable"
                        />
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
                                checked={eventConfig.templates[language]?.email?.enabled || false}
                                onChange={(e) => setEventConfigs(prev => ({
                                  ...prev,
                                  [eventKey]: {
                                    ...prev[eventKey],
                                    templates: {
                                      ...prev[eventKey].templates,
                                      [language]: {
                                        ...prev[eventKey].templates[language],
                                        email: {
                                          ...prev[eventKey].templates[language]?.email,
                                          enabled: e.target.checked
                                        }
                                      }
                                    }
                                  }
                                }))}
                                className="rounded border-gray-300 text-blue-600 shadow-sm"
                              />
                              <span className="ml-2 text-sm text-gray-700">Enabled</span>
                            </label>
                          </div>
                          <Input
                            label="Subject"
                            value={eventConfig.templates[language]?.email?.subject || ''}
                            onChange={(e) => setEventConfigs(prev => ({
                              ...prev,
                              [eventKey]: {
                                ...prev[eventKey],
                                templates: {
                                  ...prev[eventKey].templates,
                                  [language]: {
                                    ...prev[eventKey].templates[language],
                                    email: {
                                      ...prev[eventKey].templates[language]?.email,
                                      subject: e.target.value
                                    }
                                  }
                                }
                              }
                            }))}
                            className="mb-2"
                          />
                          <textarea
                            rows={4}
                            value={eventConfig.templates[language]?.email?.htmlContent || ''}
                            onChange={(e) => setEventConfigs(prev => ({
                              ...prev,
                              [eventKey]: {
                                ...prev[eventKey],
                                templates: {
                                  ...prev[eventKey].templates,
                                  [language]: {
                                    ...prev[eventKey].templates[language],
                                    email: {
                                      ...prev[eventKey].templates[language]?.email,
                                      htmlContent: e.target.value
                                    }
                                  }
                                }
                              }
                            }))}
                            onFocus={() => setFocusedField(`event-${eventKey}-${language}-email-htmlContent`)}
                            onBlur={() => setFocusedField(null)}
                            data-field={`event-${eventKey}-${language}-email-htmlContent`}
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
                                checked={eventConfig.templates[language]?.sms?.enabled || false}
                                onChange={(e) => setEventConfigs(prev => ({
                                  ...prev,
                                  [eventKey]: {
                                    ...prev[eventKey],
                                    templates: {
                                      ...prev[eventKey].templates,
                                      [language]: {
                                        ...prev[eventKey].templates[language],
                                        sms: {
                                          ...prev[eventKey].templates[language]?.sms,
                                          enabled: e.target.checked
                                        }
                                      }
                                    }
                                  }
                                }))}
                                className="rounded border-gray-300 text-blue-600 shadow-sm"
                              />
                              <span className="ml-2 text-sm text-gray-700">Enabled</span>
                            </label>
                          </div>
                          <textarea
                            rows={3}
                            value={eventConfig.templates[language]?.sms?.content || ''}
                            onChange={(e) => setEventConfigs(prev => ({
                              ...prev,
                              [eventKey]: {
                                ...prev[eventKey],
                                templates: {
                                  ...prev[eventKey].templates,
                                  [language]: {
                                    ...prev[eventKey].templates[language],
                                    sms: {
                                      ...prev[eventKey].templates[language]?.sms,
                                      content: e.target.value
                                    }
                                  }
                                }
                              }
                            }))}
                            onFocus={() => setFocusedField(`event-${eventKey}-${language}-sms-content`)}
                            onBlur={() => setFocusedField(null)}
                            data-field={`event-${eventKey}-${language}-sms-content`}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="SMS content..."
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Character count: {(eventConfig.templates[language]?.sms?.content || '').length}/160
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Variables Panel */}
          {focusedField && focusedField.startsWith('event-') && (
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
      key: 'automated-chaseup',
      label: 'Automated Chase-up Messages',
      content: (
        <div className="space-y-6">
          {/* Global Configuration */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Global Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Activation Date (applies to all reminders)"
                type="date"
                value={chaseUpGlobalConfig.activationDate}
                onChange={(e) => setChaseUpGlobalConfig(prev => ({ ...prev, activationDate: e.target.value }))}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">UTC Sending Time (applies to all reminders)</label>
                <div className="flex gap-2">
                  <select
                    value={chaseUpGlobalConfig.utcHour}
                    onChange={(e) => setChaseUpGlobalConfig(prev => ({ ...prev, utcHour: parseInt(e.target.value) }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {Array.from({ length: 24 }, (_, i) => (
                      <option key={i} value={i}>{i.toString().padStart(2, '0')}</option>
                    ))}
                  </select>
                  <select
                    value={chaseUpGlobalConfig.utcMinute}
                    onChange={(e) => setChaseUpGlobalConfig(prev => ({ ...prev, utcMinute: parseInt(e.target.value) }))}
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
          </div>

          {/* Reminders */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Reminder Sequences</h3>
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
                      label="Max Sendings"
                      type="number"
                      min="1"
                      max="10"
                      value={message.maxSendings}
                      onChange={(e) => {
                        const newValue = parseInt(e.target.value) || 1;
                        updateChaseUpMessage(message.id, 'maxSendings', newValue);
                        // Auto-adjust based on delay rules
                        if ((message.delayDays > 0 || message.delayMinutes > 0) && newValue < 2) {
                          updateChaseUpMessage(message.id, 'maxSendings', 2);
                        }
                      }}
                    />

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={message.webhookEnabled}
                        onChange={(e) => updateChaseUpMessage(message.id, 'webhookEnabled', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 shadow-sm"
                      />
                      <span className="ml-2 text-sm text-gray-700">Webhook Enabled</span>
                    </label>
                  </div>

                  {/* Delay Configuration */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <Input
                      label={index === 0 ? "Delay from inspection completion (days)" : "Delay from previous reminder (days)"}
                      type="number"
                      min="0"
                      value={message.delayDays}
                      onChange={(e) => {
                        const newValue = parseInt(e.target.value) || 0;
                        updateChaseUpMessage(message.id, 'delayDays', newValue);
                        // Auto-adjust max sendings if delay is set
                        if ((newValue > 0 || message.delayMinutes > 0) && message.maxSendings < 2) {
                          updateChaseUpMessage(message.id, 'maxSendings', 2);
                        }
                      }}
                    />

                    <Input
                      label="Additional delay (minutes)"
                      type="number"
                      min="0"
                      max="1439"
                      value={message.delayMinutes}
                      onChange={(e) => {
                        const newValue = parseInt(e.target.value) || 0;
                        updateChaseUpMessage(message.id, 'delayMinutes', newValue);
                        // Auto-adjust max sendings if delay is set
                        if ((newValue > 0 || message.delayDays > 0) && message.maxSendings < 2) {
                          updateChaseUpMessage(message.id, 'maxSendings', 2);
                        }
                      }}
                    />
                  </div>

                  {/* Recipients with individual configs and templates */}
                  <div className="space-y-6">
                    {Object.entries(message.recipients).map(([recipientKey, recipientData]) => (
                      <div key={recipientKey} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h5 className="font-medium text-gray-900 capitalize">
                            {recipientKey === 'companyEmailAddress' ? 'Company Email Address' : recipientKey}
                          </h5>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={recipientData.enabled}
                              onChange={(e) => updateChaseUpRecipient(message.id, recipientKey, 'enabled', e.target.checked)}
                              className="rounded border-gray-300 text-blue-600 shadow-sm"
                            />
                            <span className="ml-2 text-sm text-gray-700">Enabled</span>
                          </label>
                        </div>

                        {/* Recipient Config */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                            <select
                              value={recipientData.config.type}
                              onChange={(e) => updateChaseUpRecipientConfig(message.id, recipientKey, 'type', e.target.value)}
                              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="email">Email</option>
                              <option value="sms">SMS</option>
                            </select>
                          </div>
                          <Input
                            label="Address"
                            value={recipientData.config.address}
                            onChange={(e) => updateChaseUpRecipientConfig(message.id, recipientKey, 'address', e.target.value)}
                            placeholder={recipientData.config.type === 'email' ? 'email@example.com or {{customerEmail}}' : 'Phone number or {{customerPhone}}'}
                          />
                        </div>

                        {/* Templates for this recipient */}
                        <div>
                          <h6 className="font-medium text-gray-800 mb-3">Templates for {recipientKey}</h6>
                          <div className="space-y-4">
                            {languages.map((language) => (
                              <div key={language} className="border border-gray-100 rounded-lg p-3">
                                <h6 className="font-medium text-gray-700 mb-2 uppercase text-sm">{language}</h6>
                                
                                {/* Email Template */}
                                <div className="mb-3">
                                  <div className="flex items-center justify-between mb-2">
                                    <label className="text-xs font-medium text-gray-600">Email Template</label>
                                    <label className="flex items-center">
                                      <input
                                        type="checkbox"
                                        checked={recipientData.templates[language]?.email?.enabled || false}
                                        onChange={(e) => updateChaseUpRecipientTemplate(message.id, recipientKey, language, 'email', 'enabled', e.target.checked)}
                                        className="rounded border-gray-300 text-blue-600 shadow-sm"
                                      />
                                      <span className="ml-1 text-xs text-gray-600">Enabled</span>
                                    </label>
                                  </div>
                                  <Input
                                    label="Subject"
                                    value={recipientData.templates[language]?.email?.subject || ''}
                                    onChange={(e) => updateChaseUpRecipientTemplate(message.id, recipientKey, language, 'email', 'subject', e.target.value)}
                                    className="mb-2"
                                  />
                                  <textarea
                                    rows={3}
                                    value={recipientData.templates[language]?.email?.htmlContent || ''}
                                    onChange={(e) => updateChaseUpRecipientTemplate(message.id, recipientKey, language, 'email', 'htmlContent', e.target.value)}
                                    onFocus={() => setFocusedField(`chaseup-${message.id}-${recipientKey}-${language}-email-htmlContent`)}
                                    onBlur={() => setFocusedField(null)}
                                    data-field={`chaseup-${message.id}-${recipientKey}-${language}-email-htmlContent`}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    placeholder="Email content..."
                                  />
                                </div>

                                {/* SMS Template */}
                                <div>
                                  <div className="flex items-center justify-between mb-2">
                                    <label className="text-xs font-medium text-gray-600">SMS Template</label>
                                    <label className="flex items-center">
                                      <input
                                        type="checkbox"
                                        checked={recipientData.templates[language]?.sms?.enabled || false}
                                        onChange={(e) => updateChaseUpRecipientTemplate(message.id, recipientKey, language, 'sms', 'enabled', e.target.checked)}
                                        className="rounded border-gray-300 text-blue-600 shadow-sm"
                                      />
                                      <span className="ml-1 text-xs text-gray-600">Enabled</span>
                                    </label>
                                  </div>
                                  <textarea
                                    rows={2}
                                    value={recipientData.templates[language]?.sms?.content || ''}
                                    onChange={(e) => updateChaseUpRecipientTemplate(message.id, recipientKey, language, 'sms', 'content', e.target.value)}
                                    onFocus={() => setFocusedField(`chaseup-${message.id}-${recipientKey}-${language}-sms-content`)}
                                    onBlur={() => setFocusedField(null)}
                                    data-field={`chaseup-${message.id}-${recipientKey}-${language}-sms-content`}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    placeholder="SMS content..."
                                  />
                                  <p className="text-xs text-gray-500 mt-1">
                                    Character count: {(recipientData.templates[language]?.sms?.content || '').length}/160
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
              ))}
            </div>
          </div>

          {/* Variables Panel */}
          {focusedField && focusedField.startsWith('chaseup-') && (
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