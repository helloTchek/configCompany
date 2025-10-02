import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import { ArrowLeft, Save, Plus, Trash2, Download, Upload } from 'lucide-react';
import { mockCostMatrices } from '@/mocks/costMatrices.mock';
import { CostMatrixPart } from '../../types';

const severityColors = {
  'SEV1': 'bg-green-100 text-green-800',
  'SEV2': 'bg-yellow-100 text-yellow-800', 
  'SEV3': 'bg-orange-100 text-orange-800',
  'SEV4': 'bg-red-100 text-red-800',
  'SEV5': 'bg-red-200 text-red-900'
};

const severityLabels = {
  'SEV1': '1',
  'SEV2': '2',
  'SEV3': '3',
  'SEV4': '4',
  'SEV5': '5'
};

// Predefined vehicle parts with codes
const vehicleParts = [
  { code: 'PRC', nameEn: 'Bumper', nameFr: 'PARE-CHOC' },
  { code: 'PRT', nameEn: 'Door', nameFr: 'PORTE' },
  { code: 'JNA', nameEn: 'Aluminum rim', nameFr: 'JANTE ALLUMINIUM' },
  { code: 'JNT', nameEn: 'Steel rim', nameFr: 'JANTE TOLE' },
  { code: 'ENJ', nameEn: 'Hubcap', nameFr: 'ENJOLIVEUR' },
  { code: 'RTR', nameEn: 'Mirror', nameFr: 'RÉTROVISEUR' },
  { code: 'AIL', nameEn: 'Wing', nameFr: 'AILE' },
  { code: 'CAP', nameEn: 'Hood', nameFr: 'CAPOT' },
  { code: 'HAY', nameEn: 'Tailgate', nameFr: 'HAYON' },
  { code: 'TOI', nameEn: 'Roof', nameFr: 'TOIT' },
  { code: 'BAS', nameEn: 'Rocker panel', nameFr: 'BAS DE CAISSE' },
  { code: 'GRI', nameEn: 'Grille', nameFr: 'GRILLE' },
  { code: 'OPT', nameEn: 'Headlight', nameFr: 'OPTIQUE' },
  { code: 'PLQ', nameEn: 'License plate', nameFr: 'PLAQUE' }
];

// Predefined locations with codes
const vehicleLocations = [
  { code: 'AV', nameEn: 'Front', nameFr: 'Avant' },
  { code: 'AR', nameEn: 'Rear', nameFr: 'Arrière' },
  { code: 'AVG', nameEn: 'Front Left', nameFr: 'Avant Gauche' },
  { code: 'AVD', nameEn: 'Front Right', nameFr: 'Avant Droite' },
  { code: 'ARG', nameEn: 'Rear Left', nameFr: 'Arrière Gauche' },
  { code: 'ARD', nameEn: 'Rear Right', nameFr: 'Arrière Droite' },
  { code: 'G', nameEn: 'Left', nameFr: 'Gauche' },
  { code: 'D', nameEn: 'Right', nameFr: 'Droite' },
  { code: 'C', nameEn: 'Center', nameFr: 'Centre' },
  { code: 'SUP', nameEn: 'Top', nameFr: 'Supérieur' },
  { code: 'INF', nameEn: 'Bottom', nameFr: 'Inférieur' }
];

export default function EditCostMatrixPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    company: '',
    currency: 'EUR',
    tax: 20,
  });
  const [parts, setParts] = useState<CostMatrixPart[]>([]);
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
        ...part,
        id: `part-${index}`
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
    const newPart: CostMatrixPart = {
      id: `part-${Date.now()}`,
      partTypeCode: 'carbody',
      partCode: vehicleParts[0].code,
      locationCode: vehicleLocations[0].code,
      partNameEn: vehicleParts[0].nameEn,
      locationEn: vehicleLocations[0].nameEn,
      conditionLabelEn: '',
      severity: 'SEV1',
      repairTypeEn: '',
      costBeforeTax: 0,
      partNameFr: vehicleParts[0].nameFr,
      locationFr: vehicleLocations[0].nameFr,
      conditionLabelFr: '',
      repairTypeFr: '',
      conditionCode: '',
      repairCode: ''
    };
    setParts([...parts, newPart]);
  };

  const removePart = (partId: string) => {
    setParts(parts.filter(part => part.id !== partId));
  };

  const updatePart = (partId: string, field: keyof CostMatrixPart, value: string | number) => {
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
      parts: parts.filter(part => part.partNameEn && part.locationEn),
      updatedAt: new Date().toISOString()
    };

    console.log('Updating cost matrix:', updatedMatrix);
    navigate('/cost-matrices');
  };

  const handleDownloadCsv = () => {
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

    const csvContent = [
      headers.join(','),
      ...parts.map(part => [
        part.partTypeCode,
        part.partCode,
        part.locationCode,
        part.partNameEn,
        part.locationEn,
        part.conditionLabelEn,
        part.severity,
        part.repairTypeEn,
        part.costBeforeTax,
        part.partNameFr,
        part.locationFr,
        part.conditionLabelFr,
        part.repairTypeFr,
        part.conditionCode,
        part.repairCode
      ].join(','))
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
          const lines = csv.split('\n');
          const headers = lines[0].split(',');
          
          const newParts: CostMatrixPart[] = [];
          for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',');
            if (values.length >= 15) {
              newParts.push({
                id: `part-${Date.now()}-${i}`,
                partTypeCode: values[0] || '',
                partCode: values[1] || '',
                locationCode: values[2] || '',
                partNameEn: values[3] || '',
                locationEn: values[4] || '',
                conditionLabelEn: values[5] || '',
                severity: values[6] || 'SEV1',
                repairTypeEn: values[7] || '',
                costBeforeTax: parseFloat(values[8]) || 0,
                partNameFr: values[9] || '',
                locationFr: values[10] || '',
                conditionLabelFr: values[11] || '',
                repairTypeFr: values[12] || '',
                conditionCode: values[13] || '',
                repairCode: values[14] || ''
              });
            }
          }
          setParts(newParts);
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  // Filter parts based on search criteria
  const filteredParts = parts.filter(part => {
    const matchesPart = !filterByPart || 
      part.partNameEn.toLowerCase().includes(filterByPart.toLowerCase()) ||
      part.partNameFr.toLowerCase().includes(filterByPart.toLowerCase());
    const matchesLocation = !filterByLocation || 
      part.locationEn.toLowerCase().includes(filterByLocation.toLowerCase()) ||
      part.locationFr.toLowerCase().includes(filterByLocation.toLowerCase());
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
                  <option value="SEV1">SEV1 (Minor)</option>
                  <option value="SEV2">SEV2 (Light)</option>
                  <option value="SEV3">SEV3 (Moderate)</option>
                  <option value="SEV4">SEV4 (Major)</option>
                  <option value="SEV5">SEV5 (Severe)</option>
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
                        <div className="space-y-1">
                          <select
                            value={part.partCode}
                            onChange={(e) => {
                              const selectedPart = vehicleParts.find(p => p.code === e.target.value);
                              if (selectedPart) {
                                updatePart(part.id, 'partCode', selectedPart.code);
                                updatePart(part.id, 'partNameEn', selectedPart.nameEn);
                                updatePart(part.id, 'partNameFr', selectedPart.nameFr);
                              }
                            }}
                            className="block w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          >
                            {vehicleParts.map((vehiclePart) => (
                              <option key={vehiclePart.code} value={vehiclePart.code}>
                                {vehiclePart.nameEn} ({vehiclePart.code})
                              </option>
                            ))}
                          </select>
                          <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded border">
                            FR: {part.partNameFr}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="space-y-1">
                          <select
                            value={part.locationCode}
                            onChange={(e) => {
                              const selectedLocation = vehicleLocations.find(l => l.code === e.target.value);
                              if (selectedLocation) {
                                updatePart(part.id, 'locationCode', selectedLocation.code);
                                updatePart(part.id, 'locationEn', selectedLocation.nameEn);
                                updatePart(part.id, 'locationFr', selectedLocation.nameFr);
                              }
                            }}
                            className="block w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          >
                            {vehicleLocations.map((location) => (
                              <option key={location.code} value={location.code}>
                                {location.nameEn} ({location.code})
                              </option>
                            ))}
                          </select>
                          <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded border">
                            FR: {part.locationFr}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="space-y-1">
                          <select
                            value={part.severity}
                            onChange={(e) => updatePart(part.id, 'severity', e.target.value)}
                            className="block w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="SEV1">SEV1</option>
                            <option value="SEV2">SEV2</option>
                            <option value="SEV3">SEV3</option>
                            <option value="SEV4">SEV4</option>
                            <option value="SEV5">SEV5</option>
                          </select>
                          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${severityColors[part.severity]}`}>
                            {severityLabels[part.severity]}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={part.costBeforeTax}
                            onChange={(e) => updatePart(part.id, 'costBeforeTax', parseFloat(e.target.value) || 0)}
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