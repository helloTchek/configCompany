import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../../components/Layout/Header';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import { ArrowLeft, Save } from 'lucide-react';
import { mockSortingRules } from '@/mocks/data';

export default function EditSortingRulePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useTranslation(['sortingRules', 'common']);
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
      newErrors.company = t('common:validation.required');
    }

    if (!formData.type.trim()) {
      newErrors.type = t('common:validation.required');
    }

    if (!formData.fromCollection.trim()) {
      newErrors.fromCollection = t('common:validation.required');
    }

    if (!formData.targetCollection.trim()) {
      newErrors.targetCollection = t('common:validation.required');
    }

    if (!formData.referenceKey.trim()) {
      newErrors.referenceKey = t('common:validation.required');
    }

    if (!formData.filters.trim()) {
      newErrors.filters = t('common:validation.required');
    } else {
      try {
        JSON.parse(formData.filters);
      } catch (e) {
        newErrors.filters = t('sortingRules:messages.invalidJson');
      }
    }

    if (!formData.updates.trim()) {
      newErrors.updates = t('common:validation.required');
    } else {
      try {
        JSON.parse(formData.updates);
      } catch (e) {
        newErrors.updates = t('sortingRules:messages.invalidJson');
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
        <Header title={t('common:actions.loading')} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">{t('sortingRules:messages.loadingRule')}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header title={t('sortingRules:edit')} />
      
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6">
          <Button
            variant="secondary"
            onClick={() => navigate('/sorting-rules')}
            className="flex items-center gap-2 mb-4"
          >
            <ArrowLeft size={16} />
            {t('common:actions.back')} {t('sortingRules:title')}
          </Button>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('common:sections.basicInformation')}</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('sortingRules:fields.company')}</label>
                <select
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className={`block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.company ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">{t('common:actions.select')} {t('sortingRules:fields.company')}</option>
                  <option value="AutoCorp Insurance">AutoCorp Insurance</option>
                  <option value="FleetMax Leasing">FleetMax Leasing</option>
                </select>
                {errors.company && <p className="text-sm text-red-600 mt-1">{errors.company}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('sortingRules:fields.type')}</label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className={`block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.type ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">{t('common:actions.select')} {t('sortingRules:fields.type')}</option>
                  <option value="detectionPhase">{t('sortingRules:types.detectionPhase')}</option>
                  <option value="validationPhase">{t('sortingRules:types.validationPhase')}</option>
                  <option value="reportGeneration">{t('sortingRules:types.reportGeneration')}</option>
                </select>
                {errors.type && <p className="text-sm text-red-600 mt-1">{errors.type}</p>}
              </div>

              <Input
                label={t('sortingRules:fields.fromCollection')}
                value={formData.fromCollection}
                onChange={(e) => handleInputChange('fromCollection', e.target.value)}
                placeholder="e.g., ROI"
                error={errors.fromCollection}
                required
              />

              <Input
                label={t('sortingRules:fields.targetCollection')}
                value={formData.targetCollection}
                onChange={(e) => handleInputChange('targetCollection', e.target.value)}
                placeholder="e.g., ROI"
                error={errors.targetCollection}
                required
              />

              <Input
                label={t('sortingRules:fields.referenceKey')}
                value={formData.referenceKey}
                onChange={(e) => handleInputChange('referenceKey', e.target.value)}
                placeholder="e.g., damageType"
                error={errors.referenceKey}
                required
              />

              <Input
                label={t('sortingRules:fields.referencePrefix')}
                value={formData.referencePrefix}
                onChange={(e) => handleInputChange('referencePrefix', e.target.value)}
                placeholder="e.g., DMG_"
              />
            </div>
          </div>

          {/* Configuration */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('common:sections.configuration')}</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('sortingRules:fields.processingPriority')}</label>
                <select
                  value={formData.processingPriority}
                  onChange={(e) => handleInputChange('processingPriority', parseInt(e.target.value))}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value={1}>{t('sortingRules:priorities.highest')}</option>
                  <option value={2}>{t('sortingRules:priorities.high')}</option>
                  <option value={3}>{t('sortingRules:priorities.medium')}</option>
                  <option value={4}>{t('sortingRules:priorities.low')}</option>
                  <option value={5}>{t('sortingRules:priorities.lowest')}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('sortingRules:fields.filters')}</label>
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
                <p className="text-sm text-gray-500 mt-1">{t('sortingRules:examples.filtersHelp')}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('sortingRules:fields.updates')}</label>
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
                <p className="text-sm text-gray-500 mt-1">{t('sortingRules:examples.updatesHelp')}</p>
              </div>
            </div>
          </div>

          {/* Examples */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">{t('sortingRules:examples.title')}</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-blue-800 mb-2">{t('sortingRules:examples.filterExamples')}</h4>
                <div className="space-y-2 text-sm">
                  <div className="bg-white p-2 rounded border font-mono">{JSON.stringify({"severity": {"$gte": 3}})}</div>
                  <div className="bg-white p-2 rounded border font-mono">{JSON.stringify({"damageType": "scratch", "confidence": {"$gt": 0.8}})}</div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-blue-800 mb-2">{t('sortingRules:examples.updateExamples')}</h4>
                <div className="space-y-2 text-sm">
                  <div className="bg-white p-2 rounded border font-mono">{JSON.stringify({"priority": "high"})}</div>
                  <div className="bg-white p-2 rounded border font-mono">{JSON.stringify({"status": "validated", "reviewRequired": true})}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Save Buttons */}
          <div className="flex gap-4 justify-end sticky bottom-0 bg-white py-4 border-t border-gray-200">
            <Button variant="secondary" onClick={() => navigate('/sorting-rules')}>
              {t('common:actions.cancel')}
            </Button>
            <Button 
              className="flex items-center gap-2" 
              onClick={handleSave}
            >
              <Save size={16} />
              {t('common:actions.save')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}