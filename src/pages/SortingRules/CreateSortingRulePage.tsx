import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/auth/AuthContext';
import Header from '../../components/Layout/Header';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import CompanySelector from '../../components/UI/CompanySelector';
import sortingRulesService from '../../services/sortingRulesService';
import companiesService from '../../services/companiesService';
import { ArrowLeft, Save } from 'lucide-react';

export default function CreateSortingRulePage() {
  const navigate = useNavigate();
  const { t } = useTranslation(['sortingRules', 'common']);
  const { user } = useAuth();

  const [allCompaniesLight, setAllCompaniesLight] = useState<Array<{ objectId: string; id: string; name: string; identifier?: string }>>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyId: user?.companyId || '',
    type: '',
    fromCollection: '',
    targetCollection: '',
    referenceKey: '',
    referencePrefix: '',
    filters: '',
    updates: ''
  });
  const [errors, setErrors] = useState({
    companyId: '',
    type: '',
    fromCollection: '',
    targetCollection: '',
    referenceKey: '',
    filters: '',
    updates: ''
  });

  // Load all companies light (for superAdmin)
  useEffect(() => {
    const loadAllCompaniesLight = async () => {
      try {
        const lightCompanies = await companiesService.getAllCompaniesLight();
        setAllCompaniesLight(lightCompanies);
      } catch (error) {
        console.error('Error loading all companies light:', error);
      }
    };
    if (user?.role === 'superAdmin') {
      loadAllCompaniesLight();
    }
  }, [user?.role]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateForm = () => {
    const newErrors = {
      companyId: '',
      type: '',
      fromCollection: '',
      targetCollection: '',
      referenceKey: '',
      filters: '',
      updates: ''
    };

    if (!formData.companyId.trim()) {
      newErrors.companyId = t('common:validation.required');
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

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      await sortingRulesService.create(formData);
      // Navigate back to the list page
      navigate('/sorting-rules');
    } catch (error) {
      console.error('Error creating sorting rule:', error);
      // Show error message to user
      alert(t('sortingRules:messages.createError') || 'Failed to create sorting rule');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={t('sortingRules:create')} />
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header title={t('sortingRules:create')} />

      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6">
          <Button
            variant="secondary"
            onClick={() => navigate('/sorting-rules')}
            className="flex items-center gap-2 mb-4"
          >
            <ArrowLeft size={16} />
            {t('common:actions.back')}
          </Button>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('common:sections.basicInformation')}</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {user?.role === 'superAdmin' ? (
                <div>
                  <CompanySelector
                    companies={allCompaniesLight}
                    selectedCompanyId={formData.companyId}
                    onSelect={(companyId: string) => handleInputChange('companyId', companyId)}
                    placeholder={t('common:actions.select') + ' ' + t('sortingRules:fields.company')}
                    label={t('sortingRules:fields.company')}
                    error={errors.companyId}
                  />
                </div>
              ) : (
                <Input
                  label={t('sortingRules:fields.company')}
                  value={user?.companyName || ''}
                  disabled
                />
              )}

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
              disabled={loading}
            >
              <Save size={16} />
              {t('sortingRules:create')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
