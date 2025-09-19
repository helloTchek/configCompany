import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import { ArrowLeft, Save, Plus, Trash2, Download, Upload } from 'lucide-react';
import { mockCostMatrices } from '../../data/mockData';

interface CostPart {
  id: string;
  partType: string;
  location: string;
  severity: 'Minor' | 'Moderate' | 'Major' | 'Severe';
  cost: number;
}

const severityColors = {
  'Minor': 'bg-green-100 text-green-800',
  'Moderate': 'bg-yellow-100 text-yellow-800', 
  'Major': 'bg-orange-100 text-orange-800',
  'Severe': 'bg-red-100 text-red-800'
};

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
  const [filterByPart, setFilterByPart] = useState('');
  const [filterByLocation, setFilterByLocation] = useState('');
  const [filterBySeverity, setFilterBySeverity] = useState('');

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

  const handleDownloadCsv = () => {
    const csvContent = [
      'Part Type,Location,Severity,Cost',
      ...parts.map(part => `${part.partType},${part.location},${part.severity},${part.cost}`)
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.company.toLowerCase().replace(/\s+/g, '-')}-cost-matrix.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleUploadCsv = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const csv = e.target?.result as string;
          // Parse CSV and update parts
          console.log('Uploading CSV:', csv);
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  // Filter parts based on search criteria
  const filteredParts = parts.filter(part => {
    const matchesPart = !filterByPart || part.partType.toLowerCase().includes(filterByPart.toLowerCase());
    const matchesLocation = !filterByLocation || part.location.toLowerCase().includes(filterByLocation.toLowerCase());
    const matchesSeverity = !filterBySeverity || part.severity === filterBySeverity;
    return matchesPart && matchesLocation && matchesSeverity;
  });

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
      <Header title={formData.company.toUpperCase()} />
      
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

        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header with company info */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{formData.company.toUpperCase()}</h2>
                <p className="text-gray-600">Edit repair costs and matrix settings</p>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="text-center">
                  <div className="font-semibold text-gray-900">{formData.tax}%</div>
                  <div className="text-gray-600">Tax Rate</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900">{formData.currency}</div>
                  <div className="text-gray-600">Currency</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900">{parts.length}</div>
                  <div className="text-gray-600">Entries</div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="secondary"
                onClick={handleDownloadCsv}
                className="flex items-center gap-2"
                size="sm"
              >
                <Download size={16} />
                Download CSV
              </Button>
              <Button
                variant="secondary"
                onClick={handleUploadCsv}
                className="flex items-center gap-2"
                size="sm"
              >
                <Upload size={16} />
                Upload CSV
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Vehicle Part</label>
                <input
                  type="text"
                  placeholder="Search vehicle parts..."
                  value={filterByPart}
                  onChange={(e) => setFilterByPart(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Location</label>
                <input
                  type="text"
                  placeholder="Search locations..."
                  value={filterByLocation}
                  onChange={(e) => setFilterByLocation(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Severity Type</label>
                <select
                  value={filterBySeverity}
                  onChange={(e) => setFilterBySeverity(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All severity types...</option>
                  <option value="Minor">Minor</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Major">Major</option>
                  <option value="Severe">Severe</option>
                </select>
              </div>
            </div>
          </div>

          {/* Parts Table */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Cost Entries</h3>
                <p className="text-sm text-gray-600">Showing {filteredParts.length} of {parts.length} entries</p>
              </div>
              <Button
                onClick={addPart}
                className="flex items-center gap-2"
                size="sm"
              >
                <Plus size={16} />
                Add Entry
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">VEHICLE PART</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">VEHICLE PART LOCATION</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">SEVERITY TYPE</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">COST</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredParts.map((part) => (
                    <tr key={part.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <input
                          type="text"
                          value={part.partType}
                          onChange={(e) => updatePart(part.id, 'partType', e.target.value)}
                          className="block w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Part type"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={part.location}
                          onChange={(e) => updatePart(part.id, 'location', e.target.value)}
                          className="block w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select location</option>
                          <option value="FRONT">FRONT</option>
                          <option value="REAR">REAR</option>
                          <option value="LEFT">LEFT</option>
                          <option value="RIGHT">RIGHT</option>
                          <option value="TOP">TOP</option>
                          <option value="INTERIOR">INTERIOR</option>
                        </select>
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={part.severity}
                          onChange={(e) => updatePart(part.id, 'severity', e.target.value as CostPart['severity'])}
                          className="block w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="Minor">Minor</option>
                          <option value="Moderate">Moderate</option>
                          <option value="Major">Major</option>
                          <option value="Severe">Severe</option>
                        </select>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={part.cost}
                            onChange={(e) => updatePart(part.id, 'cost', parseFloat(e.target.value) || 0)}
                            className="block w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            min="0"
                            step="0.01"
                          />
                          <span className="text-sm text-gray-600">{formData.currency}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => removePart(part.id)}
                          className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                          title="Remove"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredParts.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No cost entries found.</p>
                <Button onClick={addPart} className="mt-2" size="sm">
                  Add First Entry
                </Button>
              </div>
            )}
          </div>

          {/* Basic Settings */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Matrix Settings</h3>
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