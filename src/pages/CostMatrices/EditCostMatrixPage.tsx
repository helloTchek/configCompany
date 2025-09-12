import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';
import { mockCostMatrices } from '../../data/mockData';

interface CostPart {
  id: string;
  partType: string;
  location: string;
  severity: 'Minor' | 'Moderate' | 'Major' | 'Severe';
  cost: number;
}

export default function EditCostMatrixPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    company: '',
    currency: 'EUR',
    tax: 20,
  });
  const [parts, setParts] = useState<CostPart[]>([]);
  const [errors, setErrors] = useState({
    company: '',
    currency: '',
    tax: ''
  });

  useEffect(() => {
    // Load cost matrix data
    const matrix = mockCostMatrices.find(m => m.id === id);
    if (matrix) {
      setFormData({
        company: matrix.company,
        currency: matrix.currency,
        tax: matrix.tax,
      });
      setParts(matrix.parts.map((part, index) => ({
        id: `part-${index}`,
        partType: part.partType,
        location: part.location,
        severity: part.severity,
        cost: part.cost
      })));
    } else {
      navigate('/cost-matrices');
      return;
    }
    setLoading(false);
  }, [id, navigate]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const addPart = () => {
    const newPart: CostPart = {
      id: `part-${Date.now()}`,
      partType: '',
      location: '',
      severity: 'Minor',
      cost: 0
    };
    setParts([...parts, newPart]);
  };

  const removePart = (partId: string) => {
    setParts(parts.filter(part => part.id !== partId));
  };

  const updatePart = (partId: string, field: keyof CostPart, value: string | number) => {
    setParts(parts.map(part => 
      part.id === partId ? { ...part, [field]: value } : part
    ));
  };

  const validateForm = () => {
    const newErrors = {
      company: '',
      currency: '',
      tax: ''
    };

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
    return !newErrors.company && !newErrors.currency && !newErrors.tax;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    const updatedMatrix = {
      id,
      ...formData,
      parts: parts.filter(part => part.partType && part.location),
      updatedAt: new Date().toISOString()
    };

    console.log('Updating cost matrix:', updatedMatrix);
    navigate('/cost-matrices');
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Loading..." />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading cost matrix...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header title="Edit Cost Matrix" />
      
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

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                <select
                  value={formData.currency}
                  onChange={(e) => handleInputChange('currency', e.target.value)}
                  className={`block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.currency ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                  <option value="GBP">GBP</option>
                </select>
                {errors.currency && <p className="text-sm text-red-600 mt-1">{errors.currency}</p>}
              </div>

              <Input
                label="Tax Rate (%)"
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

          {/* Cost Parts */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Cost Parts</h3>
              <Button
                onClick={addPart}
                className="flex items-center gap-2"
                size="sm"
              >
                <Plus size={16} />
                Add Part
              </Button>
            </div>

            <div className="space-y-4">
              {parts.map((part, index) => (
                <div key={part.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-900">Part {index + 1}</h4>
                    {parts.length > 1 && (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => removePart(part.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Input
                      label="Part Type"
                      value={part.partType}
                      onChange={(e) => updatePart(part.id, 'partType', e.target.value)}
                      placeholder="e.g., Front Bumper"
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <select
                        value={part.location}
                        onChange={(e) => updatePart(part.id, 'location', e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select Location</option>
                        <option value="Front">Front</option>
                        <option value="Rear">Rear</option>
                        <option value="Left">Left</option>
                        <option value="Right">Right</option>
                        <option value="Roof">Roof</option>
                        <option value="Interior">Interior</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                      <select
                        value={part.severity}
                        onChange={(e) => updatePart(part.id, 'severity', e.target.value as CostPart['severity'])}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Minor">Minor</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Major">Major</option>
                        <option value="Severe">Severe</option>
                      </select>
                    </div>

                    <Input
                      label="Cost"
                      type="number"
                      value={part.cost}
                      onChange={(e) => updatePart(part.id, 'cost', parseFloat(e.target.value) || 0)}
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Save Buttons */}
          <div className="flex gap-4 justify-end sticky bottom-0 bg-white py-4 border-t border-gray-200">
            <Button variant="secondary" onClick={() => navigate('/cost-matrices')}>
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