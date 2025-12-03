import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import Modal from '../../components/UI/Modal';
import CompanySelector from '../../components/UI/CompanySelector';
import { ArrowLeft, Download } from 'lucide-react';
import { costSettingsService } from '../../services/costSettingsService';
import { companiesService } from '../../services/companiesService';
import { Company } from '../../types';

export default function CreateCostMatrixPage() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingCompanies, setLoadingCompanies] = useState(true);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    companyId: '',
    currency: 'EUR',
    tax: 20,
  });
  const [errors, setErrors] = useState({
    name: '',
    companyId: '',
    currency: '',
    tax: ''
  });

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      setLoadingCompanies(true);
      const data = await companiesService.getAllCompaniesLight();
      setCompanies(data as unknown as Company[]);
    } catch (err) {
      console.error('Error loading companies:', err);
    } finally {
      setLoadingCompanies(false);
    }
  };

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
      companyId: '',
      currency: '',
      tax: ''
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Matrix name is required';
    }

    if (!formData.companyId.trim()) {
      newErrors.companyId = 'Company is required';
    }

    if (!formData.currency.trim()) {
      newErrors.currency = 'Currency is required';
    }

    if (formData.tax < 0 || formData.tax > 100) {
      newErrors.tax = 'Tax rate must be between 0 and 100';
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.companyId && !newErrors.currency && !newErrors.tax;
  };

  const handleCreateMatrix = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      const newCostSettings = await costSettingsService.createCostSettings({
        name: formData.name,
        companyId: formData.companyId,
        currency: formData.currency,
        tax: formData.tax,
      });

      alert('Cost matrix created successfully');
      navigate(`/cost-matrices/${newCostSettings.id}/edit`);
    } catch (err: any) {
      console.error('Error creating cost matrix:', err);
      alert(`Failed to create cost matrix: ${err.message}`);
    } finally {
      setLoading(false);
    }
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

            {/* Company */}
            <div>
              <CompanySelector
                companies={companies}
                selectedCompanyId={formData.companyId}
                onSelect={(companyId) => handleInputChange('companyId', companyId)}
                placeholder="Search for a company..."
                label="Company"
                error={errors.companyId}
                disabled={loadingCompanies}
              />
              {loadingCompanies && <p className="text-sm text-gray-500 mt-1">Loading companies...</p>}
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