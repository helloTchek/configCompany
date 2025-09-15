import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import Tabs from '../../components/UI/Tabs';
import { ArrowLeft, Save, Upload, Plus, Trash2 } from 'lucide-react';

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
          placeholder="Will be auto-generated"
          helperText="Generated from ObjectID"
          disabled
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contract Type
          </label>
          <select 
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={handleInputChange}
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
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={handleInputChange}
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
          defaultValue="24"
          onChange={handleInputChange}
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
              onChange={handleInputChange}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
            />
            <span className="ml-2 text-sm text-gray-700">Disable Fast Track</span>
          </label>
          <div className="relative group">
            <div className="w-4 h-4 rounded-full bg-gray-400 text-white text-xs flex items-center justify-center cursor-help">
              ?
            </div>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
              Disables fast track functionality for this company
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
            onChange={handleInputChange}
            defaultValue='{"report":{"backgroundColor":"#252387","costsBackgroundColor":"#6A68D4","costsTextColor":"#000000","costsInfoColor":"#252387","topRightHorizontalBarColor":"#252387","borderColor":"#6a68d4"},"shootInspect":{"overlayColor":"#1adf6c"},"globalTheme":{"primaryColor":"#323276","primaryTextColor":"#ffffff","accentColor":"#1adf6c","accentTextColor":"ffffff","dominantColor":"#151841","dominantTextColor":"#ffffff","isDarkTheme":true}}'
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
            onChange={handleInputChange}
            defaultValue='{"picturesPreSelected":"true","showDamage":"true","showGallery":"true","showNewDamage":"true","showState":"true","oldDamages":true,"checkDamages":true,"isCarDealership":true,"showWatermark":false,"prefix":"","selectorSens":"clockwise","selectorSvgColor":"repairSeverity","selectorSvg":"renault"}'
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
            onChange={handleInputChange}
            defaultValue='{"fastTrack":{"canWearAndTear":true,"deletedStatusEnabled":false,"validatedStatusEnabled":true,"wearAndTearStatusEnabled":true,"editionMode":true,"zoomConfig":{"minDamageCropMargin":0.3,"regularWidthMargin":1.4,"regularHeightMargin":1.4,"strokeWidthScale":5}},"shootInspect":{"autoFinalizationEnabled":false,"autoFinalizationThreshold":2},"global":{"modelIA":"codeter_ensembling"},"endInspect":{"npsEnabled":true,"npsDelay":3000}}'
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
            defaultChecked={true}
            onChange={handleInputChange}
            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          />
          <span className="ml-2 text-sm text-gray-700">Enable Mileage Capture</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            defaultChecked={true}
            onChange={handleInputChange}
            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          />
          <span className="ml-2 text-sm text-gray-700">Enable Blur Detection</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            defaultChecked={true}
            onChange={handleInputChange}
            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          />
          <span className="ml-2 text-sm text-gray-700">Enable VIN Scanning</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            defaultChecked={true}
            onChange={handleInputChange}
            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          />
          <span className="ml-2 text-sm text-gray-700">Enable Brand & Model Detection</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            defaultChecked={false}
            onChange={handleInputChange}
            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          />
          <span className="ml-2 text-sm text-gray-700">Enable Interior Damage Detection</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            defaultChecked={false}
            onChange={handleInputChange}
            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          />
          <span className="ml-2 text-sm text-gray-700">Enable Dashboard Warning Lights Detection</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            defaultChecked={true}
            onChange={handleInputChange}
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
            defaultChecked={true}
            onChange={handleInputChange}
            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          />
          <span className="ml-2 text-sm text-gray-700">Show Start Instant Inspection</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            defaultChecked={true}
            onChange={handleInputChange}
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
            defaultChecked={false}
            onChange={handleInputChange}
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
}) => (
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
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-blue-600 shadow-sm"
                  />
                  <span className="ml-2 text-sm text-gray-700">Company Email Address</span>
                </label>
                {/* Company Email Address Field - shown when checkbox is checked */}
                <div className="col-span-2">
                  <Input
                    label="Company Email Address"
                    type="email"
                    placeholder="company@example.com"
                    onChange={handleInputChange}
                  />
                </div>
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
                      defaultChecked={true}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-blue-600 shadow-sm"
                    />
                    <span className="ml-2 text-xs text-gray-600">Enabled</span>
                  </label>
                </div>
                <div className="space-y-3">
                  <Input
                    label="Subject"
                    placeholder="Email subject"
                    onChange={handleInputChange}
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">HTML Content</label>
                    <textarea
                      rows={4}
                      onChange={handleInputChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
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
                      defaultChecked={true}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-blue-600 shadow-sm"
                    />
                    <span className="ml-2 text-xs text-gray-600">Enabled</span>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Text Content</label>
                  <textarea
                    rows={3}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="SMS content (160 characters max)..."
                    maxLength={160}
                  />
                  <p className="text-xs text-gray-500 mt-1">Character count: 0/160</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Available Variables */}
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Variables</h3>
      <p className="text-sm text-gray-600 mb-4">Click any variable to copy it to your clipboard</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {variables.map((variable) => (
          <button
            key={variable.key}
            onClick={() => navigator.clipboard.writeText(variable.key)}
            className="text-left p-2 bg-gray-50 hover:bg-gray-100 rounded border text-sm font-mono transition-colors"
            title={`Click to copy ${variable.key}`}
          >
            <div className="font-medium text-blue-600">{variable.key}</div>
            <div className="text-xs text-gray-500">{variable.name}</div>
          </button>
        ))}
      </div>
    </div>
  </div>
);

const HierarchyTab = ({ handleInputChange }) => (
  <div className="space-y-6">
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Hierarchy</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Parent Company (optional)</label>
          <select 
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={handleInputChange}
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

export default function CreateCompanyPage() {
  const navigate = useNavigate();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [companyEmailEnabled, setCompanyEmailEnabled] = useState({});
  const [formData, setFormData] = useState({
    companyName: '',
    logoUrl: '',
    maxApiRequests: 30,
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // Today + 30 days
  });
  const [errors, setErrors] = useState({
    companyName: '',
    logoUrl: '',
    maxApiRequests: ''
  });

  const handleInputChange = () => {
    setHasUnsavedChanges(true);
  };

  const handleFieldChange = (field: string, value: string | number) => {
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

    console.log('Saving new company...');
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
    { key: 'automatedChaseUp', name: 'Automated Chase-up Message' },
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
      content: <HierarchyTab handleInputChange={handleInputChange} />
    }
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header title="Create New Company" />
      
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
              Create Company
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}