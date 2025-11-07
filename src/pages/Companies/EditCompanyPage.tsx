import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import Tabs from '../../components/UI/Tabs';
import { ArrowLeft, Save, Upload, Plus, Trash2 } from 'lucide-react';
import { companiesService } from '@/services/companiesService';

// Import chase-up rules data to check if rules exist
import { mockChaseupRules } from '../../data/mockData';

// Move tab components outside to prevent re-creation on every render
const GeneralSettingsTab = ({
  formData,
  errors,
  handleCompanyNameChange,
  handleLogoUrlChange,
  handleFieldChange,
  handleInputChange,
  handleCheckboxChange,
  handleTextareaChange
}) => (
  <div className="space-y-6">
    {/* General Settings */}
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Input
          label="Company Name"
          value={formData.companyName}
          onChange={handleCompanyNameChange}
          placeholder="Enter company name"
          error={errors.companyName}
          required
        />
        <Input
          label="Logo URL"
          value={formData.logoUrl}
          onChange={handleLogoUrlChange}
          placeholder="https://example.com/logo.png"
          error={errors.logoUrl}
          required
        />
        <div className="flex items-end">
          <Button variant="secondary" className="flex items-center gap-2">
            <Upload size={16} />
            Upload Logo
          </Button>
        </div>
        <Input
          label="Retention Period (months)"
          type="number"
          value={formData.retentionPeriod}
          onChange={(e) => handleFieldChange('retentionPeriod', parseInt(e.target.value) || 24)}
        />
        <Input
          label="Max API Requests"
          value={formData.maxApiRequests}
          onChange={(e) => handleFieldChange('maxApiRequests', parseInt(e.target.value) || 0)}
          type="number"
          error={errors.maxApiRequests}
          required
        />
        <Input
          label="Expiration Date"
          value={formData.expirationDate}
          onChange={(e) => handleFieldChange('expirationDate', e.target.value)}
          type="date"
          required
        />
      </div>

      <div className="mt-6">
        <div className="flex items-center gap-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.isFastTrackDisabled}
              onChange={(e) => handleCheckboxChange('isFastTrackDisabled', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
            />
            <span className="ml-2 text-sm text-gray-700">Disable Fast Track</span>
          </label>
          <div className="relative group">
            <div className="w-4 h-4 rounded-full bg-gray-400 text-white text-xs flex items-center justify-center cursor-help">
              ?
            </div>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
              If checked, inspections will appear as completed as soon as received
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">Styles</label>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" className="flex items-center gap-1">
                <Upload size={14} />
                Upload JSON
              </Button>
            </div>
          </div>
          <textarea
            rows={4}
            value={formData.styles}
            onChange={(e) => handleTextareaChange('styles', e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">Report Settings</label>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" className="flex items-center gap-1">
                <Upload size={14} />
                Upload JSON
              </Button>
            </div>
          </div>
          <textarea
            rows={4}
            value={formData.reportSettings}
            onChange={(e) => handleTextareaChange('reportSettings', e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">Config Modules</label>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" className="flex items-center gap-1">
                <Upload size={14} />
                Upload JSON
              </Button>
            </div>
          </div>
          <textarea
            rows={4}
            value={formData.configModules}
            onChange={(e) => handleTextareaChange('configModules', e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
          />
        </div>
      </div>
    </div>

    {/* API Configuration */}
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">API Configuration</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.mileageEnabled}
            onChange={(e) => handleCheckboxChange('mileageEnabled', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          />
          <span className="ml-2 text-sm text-gray-700">Enable Mileage Capture</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.blurEnabled}
            onChange={(e) => handleCheckboxChange('blurEnabled', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          />
          <span className="ml-2 text-sm text-gray-700">Enable Blur Detection</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.vinEnabled}
            onChange={(e) => handleCheckboxChange('vinEnabled', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          />
          <span className="ml-2 text-sm text-gray-700">Enable VIN Scanning</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.readCarInformationEnabled}
            onChange={(e) => handleCheckboxChange('readCarInformationEnabled', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          />
          <span className="ml-2 text-sm text-gray-700">Enable Brand & Model Detection</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.interiorEnabled}
            onChange={(e) => handleCheckboxChange('interiorEnabled', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          />
          <span className="ml-2 text-sm text-gray-700">Enable Interior Damage Detection</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.dashboardEnabled}
            onChange={(e) => handleCheckboxChange('dashboardEnabled', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          />
          <span className="ml-2 text-sm text-gray-700">Enable Dashboard Warning Lights Detection</span>
        </label>
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
            onChange={(e) => handleCheckboxChange('showStartInstantInspection', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          />
          <span className="ml-2 text-sm text-gray-700">Show Start Instant Inspection</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.showSendInspectionLink}
            onChange={(e) => handleCheckboxChange('showSendInspectionLink', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          />
          <span className="ml-2 text-sm text-gray-700">Show Send Inspection Link</span>
        </label>
      </div>
    </div>

    {/* Validation */}
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Validation</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <label className="flex items-center lg:col-span-2">
          <input
            type="checkbox"
            checked={formData.iaValidation}
            onChange={(e) => handleCheckboxChange('iaValidation', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          />
          <span className="ml-2 text-sm text-gray-700">IA Validation (Joelle model)</span>
        </label>
      </div>
    </div>
  </div>
);

const EventsWebhooksTab = ({
  selectedLanguage,
  setSelectedLanguage,
  handleInputChange,
  languages,
  events,
  variables,
  templates,
  setTemplates,
  formData,
  handleFieldChange,
  companyEmailEnabled,
  setCompanyEmailEnabled
}) => {
  // State to track which field is currently focused
  const [focusedField, setFocusedField] = useState(null);
  const fieldRefs = useRef({});

  // Note: templates and setTemplates are now received from parent props
  // This allows the parent to load data from backend and have it reflected here

  const updateTemplate = (eventKey, addressee, language, templateType, field, value) => {
    setTemplates(prev => ({
      ...prev,
      [eventKey]: {
        ...prev[eventKey],
        [addressee]: {
          ...prev[eventKey][addressee],
          templates: {
            ...prev[eventKey][addressee].templates,
            [language]: {
              ...prev[eventKey][addressee].templates[language],
              [templateType]: {
                ...prev[eventKey][addressee].templates[language][templateType],
                [field]: value
              }
            }
          }
        }
      }
    }));
    handleInputChange();
  };

  const updateAddresseeConfig = (eventKey, addressee, field, value) => {
    setTemplates(prev => ({
      ...prev,
      [eventKey]: {
        ...prev[eventKey],
        [addressee]: {
          ...prev[eventKey][addressee],
          [field]: value
        }
      }
    }));
    handleInputChange();
  };

  const handleVariableClick = (variableKey) => {
    if (focusedField && fieldRefs.current[focusedField]) {
      const field = fieldRefs.current[focusedField];
      const start = field.selectionStart;
      const end = field.selectionEnd;
      const currentValue = field.value;
      const newValue = currentValue.substring(0, start) + variableKey + currentValue.substring(end);
      
      // Update the field value
      field.value = newValue;
      
      // Trigger the onChange event to update state
      const changeEvent = new Event('change', { bubbles: true });
      const inputEvent = new Event('input', { bubbles: true });
      field.dispatchEvent(changeEvent);
      field.dispatchEvent(inputEvent);
      
      // Set cursor position after the inserted variable
      setTimeout(() => {
        field.focus();
        field.setSelectionRange(start + variableKey.length, start + variableKey.length);
      }, 0);
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(variableKey);
    }
  };

  const handleFieldFocus = (fieldId) => {
    setFocusedField(fieldId);
  };

  const handleFieldBlur = () => {
    // Don't clear focus immediately - keep variables visible
    // Only clear when another field is focused or user clicks outside
  };

  const assignFieldRef = useCallback((fieldId, ref) => {
    if (ref) {
      fieldRefs.current[fieldId] = ref;
    } else {
      delete fieldRefs.current[fieldId];
    }
  }, []);

  const renderAddresseeConfig = (eventKey, addressee, addresseeLabel) => {
    const config = templates[eventKey][addressee];

    // Check how many languages have content
    const languagesWithEmailContent = languages.filter(lang =>
      config.templates[lang.code]?.email.subject || config.templates[lang.code]?.email.content
    ).length;
    const languagesWithSmsContent = languages.filter(lang =>
      config.templates[lang.code]?.sms.content
    ).length;

    const hasAnyContent = languagesWithEmailContent > 0 || languagesWithSmsContent > 0;

    return (
      <div className={`border rounded-lg p-4 ${hasAnyContent ? 'border-green-400 bg-green-50' : 'border-gray-200'}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h5 className="font-medium text-gray-900">{addresseeLabel}</h5>
            {hasAnyContent && (
              <span className="px-2 py-0.5 bg-green-600 text-white text-xs font-bold rounded-full">
                ✓ {languagesWithEmailContent + languagesWithSmsContent} configured
              </span>
            )}
          </div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={config.enabled}
              onChange={(e) => updateAddresseeConfig(eventKey, addressee, 'enabled', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 shadow-sm"
            />
            <span className="ml-2 text-sm text-gray-700">Enabled</span>
          </label>
        </div>

        {config.enabled && (
          <div className="space-y-4">
            {(addressee === 'emailAddress' || addressee === 'agent') && (
              <Input
                label={addressee === 'emailAddress' ? 'Email Address' : 'Agent Email Address'}
                type="email"
                value={config.address}
                onChange={(e) => updateAddresseeConfig(eventKey, addressee, 'address', e.target.value)}
                placeholder={addressee === 'emailAddress' ? 'recipient@example.com' : 'agent@example.com'}
              />
            )}

            <div className="flex gap-4">
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={config.sms}
                  onChange={(e) => updateAddresseeConfig(eventKey, addressee, 'sms', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 shadow-sm"
                />
                <span className="ml-2 text-sm text-gray-700">SMS</span>
                {languagesWithSmsContent > 0 && (
                  <span className="px-1.5 py-0.5 bg-purple-100 text-purple-700 text-xs font-semibold rounded">
                    {languagesWithSmsContent}
                  </span>
                )}
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={config.email}
                  onChange={(e) => updateAddresseeConfig(eventKey, addressee, 'email', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 shadow-sm"
                />
                <span className="ml-2 text-sm text-gray-700">Email</span>
                {languagesWithEmailContent > 0 && (
                  <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                    {languagesWithEmailContent}
                  </span>
                )}
              </label>
            </div>

            {(config.sms || config.email) && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700">Language:</label>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {languages.map((lang) => {
                      const hasEmailContent = config.templates[lang.code]?.email.subject || config.templates[lang.code]?.email.content;
                      const hasSmsContent = config.templates[lang.code]?.sms.content;
                      const hasContent = hasEmailContent || hasSmsContent;
                      return (
                        <option key={lang.code} value={lang.code}>
                          {hasContent ? '✓ ' : ''}{lang.name}
                        </option>
                      );
                    })}
                  </select>
                  {(config.templates[selectedLanguage]?.email.subject || config.templates[selectedLanguage]?.email.content || config.templates[selectedLanguage]?.sms.content) && (
                    <span className="text-xs text-green-600 font-semibold">
                      ✓ Has content
                    </span>
                  )}
                </div>

                {config.email && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Email Subject</label>
                    <input
                      ref={(ref) => assignFieldRef(`${eventKey}-${addressee}-email-subject-${selectedLanguage}`, ref)}
                      type="text"
                      value={config.templates[selectedLanguage]?.email.subject || ''}
                      onChange={(e) => updateTemplate(eventKey, addressee, selectedLanguage, 'email', 'subject', e.target.value)}
                      onFocus={() => handleFieldFocus(`${eventKey}-${addressee}-email-subject-${selectedLanguage}`)}
                      className={`block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        focusedField === `${eventKey}-${addressee}-email-subject-${selectedLanguage}` ? 'border-blue-300 bg-blue-50' : 'border-gray-300'
                      }`}
                      placeholder="Email subject"
                    />
                  </div>
                )}

                {config.email && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Email Content</label>
                    <textarea
                      ref={(ref) => assignFieldRef(`${eventKey}-${addressee}-email-content-${selectedLanguage}`, ref)}
                      rows={4}
                      value={config.templates[selectedLanguage]?.email.content || ''}
                      onChange={(e) => updateTemplate(eventKey, addressee, selectedLanguage, 'email', 'content', e.target.value)}
                      onFocus={() => handleFieldFocus(`${eventKey}-${addressee}-email-content-${selectedLanguage}`)}
                      className={`block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm ${
                        focusedField === `${eventKey}-${addressee}-email-content-${selectedLanguage}` ? 'border-blue-300 bg-blue-50' : 'border-gray-300'
                      }`}
                      placeholder="Email content..."
                    />
                  </div>
                )}

                {config.sms && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">SMS Content</label>
                    <textarea
                      ref={(ref) => assignFieldRef(`${eventKey}-${addressee}-sms-content-${selectedLanguage}`, ref)}
                      rows={3}
                      value={config.templates[selectedLanguage]?.sms.content || ''}
                      onChange={(e) => updateTemplate(eventKey, addressee, selectedLanguage, 'sms', 'content', e.target.value)}
                      onFocus={() => handleFieldFocus(`${eventKey}-${addressee}-sms-content-${selectedLanguage}`)}
                      className={`block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm ${
                        focusedField === `${eventKey}-${addressee}-sms-content-${selectedLanguage}` ? 'border-blue-300 bg-blue-50' : 'border-gray-300'
                      }`}
                      placeholder="SMS content (160 characters max)..."
                      maxLength={160}
                    />
                    <p className="text-xs text-gray-500">
                      Character count: {(config.templates[selectedLanguage]?.sms.content || '').length}/160
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
  <div className="space-y-6">
    {/* Global Settings */}
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Global Settings</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Input
          label="Sender Name (for all events)"
          placeholder="Your Company Name"
          value={formData.senderName}
          onChange={(e) => handleFieldChange('senderName', e.target.value)}
        />
        <Input
          label="Webhook URL"
          placeholder="https://your-domain.com/webhook"
          value={formData.webhookUrl}
          onChange={(e) => handleFieldChange('webhookUrl', e.target.value)}
        />
      </div>
    </div>

    {/* Available Variables - Sticky when field is focused */}
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

    {/* Events Configuration */}
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Events Configuration</h3>
      </div>

      <div className="space-y-8">
        {events.map((event) => (
          <div key={event.key} className="border border-gray-200 rounded-lg p-6">
            <h4 className="text-md font-semibold text-gray-900 mb-4">{event.name}</h4>
            
            {/* Webhook */}
            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={templates[event.key]?.webhook?.enabled || false}
                  onChange={(e) => updateAddresseeConfig(event.key, 'webhook', 'enabled', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 shadow-sm"
                />
                <span className="ml-2 text-sm text-gray-700">Enable Webhook</span>
              </label>
            </div>

            {/* Addressees */}
            <div className="space-y-6">
              {renderAddresseeConfig(event.key, 'user', 'User')}
              {renderAddresseeConfig(event.key, 'customer', 'Customer')}
              {renderAddresseeConfig(event.key, 'emailAddress', 'Email Address')}
              {renderAddresseeConfig(event.key, 'agent', 'Agent')}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Available Variables - Show when no field is focused */}
    {!focusedField && (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Variables</h3>
        <p className="text-sm text-gray-600 mb-4">Focus on a template field above to see variables for easy insertion</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {variables.map((variable) => (
            <button
              key={variable.key}
              onClick={() => handleVariableClick(variable.key)}
              className="text-left p-2 bg-gray-50 hover:bg-gray-100 rounded border text-sm font-mono transition-colors"
              title={`Click to copy ${variable.key}`}
            >
              <div className="font-medium text-blue-600">{variable.key}</div>
              <div className="text-xs text-gray-500">{variable.name}</div>
            </button>
          ))}
        </div>
      </div>
    )}
  </div>
  );
};

const HierarchyTab = ({ handleInputChange, formData, handleFieldChange, companies, currentCompanyId, loadingCompanies }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  // Reset search term when company changes
  React.useEffect(() => {
    setSearchTerm('');
  }, [currentCompanyId]);

  const availableCompanies = (companies || []).filter(company => (company?.objectId || company?.id) !== currentCompanyId);

  const filteredCompanies = availableCompanies.filter(company =>
    company?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (company?.objectId || company?.id || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedCompany = (companies || []).find(c => (c?.objectId || c?.id) === formData.parentCompanyId);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Hierarchy</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Parent Company (optional)</label>

            {loadingCompanies ? (
              <div className="flex items-center justify-center py-8 border border-gray-300 rounded-lg bg-gray-50">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Loading companies...</span>
              </div>
            ) : (
              <>
                <div className="relative mb-2">
                  <input
                    type="text"
                    placeholder="Search companies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                <select
                  value={formData.parentCompanyId || ''}
                  onChange={(e) => {
                    handleFieldChange('parentCompanyId', e.target.value);
                    handleInputChange();
                  }}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">None - This will be a root company</option>
                  {filteredCompanies.length === 0 ? (
                    <option disabled>No companies found</option>
                  ) : (
                    filteredCompanies.map((company) => (
                      <option key={company.objectId || company.id} value={company.objectId || company.id}>
                        {company.name} {company.objectId ? `(${company.objectId})` : ''}
                      </option>
                    ))
                  )}
                </select>

                {selectedCompany && (
                  <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <span className="font-semibold">Selected parent:</span> {selectedCompany.name}
                    </p>
                  </div>
                )}

                <p className="text-sm text-gray-500 mt-2">
                  {availableCompanies.length} companies available · {filteredCompanies.length} shown
                </p>
              </>
            )}

            <p className="text-sm text-gray-500 mt-1">
              Select a parent company to create a hierarchical structure
              {currentCompanyId && <span className="block text-xs text-orange-600 mt-1">Note: You cannot select this company as its own parent</span>}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function EditCompanyPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [companyEmailEnabled, setCompanyEmailEnabled] = useState({});
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState<any[]>([]);
  const [loadingCompanies, setLoadingCompanies] = useState(true);

  // Define events and languages before using them
  const events = [
    { key: 'selfInspectionCreation', name: 'Self Inspection Creation' },
    { key: 'manualChaseUp', name: 'Manual Chase-up Message' },
    { key: 'inspectionFinished', name: 'Inspection Finished Message' },
    { key: 'damageReviewFinished', name: 'Damage Review Finished Message' },
    { key: 'shareUpdatedReport', name: 'Share Updated Report Message' }
  ];

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

  // State for events and webhooks templates - initialized empty, will be loaded from API
  const [templates, setTemplates] = useState(() => {
    const initialTemplates = {};
    events.forEach(event => {
      initialTemplates[event.key] = {
        webhook: {
          enabled: false
        },
        user: {
          enabled: false,
          sms: false,
          email: false,
          templates: {}
        },
        customer: {
          enabled: false,
          sms: false,
          email: false,
          templates: {}
        },
        emailAddress: {
          enabled: false,
          address: '',
          sms: false,
          email: false,
          templates: {}
        },
        agent: {
          enabled: false,
          address: '',
          sms: false,
          email: false,
          templates: {}
        }
      };

      // Initialize templates for each addressee
      ['user', 'customer', 'emailAddress', 'agent'].forEach(addressee => {
        initialTemplates[event.key][addressee].templates = {};
        languages.forEach(lang => {
          initialTemplates[event.key][addressee].templates[lang.code] = {
            email: { subject: '', content: '' },
            sms: { content: '' }
          };
        });
      });
    });
    return initialTemplates;
  });

  // Initialize form data - will be loaded from API
  const [formData, setFormData] = useState({
    companyName: '',
    logoUrl: '',
    retentionPeriod: 24,
    maxApiRequests: 30,
    expirationDate: '',
    isFastTrackDisabled: false,
    mileageEnabled: true,
    blurEnabled: true,
    vinEnabled: true,
    readCarInformationEnabled: true,
    interiorEnabled: false,
    dashboardEnabled: false,
    showStartInstantInspection: true,
    showSendInspectionLink: true,
    iaValidation: false,
    parentCompanyId: '',
    styles: '',
    reportSettings: '',
    configModules: '',
    senderName: '',
    webhookUrl: '',
    archived: false
  });

  // Load event templates from backend EventManager and transform to frontend format
  const loadEventTemplatesFromBackend = (eventManager: any) => {

    const backendToFrontendLangMapping = {
      EN: 'en',
      FR: 'fr',
      DE: 'de',
      IT: 'it',
      ES: 'es',
      'NL-BE': 'nl',
      SV: 'sv',
      NO: 'no'
    };

    // Deep clone templates to ensure React detects changes
    const newTemplates = JSON.parse(JSON.stringify(templates));

    // Mapping Frontend → Backend event names
    const frontendToBackendEventMapping: { [key: string]: string } = {
      selfInspectionCreation: 'tradeinVehicle',
      manualChaseUp: 'chaseUpVehicle',
      inspectionFinished: 'detectionFinished',
      damageReviewFinished: 'createReport',
      shareUpdatedReport: 'shareUpdatedReport',
    };

    // Frontend event keys
    const frontendEventKeys = ['selfInspectionCreation', 'manualChaseUp', 'inspectionFinished', 'damageReviewFinished', 'shareUpdatedReport'];

    frontendEventKeys.forEach(frontendEventKey => {
      // Map to backend event name to read from Parse
      const backendEventKey = frontendToBackendEventMapping[frontendEventKey];
      if (!backendEventKey) {
        console.warn(`Unknown frontend event key: ${frontendEventKey}`);
        return;
      }

      const config = eventManager[`${backendEventKey}Config`];
      const templatesData = eventManager[`${backendEventKey}Templates`];

      if (config) {
        // Map config to frontend format (use frontendEventKey to store in frontend state)
        newTemplates[frontendEventKey].webhook.enabled = config.webhook || false;
        newTemplates[frontendEventKey].emailAddress.email = config.companyEmail || false;
        newTemplates[frontendEventKey].emailAddress.sms = config.companySMS || false;
        newTemplates[frontendEventKey].emailAddress.address = config.companyEmailAddress || '';
        newTemplates[frontendEventKey].agent.email = config.agentEmail || false;
        newTemplates[frontendEventKey].agent.sms = config.agentSMS || false;
        newTemplates[frontendEventKey].agent.address = config.agentEmailAddress || '';
        newTemplates[frontendEventKey].customer.email = config.customerEmail || false;
        newTemplates[frontendEventKey].customer.sms = config.customerSMS || false;
        newTemplates[frontendEventKey].user.email = config.customerEmail || false;
        newTemplates[frontendEventKey].user.sms = config.customerSMS || false;
      }

      if (templatesData && Object.keys(templatesData).length > 0) {
        // Map templates to frontend format
        Object.keys(templatesData).forEach(templateKey => {
          // Parse template key: "customerEmail_EN" or "customerSMS_FR"
          const match = templateKey.match(/^(customer|company|agent)(Email|SMS)_(.+)$/);
          if (!match) {
            console.warn(`⚠️ Template key doesn't match pattern: ${templateKey}`);
            return;
          }

          const [, addresseeType, channel, backendLang] = match;
          const frontendLang = backendToFrontendLangMapping[backendLang];
          if (!frontendLang) {
            console.warn(`⚠️ Unknown backend language: ${backendLang}`);
            return;
          }

          let addressee = addresseeType === 'customer' ? 'customer' : addresseeType === 'company' ? 'emailAddress' : 'agent';

          if (channel === 'Email') {
            const emailData = templatesData[templateKey];
            if (emailData && typeof emailData === 'object') {
              // Auto-enable flags if template exists
              newTemplates[frontendEventKey][addressee].enabled = true;
              newTemplates[frontendEventKey][addressee].email = true;

              newTemplates[frontendEventKey][addressee].templates[frontendLang].email = {
                subject: emailData.subject || '',
                content: emailData.text || emailData.html || ''
              };
            }
          } else if (channel === 'SMS') {
            const smsData = templatesData[templateKey];
            if (typeof smsData === 'string') {
              // Auto-enable flags if template exists
              newTemplates[frontendEventKey][addressee].enabled = true;
              newTemplates[frontendEventKey][addressee].sms = true;

              newTemplates[frontendEventKey][addressee].templates[frontendLang].sms = {
                content: smsData
              };
            }
          }
        });
      }
    });

    setTemplates(newTemplates);
  };

  // Load company data from API
  useEffect(() => {
    const fetchCompany = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const company = await companiesService.getCompanyById(id);

        // Transform backend data to frontend format
        // Helper function to safely parse dates
        const parseExpirationDate = (expiration: any): string => {
          if (!expiration) return '';
          try {
            // Handle Parse Date object format
            if (expiration.iso) {
              return new Date(expiration.iso).toISOString().split('T')[0];
            }
            // Handle string or Date object
            const date = new Date(expiration);
            if (isNaN(date.getTime())) {
              console.warn('Invalid expiration date:', expiration);
              return '';
            }
            return date.toISOString().split('T')[0];
          } catch (error) {
            console.error('Error parsing expiration date:', error);
            return '';
          }
        };

        setFormData({
          companyName: company.name || '',
          logoUrl: company.logo?.url || '',
          retentionPeriod: company.retentionPeriod ?? 24,
          maxApiRequests: company.apiToken?.maxRequestAPI ?? 30,
          expirationDate: parseExpirationDate(company.apiToken?.expiration),
          isFastTrackDisabled: company.isFastTrackDisabled ?? false,
          mileageEnabled: company.processingParams?.mileageEnabled ?? false,
          blurEnabled: company.blurEnabled ?? false,
          vinEnabled: company.processingParams?.vinEnabled ?? false,
          readCarInformationEnabled: company.processingParams?.readCarInformationEnabled ?? false,
          interiorEnabled: company.processingParams?.interiorEnabled ?? false,
          dashboardEnabled: company.processingParams?.dashboardEnabled ?? false,
          showStartInstantInspection: company.settingsPtr?.instantInspection?.enabled ?? false,
          showSendInspectionLink: company.settingsPtr?.instantInspection?.options?.fastTrack ?? false,
          iaValidation: company.iaValidation ?? false,
          parentCompanyId: company.parentCompanyId || '',
          styles: company.settingsPtr?.style ? JSON.stringify(company.settingsPtr.style, null, 2) : '',
          reportSettings: company.settingsPtr?.report ? JSON.stringify(company.settingsPtr.report, null, 2) : '',
          configModules: company.settingsPtr?.configModules ? JSON.stringify(company.settingsPtr.configModules, null, 2) : '',
          senderName: company.eventManagerPtr?.tradeinVehicleConfig?.senderName || company.eventManagerPtr?.chaseUpVehicleConfig?.senderName || '',
          webhookUrl: company.eventManagerPtr?.webhookUrlV2 || '',
          archived: company.archived ?? false
        });

        // Load event templates from EventManager if they exist
        if (company.eventManagerPtr) {
          loadEventTemplatesFromBackend(company.eventManagerPtr);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching company:', error);
        alert(`Failed to load company: ${error.message || 'Please try again.'}`);
        navigate('/companies');
      }
    };

    fetchCompany();
  }, [id, navigate]);

  // Load all companies for parent selection
  useEffect(() => {
    const loadCompanies = async () => {
      try {
        setLoadingCompanies(true);
        const allCompanies = await companiesService.getAllCompaniesLight();
        setCompanies(allCompanies);
      } catch (error) {
        console.error('Error loading companies:', error);
      } finally {
        setLoadingCompanies(false);
      }
    };
    loadCompanies();
  }, []);

  // Check if company has chase-up rules (moved after formData initialization)
  const hasChaseupRules = mockChaseupRules.some(rule => rule.company === formData.companyName);
  const chaseupRulesCount = mockChaseupRules.filter(rule => rule.company === formData.companyName).length;

  const [errors, setErrors] = useState({
    companyName: '',
    logoUrl: '',
    maxApiRequests: ''
  });

  const handleInputChange = () => {
    setHasUnsavedChanges(true);
  };

  const handleFieldChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
    setHasUnsavedChanges(true);
  };

  const handleLogoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFieldChange('logoUrl', e.target.value);
  };

  const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFieldChange('companyName', e.target.value);
  };

  const handleCheckboxChange = (field: string, value: boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  const handleTextareaChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  // Language code mapping: Frontend → Backend
  const languageMapping = {
    en: 'EN',
    fr: 'FR',
    de: 'DE',
    it: 'IT',
    es: 'ES',
    nl: 'NL-BE',
    sv: 'SV',
    no: 'NO'
  };

  // Event name mapping: Frontend → Backend (must match backend Parse field names)
  const eventNameMapping: { [key: string]: string } = {
    selfInspectionCreation: 'tradeinVehicle',
    manualChaseUp: 'chaseUpVehicle',
    inspectionFinished: 'detectionFinished',
    damageReviewFinished: 'createReport',
    shareUpdatedReport: 'shareUpdatedReport',
  };

  // Transform frontend templates to backend event configuration
  const transformTemplatesToBackendFormat = () => {
    const eventsConfig: any = {};

    Object.keys(templates).forEach(frontendEventKey => {
      const eventData = templates[frontendEventKey];

      // Map frontend event name to backend Parse field name
      const backendEventKey = eventNameMapping[frontendEventKey];
      if (!backendEventKey) {
        console.warn(`Unknown event key: ${frontendEventKey}`);
        return;
      }

      // Build templates object first to check which flags should be enabled
      const templatesObj: any = {};
      const detectedFlags: any = {
        companyEmail: false,
        companySMS: false,
        agentEmail: false,
        agentSMS: false,
        customerEmail: false,
        customerSMS: false,
      };

      // Process each addressee (user, customer, emailAddress, agent)
      ['user', 'customer', 'emailAddress', 'agent'].forEach(addressee => {
        const addresseeData = eventData[addressee];
        if (!addresseeData || !addresseeData.enabled) return;

        // Map addressee to backend field prefix
        let fieldPrefix = '';
        if (addressee === 'customer' || addressee === 'user') fieldPrefix = 'customer';
        else if (addressee === 'emailAddress') fieldPrefix = 'company';
        else if (addressee === 'agent') fieldPrefix = 'agent';

        // Process each language
        Object.keys(addresseeData.templates || {}).forEach(langCode => {
          const backendLangCode = languageMapping[langCode];
          if (!backendLangCode) return;

          const langTemplates = addresseeData.templates[langCode];

          // Email template
          if (addresseeData.email && langTemplates.email) {
            const emailContent = langTemplates.email.subject || langTemplates.email.content;
            if (emailContent && emailContent.trim() !== '') {
              templatesObj[`${fieldPrefix}Email_${backendLangCode}`] = {
                subject: langTemplates.email.subject || '',
                text: langTemplates.email.content || '',
                html: langTemplates.email.content || ''
              };
              // Auto-enable flag if template has content
              if (fieldPrefix === 'company') detectedFlags.companyEmail = true;
              else if (fieldPrefix === 'agent') detectedFlags.agentEmail = true;
              else if (fieldPrefix === 'customer') detectedFlags.customerEmail = true;
            }
          }

          // SMS template
          if (addresseeData.sms && langTemplates.sms) {
            const smsContent = langTemplates.sms.content;
            if (smsContent && smsContent.trim() !== '') {
              templatesObj[`${fieldPrefix}SMS_${backendLangCode}`] = smsContent;
              // Auto-enable flag if template has content
              if (fieldPrefix === 'company') detectedFlags.companySMS = true;
              else if (fieldPrefix === 'agent') detectedFlags.agentSMS = true;
              else if (fieldPrefix === 'customer') detectedFlags.customerSMS = true;
            }
          }
        });
      });

      // Build config object with auto-detected flags
      const config: any = {
        webhook: eventData.webhook?.enabled || false,
        companyEmail: detectedFlags.companyEmail || eventData.emailAddress?.email || false,
        companyEmailAddress: eventData.emailAddress?.address || '',
        companySMS: detectedFlags.companySMS || eventData.emailAddress?.sms || false,
        companySMSNumber: '',
        agentSMS: detectedFlags.agentSMS || eventData.agent?.sms || false,
        agentEmail: detectedFlags.agentEmail || eventData.agent?.email || false,
        agentEmailAddress: eventData.agent?.address || '',
        agentSMSNumber: '',
        customerEmail: detectedFlags.customerEmail || eventData.customer?.email || false,
        customerSMS: detectedFlags.customerSMS || eventData.customer?.sms || false,
        senderEmail: '',
        senderName: formData.senderName || '',
        pdfGeneration: false
      };

      // Store in eventsConfig using backend Parse field names
      eventsConfig[`${backendEventKey}Config`] = config;
      eventsConfig[`${backendEventKey}Templates`] = templatesObj;
    });

    return eventsConfig;
  };

  const validateForm = () => {
    const newErrors = {
      companyName: '',
      logoUrl: '',
      maxApiRequests: ''
    };

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData.logoUrl.trim()) {
      newErrors.logoUrl = 'Logo URL is required';
    } else if (!/^https?:\/\/.+/.test(formData.logoUrl)) {
      newErrors.logoUrl = 'Please enter a valid URL';
    }

    if (!formData.maxApiRequests || formData.maxApiRequests <= 0) {
      newErrors.maxApiRequests = 'Max API requests must be greater than 0';
    }

    setErrors(newErrors);
    return !newErrors.companyName && !newErrors.logoUrl && !newErrors.maxApiRequests;
  };
  
  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      // Parse JSON fields
      let parsedStyles, parsedReportSettings, parsedConfigModules;
      try {
        parsedStyles = formData.styles ? JSON.parse(formData.styles) : undefined;
        parsedReportSettings = formData.reportSettings ? JSON.parse(formData.reportSettings) : undefined;
        parsedConfigModules = formData.configModules ? JSON.parse(formData.configModules) : undefined;
      } catch (e) {
        alert('Invalid JSON in styles, report settings, or config modules');
        return;
      }

      // Transform event templates to backend format
      const eventsConfig = transformTemplatesToBackendFormat();

      // Prepare update data
      const updateData: any = {
        name: formData.companyName,
        logoUrl: formData.logoUrl,
        retentionPeriod: formData.retentionPeriod,
        isFastTrackDisabled: formData.isFastTrackDisabled,
        iaValidation: formData.iaValidation,
        blurEnabled: formData.blurEnabled,

        // ProcessingParams
        processingParams: {
          mileageEnabled: formData.mileageEnabled,
          vinEnabled: formData.vinEnabled,
          interiorEnabled: formData.interiorEnabled,
          dashboardEnabled: formData.dashboardEnabled,
          readCarInformationEnabled: formData.readCarInformationEnabled,
        },

        // APIToken
        maxRequestAPI: formData.maxApiRequests,
        expiration: formData.expirationDate,

        // Settings
        styles: parsedStyles,
        reportSettings: parsedReportSettings,
        configModules: parsedConfigModules,
        showStartInstantInspection: formData.showStartInstantInspection,
        showSendInspectionLink: formData.showSendInspectionLink,

        // EventManager
        webhookUrl: formData.webhookUrl,
        senderName: formData.senderName,
        eventsConfig: eventsConfig, // Event configurations and templates

        // Hierarchy
        parentCompanyId: formData.parentCompanyId || undefined,
      };

      const updatedCompany = await companiesService.updateCompany(id, updateData);

      setHasUnsavedChanges(false);
      // Navigate back to companies list after save
      navigate('/companies');
    } catch (error) {
      console.error('Error updating company:', error);
      alert(`Failed to update company: ${error.message || 'Please try again.'}`);
    }
  };

  // Static data arrays
  const variables = [
    { key: '##clientLastName##', name: 'Client Last Name' },
    { key: '##clientFirstName##', name: 'Client First Name' },
    { key: '##clientMail##', name: 'Client Email' },
    { key: '##clientPhone##', name: 'Client Phone' },
    { key: '##clientLanguage##', name: 'Client Language' },
    { key: '##personInCharge##', name: 'Person In Charge' },
    { key: '##notes##', name: 'Notes' },
    { key: '##date##', name: 'Date' },
    { key: '##dateFirstPicture##', name: 'Date First Picture' },
    { key: '##vehicleMileage##', name: 'Vehicle Mileage' },
    { key: '##customerLastName##', name: 'Customer Last Name' },
    { key: '##customerFirstName##', name: 'Customer First Name' },
    { key: '##customerLocale##', name: 'Customer Locale' },
    { key: '##customerPhone##', name: 'Customer Phone' },
    { key: '##customerMail##', name: 'Customer Email' },
    { key: '##customerVIN##', name: 'Customer VIN' },
    { key: '##customerImmat##', name: 'Customer Registration' },
    { key: '##companyName##', name: 'Company Name' },
    { key: '##immat##', name: 'Registration Number' },
    { key: '##vin##', name: 'VIN Number' },
    { key: '##reporturl##', name: 'Report URL' },
    { key: '##reporturlWithoutCosts##', name: 'Report URL Without Costs' },
    { key: '##fasttrackurl##', name: 'Fast Track URL' },
    { key: '##tradeinSSO##', name: 'Trade-in SSO' },
    { key: '##editreporturl##', name: 'Edit Report URL' },
    { key: '##agentEmailAddress##', name: 'Agent Email Address' }
  ];

  const tabs = [
    {
      key: 'general',
      label: 'General Settings',
      content: <GeneralSettingsTab
        formData={formData}
        errors={errors}
        handleCompanyNameChange={handleCompanyNameChange}
        handleLogoUrlChange={handleLogoUrlChange}
        handleFieldChange={handleFieldChange}
        handleInputChange={handleInputChange}
        handleCheckboxChange={handleCheckboxChange}
        handleTextareaChange={handleTextareaChange}
      />
    },
    {
      key: 'events',
      label: 'Events & Webhooks',
      content: <EventsWebhooksTab
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        handleInputChange={handleInputChange}
        languages={languages}
        events={events}
        variables={variables}
        companyEmailEnabled={companyEmailEnabled}
        setCompanyEmailEnabled={setCompanyEmailEnabled}
        templates={templates}
        setTemplates={setTemplates}
        formData={formData}
        handleFieldChange={handleFieldChange}
      />
    },
    {
      key: 'hierarchy',
      label: 'Hierarchy',
      content: <HierarchyTab
        handleInputChange={handleInputChange}
        formData={formData}
        handleFieldChange={handleFieldChange}
        companies={companies}
        currentCompanyId={id}
        loadingCompanies={loadingCompanies}
      />
    }
  ];

  if (loading) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Edit Company" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading company data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header title={`Edit Company: ${formData.companyName}`} />
      
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
          {/* Archived Status Banner */}
          {formData.archived && (
            <div className="mb-6 bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <span className="text-orange-600">📦</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-orange-900 mb-1">
                    This company is archived
                  </h4>
                  <p className="text-sm text-orange-800">
                    This company is currently archived. Its API token is disabled and users cannot access it.
                    You can unarchive it from the companies list to restore access.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Chase-up Rules Reminder */}
          <div className={`mb-6 border rounded-lg p-4 ${
            hasChaseupRules ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'
          }`}>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <span className={hasChaseupRules ? 'text-green-600' : 'text-yellow-600'}>
                  {hasChaseupRules ? '✅' : '⚠️'}
                </span>
              </div>
              <div className="flex-1">
                <h4 className={`text-sm font-medium mb-1 ${
                  hasChaseupRules ? 'text-green-900' : 'text-yellow-900'
                }`}>
                  {hasChaseupRules ? 'Chase-up Rules Active' : 'No Chase-up Rules Configured'}
                </h4>
                <p className={`text-sm mb-3 ${
                  hasChaseupRules ? 'text-green-800' : 'text-yellow-800'
                }`}>
                  {hasChaseupRules 
                    ? `This company has ${chaseupRulesCount} automated chase-up rule${chaseupRulesCount > 1 ? 's' : ''} configured for timely follow-ups.`
                    : 'Consider setting up automated chase-up rules to ensure timely follow-ups on pending inspections.'
                  }
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => navigate(`/chaseup-rules?company=${encodeURIComponent(formData.companyName)}`)}
                    size="sm"
                  >
                    {hasChaseupRules ? 'View Rules' : 'Create Rules'}
                  </Button>
                  {hasChaseupRules && (
                    <Button
                      variant="secondary"
                      onClick={() => navigate('/chaseup-rules/new')}
                      size="sm"
                    >
                      Add New Rule
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/* Save Buttons */}
          <div className="flex gap-4 justify-end sticky bottom-0 bg-white py-4 border-t border-gray-200 mt-8">
            <Button variant="secondary" onClick={() => navigate('/companies')}>
              Cancel
            </Button>
            <Button 
              className="flex items-center gap-2" 
              onClick={handleSave}
              disabled={!hasUnsavedChanges}
            >
              <Save size={16} />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}