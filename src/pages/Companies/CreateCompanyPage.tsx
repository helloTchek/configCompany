import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import { ArrowLeft, Save, Upload } from 'lucide-react';

export default function CreateCompanyPage() {
  const navigate = useNavigate();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleInputChange = () => {
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving new company...');
    // Navigate back to companies list after save
    navigate('/companies');
  };

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

        <div className="max-w-4xl mx-auto space-y-6">
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
                  placeholder='{"picturesPreSelected":"true","showDamage":"true","showGallery":"true","showNewDamage":"true","showState":"true","oldDamages":true,"checkDamages":true,"isCarDealership":true,"showWatermark":false,"prefix":"","selectorSens":"clockwise","selectorSvgColor":"repairSeverity","selectorSvg":"renault","state":{"checklist":true,"picturesPreSelected":true,"showCost":true,"showSeverity":true,"signatory":true,"vehicleDetails":true,"croppImages":true,"signing":false,"notes":true,"tchekScan":true},"simple":{"signatory":true,"picturesPreSelected":true,"showCost":true,"showSeverity":true,"vehicleDetails":true,"croppImages":true},"specificSectionsConfig":{"withCosts":{"intro":{"visible":true,"showTopRightHorizontalBar":true},"signatoryAndVehicle":{"visible":true,"showEmptyFields":false},"estimatedCosts":{"visible":true},"preselectedPictures":{"visible":true},"gallery":{"visible":true,"showMiniatures":true,"showActionButton":true},"vehicleStateWithoutComparison":{"visible":true},"vehicleStateWithComparison":{"visible":true},"newDamages":{"visible":true},"damageDetails":{"visible":true},"damageInterior":{"visible":true},"exteriorElements":{"visible":true},"additionalElements":{"visible":true},"clientNotes":{"visible":true},"tchekScan":{"visible":true},"signing":{"visible":false},"footer":{"visible":true},"severityDetailsConfig":{"showCrop":true,"showCropId":false,"showCropScore":false,"showCropType":true,"showCropRoi":true,"showRois":true}},"withoutCosts":{"intro":{"visible":true,"showTopRightHorizontalBar":true},"signatoryAndVehicle":{"visible":true,"showEmptyFields":false},"estimatedCosts":{"visible":false},"preselectedPictures":{"visible":true},"gallery":{"visible":true,"showMiniatures":true,"showActionButton":true},"vehicleStateWithoutComparison":{"visible":true},"vehicleStateWithComparison":{"visible":true},"newDamages":{"visible":true},"damageDetails":{"visible":true},"damageInterior":{"visible":true},"exteriorElements":{"visible":true},"additionalElements":{"visible":true},"clientNotes":{"visible":true},"tchekScan":{"visible":true},"signing":{"visible":false},"footer":{"visible":true},"severityDetailsConfig":{"showCrop":true,"showCropId":false,"showCropScore":false,"showCropType":true,"showCropRoi":true,"showRois":true}}}}'
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
                  placeholder='{"damageDetection": true, "vinScanning": true}'
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

          {/* Save Buttons */}
          <div className="flex gap-4 justify-end sticky bottom-0 bg-white py-4 border-t border-gray-200">
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