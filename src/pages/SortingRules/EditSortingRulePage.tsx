import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import { ArrowLeft, Save } from 'lucide-react';
import { mockSortingRules } from '../../data/mockData';

export default function EditSortingRulePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    company: '',
    type: '',
    fromCollection: '',
    targetCollection: '',
    referenceKey: '',
    referencePrefix: '',
    filters: '',
    updates: '',
    processingPriority: 3
  });
  const [errors, setErrors] = useState({
    company: '',
    type: '',
    fromCollection: '',
    targetCollection: '',
    referenceKey: '',
    filters: '',
    updates: ''
  });

  useEffect(() => {
    // Load sorting rule data
    const rule = mockSortingRules.find(r => r.id === id);
    if (rule) {
      setFormData({
        company: rule.company,
        type: rule.type,
        fromCollection: rule.fromCollection,
        targetCollection: rule.targetCollection,
        referenceKey: rule.referenceKey,
        referencePrefix: rule.referencePrefix,
        filters: rule.filters,
        updates: rule.updates,
        processingPriority: rule.processingPriority
      });
    } else {
      navigate('/sorting-rules');
      return;
    }
    setLoading(false);
  }, [id, navigate]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateForm = () => {
    const newErrors = {
      company: '',
      type: '',
      fromCollection: '',
      targetCollection: '',
      referenceKey: '',
      filters: '',
      updates: ''
    };

    if (!formData.company.trim()) {
      newErrors.company = 'Company is required';
    }

    if (!formData.type.trim()) {
      newErrors.type = 'Type is required';
    }

    if (!formData.fromCollection.trim()) {
      newErrors.fromCollection = 'From Collection is required';
    }

    if (!formData.targetCollection.trim()) {
      newErrors.targetCollection = 'Target Collection is required';
    }

    if (!formData.referenceKey.trim()) {
      newErrors.referenceKey = 'Reference Key is required';
    }

    if (!formData.filters.trim()) {
      newErrors.filters = 'Filters JSON is required';
    } else {
      try {
        JSON.parse(formData.filters);
      } catch (e) {
        newErrors.filters = 'Invalid JSON format';
      }
    }

    if (!formData.updates.trim()) {
      newErrors.updates = 'Updates JSON is required';
    } else {
      try {
        JSON.parse(formData.updates);
      } catch (e) {
        newErrors.updates = 'Invalid JSON format';
      }
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    const updatedRule = {
      id,
      ...formData,
      updatedAt: new Date().toISOString()
    };

    console.log('Updating sorting rule:', updatedRule);
    navigate('/sorting-rules');
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Loading..." />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading sorting rule...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header title="Edit Sorting Rule" />
      
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6">
          <Button
            variant="secondary"
            onClick={() => navigate('/sorting-rules')}
            className="flex items-center gap-2 mb-4"
          >
            <ArrowLeft size={16} />
            Back to Sorting Rules
          </Button>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className={`block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.type ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Type</option>
                  <option value="detectionPhase">Detection Phase</option>
                  <option value="validationPhase">Validation Phase</option>
                  <option value="reportGeneration">Report Generation</option>
                </select>
                {errors.type && <p className="text-sm text-red-600 mt-1">{errors.type}</p>}
              </div>

              <Input
                label="From Collection"
                value={formData.fromCollection}
                onChange={(e) => handleInputChange('fromCollection', e.target.value)}
                placeholder="e.g., ROI"
                error={errors.fromCollection}
                required
              />

              <Input
                label="Target Collection"
                value={formData.targetCollection}
                onChange={(e) => handleInputChange('targetCollection', e.target.value)}
                placeholder="e.g., ROI"
                error={errors.targetCollection}
                required
              />

              <Input
                label="Reference Key"
                value={formData.referenceKey}
                onChange={(e) => handleInputChange('referenceKey', e.target.value)}
                placeholder="e.g., damageType"
                error={errors.referenceKey}
                required
              />

              <Input
                label="Reference Prefix"
                value={formData.referencePrefix}
                onChange={(e) => handleInputChange('referencePrefix', e.target.value)}
                placeholder="e.g., DMG_"
              />
            </div>
          </div>

          {/* Configuration */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Rule Configuration</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Processing Priority</label>
                <select
                  value={formData.processingPriority}
                  onChange={(e) => handleInputChange('processingPriority', parseInt(e.target.value))}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value={1}>1 - Highest Priority</option>
                  <option value={2}>2 - High Priority</option>
                  <option value={3}>3 - Medium Priority</option>
                  <option value={4}>4 - Low Priority</option>
                  <option value={5}>5 - Lowest Priority</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Filters (JSON)</label>
                <textarea
                  rows={4}
                  value={formData.filters}
                  onChange={(e) => handleInputChange('filters', e.target.value)}
                  placeholder='{"severity": {"$gte": 3}}'
                  className={`block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm ${
                    errors.filters ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.filters && <p className="text-sm text-red-600 mt-1">{errors.filters}</p>}
                <p className="text-sm text-gray-500 mt-1">JSON object defining the filter criteria</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Updates (JSON)</label>
                <textarea
                  rows={4}
                  value={formData.updates}
                  onChange={(e) => handleInputChange('updates', e.target.value)}
                  placeholder='{"priority": "high"}'
                  className={`block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm ${
                    errors.updates ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.updates && <p className="text-sm text-red-600 mt-1">{errors.updates}</p>}
                <p className="text-sm text-gray-500 mt-1">JSON object defining the updates to apply</p>
              </div>
            </div>
          </div>

          {/* Examples */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Configuration Examples</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-blue-800 mb-2">Filter Examples:</h4>
                <div className="space-y-2 text-sm">
                  <div className="bg-white p-2 rounded border font-mono">{"severity": {"$gte": 3}}</div>
                  <div className="bg-white p-2 rounded border font-mono">{"damageType": "scratch", "confidence": {"$gt": 0.8}}</div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-blue-800 mb-2">Update Examples:</h4>
                <div className="space-y-2 text-sm">
                  <div className="bg-white p-2 rounded border font-mono">{"priority": "high"}</div>
                  <div className="bg-white p-2 rounded border font-mono">{"status": "validated", "reviewRequired": true}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Save Buttons */}
          <div className="flex gap-4 justify-end sticky bottom-0 bg-white py-4 border-t border-gray-200">
            <Button variant="secondary" onClick={() => navigate('/sorting-rules')}>
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