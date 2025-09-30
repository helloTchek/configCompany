import React, { useState, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import Tabs from '../../components/UI/Tabs';
import { ArrowLeft, Save, Upload, Plus, Trash2 } from 'lucide-react';

// Import chase-up rules data to check if rules exist
import { mockChaseupRules } from '../../data/mockData';

// Move tab components outside to prevent re-creation on every render
const GeneralSettingsTab = ({ 
  formData, 
  errors, 
  handleCompanyNameChange, 
  handleLogoUrlChange, 
  handleFieldChange, 
  handleInputChange 
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
          label="Company Code"
          value={formData.companyCode}
          onChange={(e) => handleFieldChange('companyCode', e.target.value)}
          placeholder="Company code"
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contract Type
          </label>
          <select 
            value={formData.contractType}
            onChange={(e) => handleFieldChange('contractType', e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select contract type</option>
            <option value="Client">Client</option>
            <option value="Prospect">Prospect</option>
            <option value="Test">Test</option>
            <option value="Demo">Demo</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Business Sector
          </label>
          <select 
            value={formData.businessSector}
            onChange={(e) => handleFieldChange('businessSector', e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select business sector</option>
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
              checked={formData.disableFastTrack}
              onChange={(e) => handleFieldChange('disableFastTrack', e.target.checked)}
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
            onChange={(e) => handleFieldChange('styles', e.target.value)}
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
            onChange={(e) => handleFieldChange('reportSettings', e.target.value)}
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
            onChange={(e) => handleFieldChange('configModules', e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">Decision Tree</label>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" className="flex items-center gap-1">
                <Upload size={14} />
                Upload JSON
              </Button>
            </div>
          </div>
          <textarea
            rows={4}
            value={formData.decisionTree}
            onChange={(e) => handleFieldChange('decisionTree', e.target.value)}
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
            checked={formData.enableMileageCapture}
            onChange={(e) => handleFieldChange('enableMileageCapture', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          />
          <span className="ml-2 text-sm text-gray-700">Enable Mileage Capture</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.enableBlurDetection}
            onChange={(e) => handleFieldChange('enableBlurDetection', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          />
          <span className="ml-2 text-sm text-gray-700">Blur License plates</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.enableVinScanning}
            onChange={(e) => handleFieldChange('enableVinScanning', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          />
          <span className="ml-2 text-sm text-gray-700">Enable VIN Scanning</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.enableBrandModelDetection}
            onChange={(e) => handleFieldChange('enableBrandModelDetection', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          />
          <span className="ml-2 text-sm text-gray-700">Enable Brand & Model Detection</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.enableInteriorDamageDetection}
            onChange={(e) => handleFieldChange('enableInteriorDamageDetection', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          />
          <span className="ml-2 text-sm text-gray-700">Enable Interior Damage Detection</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.enableDashboardWarningLightsDetection}
            onChange={(e) => handleFieldChange('enableDashboardWarningLightsDetection', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          />
          <span className="ml-2 text-sm text-gray-700">Enable Dashboard Warning Lights Detection</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.enableBrandModelColorRecognition}
            onChange={(e) => handleFieldChange('enableBrandModelColorRecognition', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          />
          <span className="ml-2 text-sm text-gray-700">Enable Brand, Model & Color Recognition</span>
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
            onChange={(e) => handleFieldChange('showStartInstantInspection', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          />
          <span className="ml-2 text-sm text-gray-700">Show Start Instant Inspection</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.showSendInspectionLink}
            onChange={(e) => handleFieldChange('showSendInspectionLink', e.target.checked)}
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
            onChange={(e) => handleFieldChange('iaValidation', e.target.checked)}
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
  variables 
}) => {
  // State to track which field is currently focused
  const [focusedField, setFocusedField] = useState(null);
  const fieldRefs = useRef({});

  const [eventCompanyEmailStates, setEventCompanyEmailStates] = useState(() => {
    // Initialize all events with Company Email Address checked by default
    const initialStates = {};
    events.forEach(event => {
      initialStates[event.key] = true;
    });
    return initialStates;
  });

  // State to store templates for each language and event
  const [templates, setTemplates] = useState(() => {
    const initialTemplates = {};
    events.forEach(event => {
      initialTemplates[event.key] = {};
      languages.forEach(lang => {
        initialTemplates[event.key][lang.code] = {
          email: {
            subject: '',
            htmlContent: '',
            enabled: true
          },
          sms: {
            content: '',
            enabled: true
          }
        };
      });
    });
    return initialTemplates;
  });
  const handleCompanyEmailToggle = (eventKey, isChecked) => {
    setEventCompanyEmailStates(prev => ({
      ...prev,
      [eventKey]: isChecked
    }));
  };

  const updateTemplate = (eventKey, language, templateType, field, value) => {
    setTemplates(prev => ({
      ...prev,
      [eventKey]: {
        ...prev[eventKey],
        [language]: {
          ...prev[eventKey][language],
          [templateType]: {
            ...prev[eventKey][language][templateType],
            [field]: value
          }
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

  return (
  <div className="space-y-6">
    {/* Global Settings */}
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Global Settings</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Input
          label="Sender Name (for all events)"
          placeholder="Your Company Name"
          onChange={handleInputChange}
        />
        <Input
          label="Webhook URL"
          placeholder="https://your-domain.com/webhook"
          onChange={handleInputChange}
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
      </div>

      <div className="space-y-8">
        {events.map((event) => (
          <div key={event.key} className="border border-gray-200 rounded-lg p-6">
            <h4 className="text-md font-semibold text-gray-900 mb-4">{event.name}</h4>
            
            {/* Recipients */}
            <div className="mb-6">
              <h5 className="text-sm font-medium text-gray-700 mb-3">Recipients</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked={true}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-blue-600 shadow-sm"
                  />
                  <span className="ml-2 text-sm text-gray-700">Customer Phone Number</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked={true}
                    onChange={(e) => {
                      handleInputChange();
                      handleCompanyEmailToggle(event.key, e.target.checked);
                    }}
                    className="rounded border-gray-300 text-blue-600 shadow-sm"
                  />
                  <span className="ml-2 text-sm text-gray-700">Company Email Address</span>
                </label>
                {/* Company Email Address Field - shown when checkbox is checked */}
                {eventCompanyEmailStates[event.key] && (
                  <div className="col-span-2">
                    <Input
                      label="Company Email Address"
                      type="email"
                      placeholder="company@example.com"
                      onChange={handleInputChange}
                    />
                  </div>
                )}
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked={false}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-blue-600 shadow-sm"
                  />
                  <span className="ml-2 text-sm text-gray-700">Agent Email Address</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked={false}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-blue-600 shadow-sm"
                  />
                  <span className="ml-2 text-sm text-gray-700">Webhook URL</span>
                </label>
              </div>
            </div>

            {/* Message Content */}
            <div className="space-y-4">
              <h5 className="text-sm font-medium text-gray-700">Message Content</h5>
              
              {/* Email Template */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h6 className="text-sm font-medium text-gray-700">Email Template</h6>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={templates[event.key][selectedLanguage].email.enabled}
                      onChange={(e) => updateTemplate(event.key, selectedLanguage, 'email', 'enabled', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 shadow-sm"
                    />
                    <span className="ml-2 text-xs text-gray-600">Enabled</span>
                  </label>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <input
                      ref={(ref) => assignFieldRef(`${event.key}-${selectedLanguage}-email-subject`, ref)}
                      type="text"
                      value={templates[event.key][selectedLanguage].email.subject}
                      onChange={(e) => {
                        updateTemplate(event.key, selectedLanguage, 'email', 'subject', e.target.value);
                      }}
                      onFocus={() => handleFieldFocus(`${event.key}-${selectedLanguage}-email-subject`)}
                      onBlur={() => {
                        // Keep focus state for variables panel
                      }}
                      placeholder="Email subject"
                      className={`block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        focusedField === `${event.key}-${selectedLanguage}-email-subject` ? 'border-blue-300 bg-blue-50' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">HTML Content</label>
                    <textarea
                      ref={(ref) => assignFieldRef(`${event.key}-${selectedLanguage}-email-content`, ref)}
                      rows={4}
                      value={templates[event.key][selectedLanguage].email.htmlContent}
                      onChange={(e) => {
                        updateTemplate(event.key, selectedLanguage, 'email', 'htmlContent', e.target.value);
                      }}
                      onFocus={() => handleFieldFocus(`${event.key}-${selectedLanguage}-email-content`)}
                      onBlur={() => {
                        // Keep focus state for variables panel
                      }}
                      className={`block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm ${
                        focusedField === `${event.key}-${selectedLanguage}-email-content` ? 'border-blue-300 bg-blue-50' : 'border-gray-300'
                      }`}
                      placeholder="HTML email content..."
                    />
                  </div>
                </div>
              </div>

              {/* SMS Template */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h6 className="text-sm font-medium text-gray-700">SMS Template</h6>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={templates[event.key][selectedLanguage].sms.enabled}
                      onChange={(e) => updateTemplate(event.key, selectedLanguage, 'sms', 'enabled', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 shadow-sm"
                    />
                    <span className="ml-2 text-xs text-gray-600">Enabled</span>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Text Content</label>
                  <textarea
                    ref={(ref) => assignFieldRef(`${event.key}-${selectedLanguage}-sms-content`, ref)}
                    rows={3}
                    value={templates[event.key][selectedLanguage].sms.content}
                    onChange={(e) => {
                      updateTemplate(event.key, selectedLanguage, 'sms', 'content', e.target.value);
                    }}
                    onFocus={() => handleFieldFocus(`${event.key}-${selectedLanguage}-sms-content`)}
                    onBlur={() => {
                      // Keep focus state for variables panel
                    }}
                    className={`block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm ${
                      focusedField === `${event.key}-${selectedLanguage}-sms-content` ? 'border-blue-300 bg-blue-50' : 'border-gray-300'
                    }`}
                    placeholder="SMS content (160 characters max)..."
                    maxLength={160}
                  />
                  <p className="text-xs text-gray-500 mt-1">Character count: {templates[event.key][selectedLanguage].sms.content.length}/160</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Available Variables */}
    {!focusedField ? (
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
    ) : (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Available Variables</h3>
          <button
            onClick={() => setFocusedField(null)}
            className="text-sm text-gray-500 hover:text-gray-700 px-2 py-1 rounded hover:bg-gray-100"
          >
            Hide Variables
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-4">Click any variable to insert it at cursor position</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-60 overflow-y-auto">
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
  </div>
  );
};

const HierarchyTab = ({ handleInputChange, formData, handleFieldChange }) => (
  <div className="space-y-6">
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Hierarchy</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Parent Company (optional)</label>
          <select 
            value={formData.parentCompany || ''}
            onChange={(e) => handleFieldChange('parentCompany', e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">None - This will be a root company</option>
            <option value="1">AutoCorp Insurance</option>
            <option value="2">FleetMax Leasing</option>
          </select>
          <p className="text-sm text-gray-500 mt-1">Select a parent company to create a hierarchical structure</p>
        </div>
      </div>
    </div>
  </div>
);

export default function EditCompanyPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [companyEmailEnabled, setCompanyEmailEnabled] = useState({});
  
  // Initialize form data with existing company data (mock data for now)
  const [formData, setFormData] = useState({
    companyName: 'AutoCorp Insurance',
    companyCode: 'AUTOCORP',
    contractType: 'Client',
    businessSector: 'Insurance',
    logoUrl: 'https://images.pexels.com/photos/164686/pexels-photo-164686.jpeg?auto=compress&cs=tinysrgb&w=100',
    retentionPeriod: 24,
    maxApiRequests: 5000,
    expirationDate: '2025-12-31',
    disableFastTrack: false,
    enableMileageCapture: true,
    enableBlurDetection: true,
    enableVinScanning: true,
    enableBrandModelDetection: true,
    enableBrandModelColorRecognition: true,
    enableInteriorDamageDetection: false,
    enableDashboardWarningLightsDetection: false,
    showStartInstantInspection: true,
    showSendInspectionLink: true,
    humanValidationEnabled: true,
    validationPriority: 3,
    maxValidationDelay: 60,
    minTaskProcessingDuration: 5,
    iaValidation: false,
    parentCompany: '',
    styles: '{"report":{"backgroundColor":"#252387","costsBackgroundColor":"#6A68D4","costsTextColor":"#000000","costsInfoColor":"#252387","topRightHorizontalBarColor":"#252387","borderColor":"#6a68d4"},"shootInspect":{"overlayColor":"#1adf6c"},"globalTheme":{"primaryColor":"#323276","primaryTextColor":"#ffffff","accentColor":"#1adf6c","accentTextColor":"ffffff","dominantColor":"#151841","dominantTextColor":"#ffffff","isDarkTheme":true}}',
    reportSettings: '{"picturesPreSelected":"true","showDamage":"true","showGallery":"true","showNewDamage":"true","showState":"true","oldDamages":true,"checkDamages":true,"isCarDealership":true,"showWatermark":false,"prefix":"","selectorSens":"clockwise","selectorSvgColor":"repairSeverity","selectorSvg":"renault"}',
    configModules: '{"fastTrack":{"canWearAndTear":true,"deletedStatusEnabled":false,"validatedStatusEnabled":true,"wearAndTearStatusEnabled":true,"editionMode":true,"zoomConfig":{"minDamageCropMargin":0.3,"regularWidthMargin":1.4,"regularHeightMargin":1.4,"strokeWidthScale":5}},"shootInspect":{"autoFinalizationEnabled":false,"autoFinalizationThreshold":2},"global":{"modelIA":"codeter_ensembling"},"endInspect":{"npsEnabled":true,"npsDelay":3000}}'
    decisionTree: '{"withClassification": false, "tile": false, "sizeTile": 2000}',
  });
  
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
  
  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    console.log('Saving company changes...', formData);
    setHasUnsavedChanges(false);
    // Navigate back to companies list after save
    navigate('/companies');
  };

  // Static data arrays
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

  const events = [
    { key: 'selfInspectionCreation', name: 'Self Inspection Creation' },
    { key: 'manualChaseUp', name: 'Manual Chase-up Message' },
    { key: 'inspectionFinished', name: 'Inspection Finished Message' },
    { key: 'damageReviewFinished', name: 'Damage Review Finished Message' },
    { key: 'shareUpdatedReport', name: 'Share Updated Report Message' }
  ];

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
      />
    },
    {
      key: 'hierarchy',
      label: 'Hierarchy',
      content: <HierarchyTab 
        handleInputChange={handleInputChange}
        formData={formData}
        handleFieldChange={handleFieldChange}
      />
    }
  ];

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