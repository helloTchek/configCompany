import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import Modal from '../../components/UI/Modal';
import { ArrowLeft, Save, Download, X } from 'lucide-react';

export default function CreateCostMatrixPage() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duplicateFrom: '',
    company: '',
    currency: 'EUR',
    tax: 20,
  });
  const [errors, setErrors] = useState({
    name: '',
    company: '',
    currency: '',
    tax: ''
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleDownloadTemplate = () => {
    // Create CSV template with proper format
    const headers = [
      'Part Type code',
      '3-letter part code', 
      'Location code',
      'Part name (EN)',
      'Location (EN)',
      'Condition label (EN)',
      'Severity (1 to 5)',
      'Repair type (EN)',
      'COST BEFORE TAX',
      'Part name (FR)',
      'Location (FR)',
      'Condition label (FR)',
      'Réparation (FR)',
      'Condition code',
      'Repair code'
    ];

    const sampleData = [
      'carbody,PRC,AV,Bumper,Front,scuffed,SEV1,Polish,450,PARE-CHOC,Avant,Éraflé,Polish,scuffed,polish',
      'carbody,PRC,AV,Bumper,Front,damaged,SEV4,Sheet Metal Work and Painting,850,PARE-CHOC,Avant,Endommagé,Tôlerie Peinture,damaged,sheet_metal_work_and_painting',
      'carbody,PRT,AVG,Door,Front Left,scratched,SEV3,Painting,320,PORTE,Avant Gauche,Rayé,Peinture,scratched,painting'
    ];

    const csvContent = [headers.join(','), ...sampleData].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cost-matrix-template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const validateForm = () => {
    const newErrors = {
      name: '',
      company: '',
      currency: '',
      tax: ''
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Matrix name is required';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company is required';
    }

    if (!formData.currency.trim()) {
      newErrors.currency = 'Currency is required';
    }

    if (formData.tax < 0 || formData.tax > 100) {
      newErrors.tax = 'Tax rate must be between 0 and 100';
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.company && !newErrors.currency && !newErrors.tax;
  };

  const handleCreateMatrix = () => {
    if (!validateForm()) {
      return;
    }

    const newMatrix = {
      id: `matrix-${Date.now()}`,
      company: formData.company,
      currency: formData.currency,
      tax: formData.tax,
      parts: formData.duplicateFrom ? [] : [], // Would copy from existing if duplicating
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    console.log('Creating cost matrix:', newMatrix);
    
    // Navigate to edit page for the new matrix
    navigate(`/cost-matrices/${newMatrix.id}/edit`);
  };

  if (!showModal) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Create Cost Matrix" />
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <Button
              variant="secondary"
              onClick={() => navigate('/cost-matrices')}
              className="flex items-center gap-2 mb-4"
            >
              <ArrowLeft size={16} />
              Back to Cost Matrices
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header title="Create Cost Matrix" />
      
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6">
          <Button
            variant="secondary"
            onClick={() => navigate('/cost-matrices')}
            className="flex items-center gap-2 mb-4"
          >
            <ArrowLeft size={16} />
            Back to Cost Matrices
          </Button>
        </div>

        {/* Create Matrix Modal */}
        <Modal
          isOpen={showModal}
          onClose={() => navigate('/cost-matrices')}
          title="Create New Cost Matrix"
          size="md"
        >
          <div className="space-y-6">
            {/* Matrix Name */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Matrix Name</label>
              <Input
                placeholder="e.g. PREMIUM_MATRIX"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                error={errors.name}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Description</label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Brief description of this cost matrix"
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>

            {/* Duplicate from existing matrix */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Duplicate from existing matrix (optional)</label>
              <select
                value={formData.duplicateFrom}
                onChange={(e) => handleInputChange('duplicateFrom', e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Create empty matrix</option>
                <option value="1">AutoCorp Insurance - Standard Matrix</option>
                <option value="2">FleetMax Leasing - Premium Matrix</option>
              </select>
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Company</label>
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

            {/* Currency and Tax */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Currency</label>
                <select
                  value={formData.currency}
                  onChange={(e) => handleInputChange('currency', e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="EUR">EUR (€)</option>
                  <option value="USD">USD ($)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Tax Rate (%)</label>
                <Input
                  type="number"
                  value={formData.tax}
                  onChange={(e) => handleInputChange('tax', parseFloat(e.target.value) || 0)}
                  min="0"
                  max="100"
                  step="0.1"
                  error={errors.tax}
                />
              </div>
            </div>

            {/* Template Download */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <span className="text-blue-600">💡</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-blue-900 mb-1">Need a starting template?</h4>
                  <p className="text-sm text-blue-800 mb-3">
                    Download our default template to get started with common vehicle parts and repair costs.
                  </p>
                  <Button
                    variant="secondary"
                    onClick={handleDownloadTemplate}
                    className="flex items-center gap-2"
                    size="sm"
                  >
                    <Download size={16} />
                    Download Template
                  </Button>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
              <Button
                variant="secondary"
                onClick={() => navigate('/cost-matrices')}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateMatrix}
              >
                Create Matrix
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}