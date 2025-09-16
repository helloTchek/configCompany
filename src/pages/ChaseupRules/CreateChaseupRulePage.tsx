import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import { ArrowLeft, Save } from 'lucide-react';
import { ChaseupRule, ChaseupReminder, ChaseupTemplates } from '../../types';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'it', name: 'Italiano' },
  { code: 'es', name: 'Español' },
  { code: 'nl', name: 'Nederlands' },
  { code: 'sv', name: 'Svenska' },
  { code: 'no', name: 'Norsk' }
];

const variables = [
  { key: '{{customerName}}', name: 'Customer Name' },
  { key: '{{customerEmail}}', name: 'Customer Email' },
  { key: '{{customerPhone}}', name: 'Customer Phone' },
  { key: '{{inspectionId}}', name: 'Inspection ID' },
  { key: '{{inspectionLink}}', name: 'Inspection Link' },
  { key: '{{vehicleMake}}', name: 'Vehicle Make' },
  { key: '{{vehicleModel}}', name: 'Vehicle Model' },
  { key: '{{licensePlate}}', name: 'License Plate' },
  { key: '{{companyName}}', name: 'Company Name' },
  { key: '{{agentName}}', name: 'Agent Name' },
  { key: '{{inspectionDate}}', name: 'Inspection Date' },
  { key: '{{trackingUrl}}', name: 'Tracking URL' }
];

const createEmptyTemplates = (): ChaseupTemplates => {
  const templates: ChaseupTemplates = {};
  languages.forEach(lang => {
    templates[lang.code] = {
      email: { subject: '', content: '' },
      sms: { content: '' }
    };
  });
  return templates;
};

const createEmptyReminder = (): ChaseupReminder => ({
  webhook: { enabled: false },
  user: {
    enabled: false,
    sms: false,
    email: false,
    templates: createEmptyTemplates()
  },
  customer: {
    enabled: false,
    sms: false,
    email: false,
    templates: createEmptyTemplates()
  },
  emailAddress: {
    enabled: false,
    address: '',
    sms: false,
    email: false,
    templates: createEmptyTemplates()
  }
});

export default function CreateChaseupRulePage() {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const fieldRefs = useRef<Record<string, HTMLInputElement | HTMLTextAreaElement>>({});

  const [formData, setFormData] = useState({
    company: '',
    type: 'event' as 'event' | 'anonymization',
    activationDate: '',
    utcSendingTime: { hour: 9, minute: 0 },
    firstDelayDays: undefined as number | undefined,
    firstDelayMinutes: undefined as number | undefined,
    secondDelayDays: undefined as number | undefined,
    secondDelayMinutes: undefined as number | undefined,
    maxSendings: 0 as 0 | 1 | 2,
    firstReminder: createEmptyReminder(),
    secondReminder: undefined as ChaseupReminder | undefined
  });

  const [errors, setErrors] = useState({
    company: '',
    activationDate: ''
  });

  // Auto-adjust max sendings and second reminder based on delays
  React.useEffect(() => {
    const hasDelays = formData.firstDelayDays || formData.firstDelayMinutes || 
                     formData.secondDelayDays || formData.secondDelayMinutes;
    
    if (hasDelays && formData.maxSendings !== 2) {
      setFormData(prev => ({
        ...prev,
        maxSendings: 2,
        secondReminder: prev.secondReminder || createEmptyReminder()
      }));
    }
  }, [formData.firstDelayDays, formData.firstDelayMinutes, formData.secondDelayDays, formData.secondDelayMinutes]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleReminderChange = (reminderType: 'firstReminder' | 'secondReminder', path: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [reminderType]: {
        ...prev[reminderType]!,
        ...setNestedValue(prev[reminderType]!, path, value)
      }
    }));
  };

  const setNestedValue = (obj: any, path: string, value: any): any => {
    const keys = path.split('.');
    const result = { ...obj };
    let current = result;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current[keys[i]] = { ...current[keys[i]] };
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    return result;
  };

  const handleVariableClick = (variableKey: string) => {
    if (focusedField && fieldRefs.current[focusedField]) {
      const field = fieldRefs.current[focusedField];
      const start = field.selectionStart || 0;
      const end = field.selectionEnd || 0;
      const currentValue = field.value;
      const newValue = currentValue.substring(0, start) + variableKey + currentValue.substring(end);
      
      field.value = newValue;
      
      // Trigger change event
      const event = new Event('input', { bubbles: true });
      field.dispatchEvent(event);
      
      // Set cursor position after the inserted variable
      setTimeout(() => {
        field.focus();
        field.setSelectionRange(start + variableKey.length, start + variableKey.length);
      }, 0);
    }
  };

  const assignFieldRef = useCallback((fieldId: string, ref: HTMLInputElement | HTMLTextAreaElement | null) => {
    if (ref) {
      fieldRefs.current[fieldId] = ref;
    } else {
      delete fieldRefs.current[fieldId];
    }
  }, []);

  const validateForm = () => {
    const newErrors = { company: '', activationDate: '' };

    if (!formData.company.trim()) {
      newErrors.company = 'Company is required';
    }

    if (!formData.activationDate.trim()) {
      newErrors.activationDate = 'Activation date is required';
    }

    setErrors(newErrors);
    return !newErrors.company && !newErrors.activationDate;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    const newRule: Omit<ChaseupRule, 'id' | 'createdAt' | 'updatedAt'> = {
      ...formData
    };

    console.log('Creating chase-up rule:', newRule);
    navigate('/chaseup-rules');
  };

  const renderRecipientConfig = (
    reminderType: 'firstReminder' | 'secondReminder',
    recipientType: 'user' | 'customer' | 'emailAddress',
    recipientLabel: string
  ) => {
    const reminder = formData[reminderType];
    if (!reminder) return null;

    const recipient = reminder[recipientType];

    return (
      <div className="border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h5 className="font-medium text-gray-900">{recipientLabel}</h5>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={recipient.enabled}
              onChange={(e) => handleReminderChange(reminderType, `${recipientType}.enabled`, e.target.checked)}
              className="rounded border-gray-300 text-blue-600 shadow-sm"
            />
            <span className="ml-2 text-sm text-gray-700">Enabled</span>
          </label>
        </div>

        {recipient.enabled && (
          <div className="space-y-4">
            {recipientType === 'emailAddress' && (
              <Input
                label="Email Address"
                type="email"
                value={recipient.address}
                onChange={(e) => handleReminderChange(reminderType, `${recipientType}.address`, e.target.value)}
                placeholder="recipient@example.com"
              />
            )}

            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={recipient.sms}
                  onChange={(e) => handleReminderChange(reminderType, `${recipientType}.sms`, e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 shadow-sm"
                />
                <span className="ml-2 text-sm text-gray-700">SMS</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={recipient.email}
                  onChange={(e) => handleReminderChange(reminderType, `${recipientType}.email`, e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 shadow-sm"
                />
                <span className="ml-2 text-sm text-gray-700">Email</span>
              </label>
            </div>

            {(recipient.sms || recipient.email) && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700">Language:</label>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                </div>

                {recipient.email && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Email Subject</label>
                    <input
                      ref={(ref) => assignFieldRef(`${reminderType}-${recipientType}-email-subject-${selectedLanguage}`, ref)}
                      type="text"
                      value={recipient.templates[selectedLanguage]?.email.subject || ''}
                      onChange={(e) => handleReminderChange(reminderType, `${recipientType}.templates.${selectedLanguage}.email.subject`, e.target.value)}
                      onFocus={() => setFocusedField(`${reminderType}-${recipientType}-email-subject-${selectedLanguage}`)}
                      className={`block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        focusedField === `${reminderType}-${recipientType}-email-subject-${selectedLanguage}` ? 'border-blue-300 bg-blue-50' : 'border-gray-300'
                      }`}
                      placeholder="Email subject"
                    />
                  </div>
                )}

                {recipient.email && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Email Content</label>
                    <textarea
                      ref={(ref) => assignFieldRef(`${reminderType}-${recipientType}-email-content-${selectedLanguage}`, ref)}
                      rows={4}
                      value={recipient.templates[selectedLanguage]?.email.content || ''}
                      onChange={(e) => handleReminderChange(reminderType, `${recipientType}.templates.${selectedLanguage}.email.content`, e.target.value)}
                      onFocus={() => setFocusedField(`${reminderType}-${recipientType}-email-content-${selectedLanguage}`)}
                      className={`block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm ${
                        focusedField === `${reminderType}-${recipientType}-email-content-${selectedLanguage}` ? 'border-blue-300 bg-blue-50' : 'border-gray-300'
                      }`}
                      placeholder="Email content..."
                    />
                  </div>
                )}

                {recipient.sms && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">SMS Content</label>
                    <textarea
                      ref={(ref) => assignFieldRef(`${reminderType}-${recipientType}-sms-content-${selectedLanguage}`, ref)}
                      rows={3}
                      value={recipient.templates[selectedLanguage]?.sms.content || ''}
                      onChange={(e) => handleReminderChange(reminderType, `${recipientType}.templates.${selectedLanguage}.sms.content`, e.target.value)}
                      onFocus={() => setFocusedField(`${reminderType}-${recipientType}-sms-content-${selectedLanguage}`)}
                      className={`block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm ${
                        focusedField === `${reminderType}-${recipientType}-sms-content-${selectedLanguage}` ? 'border-blue-300 bg-blue-50' : 'border-gray-300'
                      }`}
                      placeholder="SMS content (160 characters max)..."
                      maxLength={160}
                    />
                    <p className="text-xs text-gray-500">
                      Character count: {(recipient.templates[selectedLanguage]?.sms.content || '').length}/160
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header title="Create Chase-up Rule" />
      
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6">
          <Button
            variant="secondary"
            onClick={() => navigate('/chaseup-rules')}
            className="flex items-center gap-2 mb-4"
          >
            <ArrowLeft size={16} />
            Back to Chase-up Rules
          </Button>
        </div>

        <div className="max-w-6xl mx-auto space-y-6">
          {/* Available Variables - Always visible when field is focused */}
          {focusedField && (
            <div className="sticky top-4 z-10 bg-white rounded-lg border-2 border-blue-200 shadow-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-md font-semibold text-blue-900">📋 Available Variables</h3>
                <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">Click to insert</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-40 overflow-y-auto">
                {variables.map((variable) => (
                  <button
                    key={variable.key}
                    onClick={() => handleVariableClick(variable.key)}
                    className="text-left p-2 bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 text-sm font-mono transition-colors hover:shadow-sm"
                    title={`Click to insert ${variable.key}`}
                  >
                    <div className="font-medium text-blue-700">{variable.key}</div>
                    <div className="text-xs text-blue-500">{variable.name}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Basic Configuration */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Configuration</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <select
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className={`block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.company ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Company</option>
                  <option value="AutoCorp Insurance">AutoCorp Insurance</option>
                  <option value="FleetMax Leasing">FleetMax Leasing</option>
                </select>
                {errors.company && <p className="text-sm text-red-600 mt-1">{errors.company}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="event">Event</option>
                  <option value="anonymization">Anonymization</option>
                </select>
              </div>

              <Input
                label="Activation Date"
                type="date"
                value={formData.activationDate}
                onChange={(e) => handleInputChange('activationDate', e.target.value)}
                error={errors.activationDate}
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">UTC Sending Time</label>
                <div className="flex gap-2">
                  <select
                    value={formData.utcSendingTime.hour}
                    onChange={(e) => handleInputChange('utcSendingTime', { ...formData.utcSendingTime, hour: parseInt(e.target.value) })}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {Array.from({ length: 24 }, (_, i) => (
                      <option key={i} value={i}>{i.toString().padStart(2, '0')}</option>
                    ))}
                  </select>
                  <span className="flex items-center text-gray-500">:</span>
                  <select
                    value={formData.utcSendingTime.minute}
                    onChange={(e) => handleInputChange('utcSendingTime', { ...formData.utcSendingTime, minute: parseInt(e.target.value) })}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

          {/* Delay Configuration */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delay Configuration</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Input
                label="First Delay (Days)"
                type="number"
                value={formData.firstDelayDays || ''}
                onChange={(e) => handleInputChange('firstDelayDays', e.target.value ? parseInt(e.target.value) : undefined)}
                min="0"
              />
              <Input
                label="First Delay (Minutes)"
                type="number"
                value={formData.firstDelayMinutes || ''}
                onChange={(e) => handleInputChange('firstDelayMinutes', e.target.value ? parseInt(e.target.value) : undefined)}
                min="0"
              />
              <Input
                label="Second Delay (Days)"
                type="number"
                value={formData.secondDelayDays || ''}
                onChange={(e) => handleInputChange('secondDelayDays', e.target.value ? parseInt(e.target.value) : undefined)}
                min="0"
              />
              <Input
                label="Second Delay (Minutes)"
                type="number"
                value={formData.secondDelayMinutes || ''}
                onChange={(e) => handleInputChange('secondDelayMinutes', e.target.value ? parseInt(e.target.value) : undefined)}
                min="0"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Sendings</label>
              <select
                value={formData.maxSendings}
                onChange={(e) => handleInputChange('maxSendings', parseInt(e.target.value) as 0 | 1 | 2)}
                className="block w-32 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
              </select>
            </div>
          </div>

          {/* First Reminder */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">First Reminder</h3>
            
            {/* Webhook */}
            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.firstReminder.webhook.enabled}
                  onChange={(e) => handleReminderChange('firstReminder', 'webhook.enabled', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 shadow-sm"
                />
                <span className="ml-2 text-sm text-gray-700">Enable Webhook</span>
              </label>
            </div>

            <div className="space-y-6">
              {renderRecipientConfig('firstReminder', 'user', 'User')}
              {renderRecipientConfig('firstReminder', 'customer', 'Customer')}
              {renderRecipientConfig('firstReminder', 'emailAddress', 'Email Address')}
            </div>
          </div>

          {/* Second Reminder */}
          {(formData.maxSendings === 2 || formData.secondReminder) && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Second Reminder</h3>
              
              {/* Webhook */}
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.secondReminder?.webhook.enabled || false}
                    onChange={(e) => {
                      if (!formData.secondReminder) {
                        setFormData(prev => ({ ...prev, secondReminder: createEmptyReminder() }));
                      }
                      handleReminderChange('secondReminder', 'webhook.enabled', e.target.checked);
                    }}
                    className="rounded border-gray-300 text-blue-600 shadow-sm"
                  />
                  <span className="ml-2 text-sm text-gray-700">Enable Webhook</span>
                </label>
              </div>

              <div className="space-y-6">
                {renderRecipientConfig('secondReminder', 'user', 'User')}
                {renderRecipientConfig('secondReminder', 'customer', 'Customer')}
                {renderRecipientConfig('secondReminder', 'emailAddress', 'Email Address')}
              </div>
            </div>
          )}

          {/* Save Buttons */}
          <div className="flex gap-4 justify-end sticky bottom-0 bg-white py-4 border-t border-gray-200">
            <Button variant="secondary" onClick={() => navigate('/chaseup-rules')}>
              Cancel
            </Button>
            <Button 
              className="flex items-center gap-2" 
              onClick={handleSave}
            >
              <Save size={16} />
              Create Rule
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}