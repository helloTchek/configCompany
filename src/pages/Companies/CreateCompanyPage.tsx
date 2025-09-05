import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import Tabs from '../../components/UI/Tabs';
import { ArrowLeft, Save, Upload, Plus, Trash2 } from 'lucide-react';

export default function CreateCompanyPage() {
  const navigate = useNavigate();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleInputChange = () => {
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving new company...');
    // Navigate back to companies list after save
    navigate('/companies');
  };

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

  const GeneralSettingsTab = () => (
    <div className="space-y-6">
      {/* General Settings */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Input
            label="Company Name"
            placeholder="Enter company name"
            onChange={handleInputChange}
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
            placeholder="https://example.com/logo.png"
            onChange={handleInputChange}
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
            type="number"
            defaultValue="5000"
            onChange={handleInputChange}
          />
        </div>

        <div className="mt-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              onChange={handleInputChange}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
            />
            <span className="ml-2 text-sm text-gray-700">Disable Fast Track</span>
          </label>
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
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
              placeholder='{"report":{"backgroundColor":"#252387","costsBackgroundColor":"#6A68D4","costsTextColor":"#000000","costsInfoColor":"#252387","topRightHorizontalBarColor":"#252387","borderColor":"#6a68d4"},"shootInspect":{"overlayColor":"#1adf6c"},"globalTheme":{"primaryColor":"#323276","primaryTextColor":"#ffffff","accentColor":"#1adf6c","accentTextColor":"ffffff","dominantColor":"#151841","dominantTextColor":"#ffffff","isDarkTheme":true}}'
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
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
              placeholder='{"picturesPreSelected":"true","showDamage":"true","showGallery":"true","showNewDamage":"true","showState":"true","oldDamages":true,"checkDamages":true,"isCarDealership":true,"showWatermark":false,"prefix":"","selectorSens":"clockwise","selectorSvgColor":"repairSeverity","selectorSvg":"renault"}'
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
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
              placeholder='{"fastTrack":{"canWearAndTear":true,"deletedStatusEnabled":false,"validatedStatusEnabled":true,"wearAndTearStatusEnabled":true,"editionMode":true,"zoomConfig":{"minDamageCropMargin":0.3,"regularWidthMargin":1.4,"regularHeightMargin":1.4,"strokeWidthScale":5}},"shootInspect":{"autoFinalizationEnabled":false,"autoFinalizationThreshold":2},"global":{"modelIA":"codeter_ensembling"},"endInspect":{"npsEnabled":true,"npsDelay":3000}}'
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
          <label className="flex items-center">
            <input
              type="checkbox"
              defaultChecked={true}
              onChange={handleInputChange}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
            />
            <span className="ml-2 text-sm text-gray-700">Human Validation Enabled</span>
          </label>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Validation Priority (0-5)
            </label>
            <select 
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              defaultValue="3"
              onChange={handleInputChange}
            >
              <option value="0">0 - Lowest</option>
              <option value="1">1 - Very Low</option>
              <option value="2">2 - Low</option>
              <option value="3">3 - Medium</option>
              <option value="4">4 - High</option>
              <option value="5">5 - Highest</option>
            </select>
          </div>
          <Input
            label="Max Validation Delay (minutes)"
            type="number"
            defaultValue="60"
            onChange={handleInputChange}
          />
          <Input
            label="Min Task Processing Duration (minutes)"
            type="number"
            defaultValue="5"
            onChange={handleInputChange}
          />
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

  const EventsWebhooksTab = () => (
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

  const HierarchyTab = () => (
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

  const tabs = [
    {
      key: 'general',
      label: 'General Settings',
      content: <GeneralSettingsTab />
    },
    {
      key: 'events',
      label: 'Events & Webhooks',
      content: <EventsWebhooksTab />
    },
    {
      key: 'hierarchy',
      label: 'Hierarchy',
      content: <HierarchyTab />
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