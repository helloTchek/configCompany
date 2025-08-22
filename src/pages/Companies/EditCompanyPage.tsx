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
          label="NPS Delay (secondsdddddddddddddd)"
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