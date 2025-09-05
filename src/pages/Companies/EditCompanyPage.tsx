import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import Tabs from '../../components/UI/Tabs';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import { mockCompanies, mockJourneys } from '../../data/mockData';
import { Save, ArrowLeft, Download, Upload } from 'lucide-react';

export default function EditCompanyPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('company-settings');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  const company = mockCompanies.find(c => c.id === id);
  
  if (!company) {
    return <div>Company not found</div>;
  }

  const CompanySettingsContent = () => (
    <div className="space-y-8">
      {/* General Settings */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Input
            label="Company Name"
            defaultValue={company.name}
            onChange={() => setHasUnsavedChanges(true)}
          />
          <Input
            label="Company Code"
            defaultValue={company.companyCode}
            helperText="Generated from ObjectID"
            onChange={() => setHasUnsavedChanges(true)}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contract Type
            </label>
            <select 
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              defaultValue={company.contractType}
              onChange={() => setHasUnsavedChanges(true)}
            >
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
              defaultValue={company.businessSector}
              onChange={() => setHasUnsavedChanges(true)}
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
            defaultValue={company.logoUrl}
            placeholder="https://example.com/logo.png"
            onChange={() => setHasUnsavedChanges(true)}
          />
          <div className="flex items-end">
            <Button variant="secondary" className="flex items-center gap-2">
              <Upload size={16} />
              Upload Logo
            </Button>
          </div>
          <Input
            label="Company Identifier (Read-only)"
            defaultValue={company.identifier}
            disabled
          />
          <Input
            label="API Token (Read-only)"
            defaultValue={company.apiToken}
            disabled
            className="font-mono text-sm"
          />
          <Input
            label="Retention Period (months)"
            type="number"
            defaultValue={company.retentionPeriod}
            onChange={() => setHasUnsavedChanges(true)}
          />
          <Input
            label="Max API Requests"
            type="number"
            defaultValue={company.maxApiRequests}
            onChange={() => setHasUnsavedChanges(true)}
          />
        </div>

        <div className="mt-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              defaultChecked={company.disableFastTrack}
              onChange={() => setHasUnsavedChanges(true)}
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
              rows={4}
              defaultValue={company.styles}
              onChange={() => setHasUnsavedChanges(true)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
              placeholder="JSON configuration..."
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">Report Settings</label>
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
              rows={4}
              defaultValue={company.reportSettings}
              onChange={() => setHasUnsavedChanges(true)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
              placeholder="JSON configuration..."
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">Config Modules</label>
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
              rows={4}
              defaultValue={company.configModules}
              onChange={() => setHasUnsavedChanges(true)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
              placeholder="JSON configuration..."
            />
          </div>
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
              onChange={() => setHasUnsavedChanges(true)}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
            />
            <span className="ml-2 text-sm text-gray-700">Show Start Instant Inspection</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              defaultChecked={true}
              onChange={() => setHasUnsavedChanges(true)}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
            />
            <span className="ml-2 text-sm text-gray-700">Show Send Inspection Link</span>
          </label>
        </div>
      </div>

      {/* API Configuration */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">API Configuration</h3>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">Damage Detection Model</label>
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
              rows={4}
              onChange={() => setHasUnsavedChanges(true)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
              placeholder="JSON configuration for damage detection model..."
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">Decision Tree Configuration</label>
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
              rows={4}
              onChange={() => setHasUnsavedChanges(true)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
              placeholder="JSON configuration for decision tree..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sorting Rules</label>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm">Select Existing Rules</Button>
              <Button variant="secondary" size="sm">Create New Rule</Button>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">Remove Background</label>
              <Button variant="secondary" size="sm" className="flex items-center gap-1">
                <Upload size={14} />
                Upload Image
              </Button>
            </div>
            <Input placeholder="https://example.com/background.png" />
          </div>
        </div>
      </div>

      {/* Save/Revert Buttons */}
      {/* Validation */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Validation</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              defaultChecked={false}
              onChange={() => setHasUnsavedChanges(true)}
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
              onChange={() => setHasUnsavedChanges(true)}
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
            onChange={() => setHasUnsavedChanges(true)}
          />
          <Input
            label="Min Task Processing Duration (minutes)"
            type="number"
            defaultValue="5"
            onChange={() => setHasUnsavedChanges(true)}
          />
          <label className="flex items-center lg:col-span-2">
            <input
              type="checkbox"
              defaultChecked={false}
              onChange={() => setHasUnsavedChanges(true)}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
            />
            <span className="ml-2 text-sm text-gray-700">IA Validation (Joelle model)</span>
          </label>
        </div>
      </div>

      {/* Events & Webhooks */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Events & Webhooks</h3>
        <p className="text-sm text-gray-600 mb-6">Configure notification templates and recipients for different events</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Events List */}
          <div className="lg:col-span-1">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Events</h4>
            <div className="space-y-2">
              {[
                { id: 'self_inspection_creation', name: 'Self Inspection Creation', active: true },
                { id: 'automated_chase_up', name: 'Automated Chase-up Message', active: false },
                { id: 'manual_chase_up', name: 'Manual Chase-up Message', active: false },
                { id: 'inspection_finished', name: 'Inspection Finished Message', active: false },
                { id: 'damage_review_finished', name: 'Damage Review Finished Message', active: false },
                { id: 'share_updated_report', name: 'Share Updated Report Message', active: false }
              ].map((event) => (
                <button
                  key={event.id}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    event.active 
                      ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setHasUnsavedChanges(true)}
                >
                  {event.name}
                </button>
              ))}
            </div>
          </div>

          {/* Configuration Panel */}
          <div className="lg:col-span-3">
            {/* Current Event Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 bg-blue-600 rounded"></div>
                <span className="text-sm font-medium text-blue-900">Currently configuring messages for: Customer</span>
              </div>
              <p className="text-sm text-blue-700">The messages content below will be sent to customer recipients</p>
            </div>

            {/* Recipients */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-gray-900">Recipients</h4>
                <Button variant="secondary" size="sm" className="text-blue-600">
                  + Add Recipient
                </Button>
              </div>
              
              <div className="space-y-3">
                {[
                  { 
                    id: 'customer_phone', 
                    name: 'Customer Phone Number', 
                    description: 'Automatically recovered from customer data',
                    enabled: true 
                  },
                  { 
                    id: 'company_email', 
                    name: 'Company Email Address', 
                    description: 'admin@company.com',
                    enabled: true 
                  },
                  { 
                    id: 'agent_email', 
                    name: 'Agent Email Address', 
                    description: 'Automatically recovered from agent data',
                    enabled: true 
                  },
                  { 
                    id: 'webhook', 
                    name: 'Webhook URL', 
                    description: 'https://api.company.com/webhook',
                    enabled: false 
                  }
                ].map((recipient) => (
                  <div key={recipient.id} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gray-300 rounded flex items-center justify-center">
                        <span className="text-xs text-gray-600">📧</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{recipient.name}</p>
                        <p className="text-xs text-gray-500">{recipient.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked={recipient.enabled}
                          onChange={() => setHasUnsavedChanges(true)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                      <button className="text-gray-400 hover:text-gray-600">
                        <span className="text-sm">⚙️</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Content */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-gray-900">Customer - Message Content</h4>
                <div className="flex items-center gap-2">
                  <select className="text-sm border border-gray-300 rounded px-2 py-1">
                    <option>🇺🇸 English</option>
                    <option>🇫🇷 French</option>
                    <option>🇪🇸 Spanish</option>
                  </select>
                  <Button variant="primary" size="sm">
                    Save Changes
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Email */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-medium text-gray-900">📧 Email</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked={true}
                        onChange={() => setHasUnsavedChanges(true)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Subject</label>
                      <input
                        type="text"
                        defaultValue="Your Vehicle Inspection Has Been Created"
                        onChange={() => setHasUnsavedChanges(true)}
                        className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">HTML Content</label>
                      <textarea
                        rows={8}
                        defaultValue={`<p>Hello {{customer_name}},</p>

<p>Your vehicle inspection has been successfully created. Inspection ID: {{inspection_id}}</p>

<p>Vehicle: {{immat}}</p>
<p>Tracking: <a href="{{tracking_url}}">{{tracking_url}}</a></p>

<p>You can track the progress of your inspection using the link above.</p>

<p>Best regards,<br>{{company_name}}</p>`}
                        onChange={() => setHasUnsavedChanges(true)}
                        className="block w-full px-3 py-2 text-xs font-mono border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* SMS */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-medium text-gray-900">📱 SMS</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked={true}
                        onChange={() => setHasUnsavedChanges(true)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Text Content</label>
                    <textarea
                      rows={4}
                      defaultValue="Hello {{customer_name}}, your vehicle inspection has been created. Inspection ID: {{inspection_id}}. Track progress: {{inspection_link}}"
                      onChange={() => setHasUnsavedChanges(true)}
                      className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">Character count: 156</span>
                      <span className="text-xs text-gray-500">Page limit: 1</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Available Variables */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h5 className="text-sm font-medium text-gray-900 mb-3">Available Variables</h5>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                  {[
                    '{{customer_name}}', '{{customer_email}}', '{{customer_phone}}', '{{inspection_id}}',
                    '{{inspection_link}}', '{{vehicle_make}}', '{{vehicle_model}}', '{{license_plate}}',
                    '{{company_name}}', '{{agent_name}}', '{{inspection_date}}', '{{tracking_url}}'
                  ].map((variable) => (
                    <button
                      key={variable}
                      onClick={() => setHasUnsavedChanges(true)}
                      className="text-xs bg-white border border-gray-200 rounded px-2 py-1 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                    >
                      {variable}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Click any variable to copy it to your clipboard
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save/Revert Buttons */}
      {/* Events & Webhooks */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Events & Webhooks</h3>
        <p className="text-sm text-gray-600 mb-6">Configure notification templates and recipients for different events</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Events List */}
          <div className="lg:col-span-1">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Events</h4>
            <div className="space-y-2">
              {[
                { id: 'self_inspection_creation', name: 'Self Inspection Creation', active: true },
                { id: 'automated_chase_up', name: 'Automated Chase-up Message', active: false },
                { id: 'manual_chase_up', name: 'Manual Chase-up Message', active: false },
                { id: 'inspection_finished', name: 'Inspection Finished Message', active: false },
                { id: 'damage_review_finished', name: 'Damage Review Finished Message', active: false },
                { id: 'share_updated_report', name: 'Share Updated Report Message', active: false }
              ].map((event) => (
                <button
                  key={event.id}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    event.active 
                      ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setHasUnsavedChanges(true)}
                >
                  {event.name}
                </button>
              ))}
            </div>
          </div>

          {/* Configuration Panel */}
          <div className="lg:col-span-3">
            {/* Current Event Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 bg-blue-600 rounded"></div>
                <span className="text-sm font-medium text-blue-900">Currently configuring messages for: Customer</span>
              </div>
              <p className="text-sm text-blue-700">The messages content below will be sent to customer recipients</p>
            </div>

            {/* Recipients */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-gray-900">Recipients</h4>
                <Button variant="secondary" size="sm" className="text-blue-600">
                  + Add Recipient
                </Button>
              </div>
              
              <div className="space-y-3">
                {[
                  { 
                    id: 'customer_phone', 
                    name: 'Customer Phone Number', 
                    description: 'Automatically recovered from customer data',
                    enabled: true 
                  },
                  { 
                    id: 'company_email', 
                    name: 'Company Email Address', 
                    description: 'admin@company.com',
                    enabled: true 
                  },
                  { 
                    id: 'agent_email', 
                    name: 'Agent Email Address', 
                    description: 'Automatically recovered from agent data',
                    enabled: true 
                  },
                  { 
                    id: 'webhook', 
                    name: 'Webhook URL', 
                    description: 'https://api.company.com/webhook',
                    enabled: false 
                  }
                ].map((recipient) => (
                  <div key={recipient.id} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gray-300 rounded flex items-center justify-center">
                        <span className="text-xs text-gray-600">📧</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{recipient.name}</p>
                        <p className="text-xs text-gray-500">{recipient.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked={recipient.enabled}
                          onChange={() => setHasUnsavedChanges(true)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                      <button className="text-gray-400 hover:text-gray-600">
                        <span className="text-sm">⚙️</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Content */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-gray-900">Customer - Message Content</h4>
                <div className="flex items-center gap-2">
                  <select className="text-sm border border-gray-300 rounded px-2 py-1">
                    <option>🇺🇸 English</option>
                    <option>🇫🇷 French</option>
                    <option>🇪🇸 Spanish</option>
                  </select>
                  <Button variant="primary" size="sm">
                    Save Changes
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Email */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-medium text-gray-900">📧 Email</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked={true}
                        onChange={() => setHasUnsavedChanges(true)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Subject</label>
                      <input
                        type="text"
                        defaultValue="Your Vehicle Inspection Has Been Created"
                        onChange={() => setHasUnsavedChanges(true)}
                        className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">HTML Content</label>
                      <textarea
                        rows={8}
                        defaultValue={`<p>Hello {{customer_name}},</p>

<p>Your vehicle inspection has been successfully created. Inspection ID: {{inspection_id}}</p>

<p>Vehicle: {{immat}}</p>
<p>Tracking: <a href="{{tracking_url}}">{{tracking_url}}</a></p>

<p>You can track the progress of your inspection using the link above.</p>

<p>Best regards,<br>{{company_name}}</p>`}
                        onChange={() => setHasUnsavedChanges(true)}
                        className="block w-full px-3 py-2 text-xs font-mono border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* SMS */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-medium text-gray-900">📱 SMS</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked={true}
                        onChange={() => setHasUnsavedChanges(true)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Text Content</label>
                    <textarea
                      rows={4}
                      defaultValue="Hello {{customer_name}}, your vehicle inspection has been created. Inspection ID: {{inspection_id}}. Track progress: {{inspection_link}}"
                      onChange={() => setHasUnsavedChanges(true)}
                      className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">Character count: 156</span>
                      <span className="text-xs text-gray-500">Page limit: 1</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Available Variables */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h5 className="text-sm font-medium text-gray-900 mb-3">Available Variables</h5>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                  {[
                    '{{customer_name}}', '{{customer_email}}', '{{customer_phone}}', '{{inspection_id}}',
                    '{{inspection_link}}', '{{vehicle_make}}', '{{vehicle_model}}', '{{license_plate}}',
                    '{{company_name}}', '{{agent_name}}', '{{inspection_date}}', '{{tracking_url}}'
                  ].map((variable) => (
                    <button
                      key={variable}
                      onClick={() => setHasUnsavedChanges(true)}
                      className="text-xs bg-white border border-gray-200 rounded px-2 py-1 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                    >
                      {variable}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Click any variable to copy it to your clipboard
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save/Revert Buttons */}
      <div className="flex gap-4 justify-end sticky bottom-0 bg-white py-4 border-t border-gray-200">
        <Button variant="secondary" onClick={() => setHasUnsavedChanges(false)}>
          Revert Changes
        </Button>
        <Button className="flex items-center gap-2" disabled={!hasUnsavedChanges}>
          <Save size={16} />
          Save Changes
        </Button>
      </div>
    </div>
  );

  const JourneySettingsContent = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Global Inspection Journey Options</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Input
          label="NPS Delay (seconds)"
          type="number"
          defaultValue="7"
          onChange={() => setHasUnsavedChanges(true)}
        />
        <label className="flex items-center">
          <input
            type="checkbox"
            defaultChecked={true}
            onChange={() => setHasUnsavedChanges(true)}
            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          />
          <span className="ml-2 text-sm text-gray-700">Enable Blur Detection</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            defaultChecked={true}
            onChange={() => setHasUnsavedChanges(true)}
            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          />
          <span className="ml-2 text-sm text-gray-700">Enable Mileage Capture</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            defaultChecked={true}
            onChange={() => setHasUnsavedChanges(true)}
            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          />
          <span className="ml-2 text-sm text-gray-700">Enable VIN Scanning</span>
        </label>
      </div>
    </div>
  );

  const HierarchyContent = () => (
    <div className="space-y-6">
      {/* Parent Company Selection */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Hierarchy</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Parent Company
            </label>
            <select 
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              defaultValue={company.parentCompany || ''}
              onChange={() => setHasUnsavedChanges(true)}
            >
              <option value="">No Parent Company</option>
              {mockCompanies
                .filter(c => c.id !== company.id)
                .map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))
              }
            </select>
            <p className="text-sm text-gray-500 mt-1">
              Select a parent company to create a hierarchy relationship
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Children Count
            </label>
            <Input
              value={company.childrenCount.toString()}
              disabled
              helperText="Number of child companies (read-only)"
            />
          </div>
        </div>
      </div>

      {/* Child Companies */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Child Companies</h3>
        {company.childrenCount > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contract Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockCompanies
                  .filter(c => c.parentCompany === company.id)
                  .map((childCompany) => (
                    <tr key={childCompany.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {childCompany.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {childCompany.companyCode}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          childCompany.contractType === 'Client' ? 'bg-green-100 text-green-800' :
                          childCompany.contractType === 'Prospect' ? 'bg-blue-100 text-blue-800' :
                          childCompany.contractType === 'Test' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {childCompany.contractType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => navigate(`/companies/${childCompany.id}/edit`)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => {/* Handle remove from hierarchy */}}
                            className="text-red-600 hover:text-red-900"
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>This company has no child companies.</p>
          </div>
        )}
      </div>

      {/* Hierarchy Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Hierarchy Actions</h3>
        <div className="flex gap-4">
          <Button variant="secondary">
            Add Child Company
          </Button>
          <Button variant="secondary">
            Change Parent Company
          </Button>
          {company.parentCompany && (
            <Button variant="danger">
              Remove from Hierarchy
            </Button>
          )}
        </div>
      </div>
    </div>
  );
  const SavedJourneysContent = () => {
    const companyJourneys = mockJourneys.filter(j => j.companyId === company.id);
    
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Saved Journeys</h3>
          <Button onClick={() => navigate('/journeys/new')}>
            Create New Journey
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Journey Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {companyJourneys.map((journey) => (
                <tr key={journey.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {journey.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      journey.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {journey.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-900">View</button>
                      <button className="text-blue-600 hover:text-blue-900">Edit</button>
                      <button className="text-green-600 hover:text-green-900">Duplicate</button>
                      <button className="text-red-600 hover:text-red-900">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const tabs = [
    {
      key: 'company-settings',
      label: 'Company Settings',
      content: <CompanySettingsContent />
    },
    {
      key: 'hierarchy',
      label: 'Hierarchy',
      content: <HierarchyContent />
    },
    {
      key: 'journey-settings',
      label: 'Inspection Journey Settings',
      content: <JourneySettingsContent />
    },
    {
      key: 'saved-journeys',
      label: 'Saved Journeys',
      content: <SavedJourneysContent />
    }
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header title={`Edit Company: ${company.name}`} />
      
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

        <Tabs 
          tabs={tabs} 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
      </div>
    </div>
  );
}