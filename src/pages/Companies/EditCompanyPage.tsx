import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import { ArrowLeft, Save } from 'lucide-react';
import { mockCompanies } from '../../data/mockData';

export default function EditCompanyPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
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
  const [errors, setErrors] = useState({
    name: '',
    identifier: '',
    companyCode: ''
  });

  useEffect(() => {
    // Load company data
    const company = mockCompanies.find(c => c.id === id);
    if (company) {
      setFormData({
        name: company.name,
        identifier: company.identifier,
        companyCode: company.companyCode,
        contractType: company.contractType,
        businessSector: company.businessSector,
        logoUrl: company.logoUrl || '',
        retentionPeriod: company.retentionPeriod,
        disableFastTrack: company.disableFastTrack,
        enableMileageCapture: true, // Default values for new fields
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
        parentCompany: company.parentCompany || ''
      });
    } else {
      navigate('/companies');
      return;
    }
    setLoading(false);
  }, [id, navigate]);

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
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
      return;
    }

    const updatedCompany = {
      id,
      ...formData,
      updatedAt: new Date().toISOString()
    };

    console.log('Updating company:', updatedCompany);
    navigate('/companies');
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Loading..." />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading company...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header title="Edit Company" />
      
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

          {/* Save Buttons */}
          <div className="flex gap-4 justify-end sticky bottom-0 bg-white py-4 border-t border-gray-200">
            <Button variant="secondary" onClick={() => navigate('/companies')}>
              Cancel
            </Button>
            <Button 
              className="flex items-center gap-2" 
              onClick={handleSave}
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