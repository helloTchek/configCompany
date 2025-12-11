import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../../components/Layout/Header';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import Modal from '../../components/UI/Modal';
import { ArrowLeft, Save, Download, Upload, Trash2, AlertTriangle } from 'lucide-react';
import { CostSettings, CostParam } from '../../types';
import { costSettingsService } from '../../services/costSettingsService';
import * as XLSX from 'xlsx';

const severityColors: Record<string, string> = {
  'SEV1': 'bg-green-100 text-green-800',
  'SEV2': 'bg-yellow-100 text-yellow-800',
  'SEV3': 'bg-orange-100 text-orange-800',
  'SEV4': 'bg-red-100 text-red-800',
  'SEV5': 'bg-red-200 text-red-900'
};

const getCurrencySymbol = (currencyCode: string): string => {
  const symbols: Record<string, string> = {
    'EUR': '€',
    'USD': '$',
    'GBP': '£',
    '€': '€',
    '$': '$',
    '£': '£'
  };
  return symbols[currencyCode] || currencyCode;
};

const getCurrencyCode = (currencySymbol: string): string => {
  const codes: Record<string, string> = {
    '€': 'EUR',
    '$': 'USD',
    '£': 'GBP',
    'EUR': 'EUR',
    'USD': 'USD',
    'GBP': 'GBP'
  };
  return codes[currencySymbol] || currencySymbol;
};

export default function EditCostMatrixPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [costSettings, setCostSettings] = useState<CostSettings | null>(null);
  const [costParams, setCostParams] = useState<CostParam[]>([]);
  const [editedParams, setEditedParams] = useState<Record<string, { cost: number; validated: boolean }>>({});
  const [importing, setImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importResult, setImportResult] = useState<{ success: boolean; created: number; errors: any[] } | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    currency: 'EUR',
    tax: 20,
  });
  const [errors, setErrors] = useState({
    name: '',
    currency: '',
    tax: ''
  });
  const [filterByPart, setFilterByPart] = useState('');
  const [filterByLocation, setFilterByLocation] = useState('');
  const [filterBySeverity, setFilterBySeverity] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (id) {
      loadData();
    }
  }, [id]);

  const loadData = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);

      const [settings, params] = await Promise.all([
        costSettingsService.getCostSettingsById(id),
        costSettingsService.getCostParams(id)
      ]);

      if (!settings) {
        setError('Cost matrix not found');
        setTimeout(() => navigate('/cost-matrices'), 2000);
        return;
      }

      setCostSettings(settings);
      setCostParams(params);
      setFormData({
        name: settings.className || settings.name || '',
        currency: getCurrencyCode(settings.currency), // Convert symbol to code for select
        tax: settings.tax,
      });
    } catch (err: any) {
      console.error('Error loading cost matrix:', err);
      setError(err.message || 'Failed to load cost matrix');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleParamChange = (paramId: string, field: 'cost' | 'validated', value: number | boolean) => {
    setEditedParams(prev => ({
      ...prev,
      [paramId]: {
        cost: field === 'cost' ? value as number : (prev[paramId]?.cost ?? costParams.find(p => p.id === paramId)?.cost ?? 0),
        validated: field === 'validated' ? value as boolean : (prev[paramId]?.validated ?? costParams.find(p => p.id === paramId)?.validated ?? false)
      }
    }));
  };

  const validateForm = () => {
    const newErrors = {
      name: '',
      currency: '',
      tax: ''
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Matrix name is required';
    }

    if (!formData.currency.trim()) {
      newErrors.currency = 'Currency is required';
    }

    if (formData.tax < 0 || formData.tax > 100) {
      newErrors.tax = 'Tax rate must be between 0 and 100';
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.currency && !newErrors.tax;
  };

  const handleSave = async () => {
    if (!validateForm() || !id) {
      return;
    }

    try {
      // Update cost settings
      await costSettingsService.updateCostSettings(id, {
        name: formData.name,
        currency: formData.currency,
        tax: formData.tax,
      });

      // Update edited cost params
      const updatePromises = Object.entries(editedParams).map(([paramId, data]) =>
        costSettingsService.updateCostParam(paramId, data)
      );
      await Promise.all(updatePromises);

      const updatedParamsCount = Object.keys(editedParams).length;
      alert(`Cost matrix updated successfully!${updatedParamsCount > 0 ? `\n\n${updatedParamsCount} cost param(s) updated.` : ''}`);
      navigate('/cost-matrices');
    } catch (err: any) {
      console.error('Error saving cost matrix:', err);
      alert(`Failed to save cost matrix: ${err.message}`);
    }
  };

  const handleDelete = async () => {
    if (!id) return;

    try {
      setDeleting(true);
      const result = await costSettingsService.deleteAllCostParams(id);
      setShowDeleteModal(false);

      // Reload data to show empty list
      await loadData();

      alert(`${result.deleted} paramètres de coûts supprimés avec succès`);
    } catch (err: any) {
      console.error('Error deleting cost params:', err);
      alert(`Échec de la suppression: ${err.message}`);
    } finally {
      setDeleting(false);
    }
  };

  const handleDownloadXlsx = () => {
    if (!costParams.length || !costSettings) return;

    const headers = [
      'Vehicle Part',
      'Vehicle Part Code',
      'Location',
      'Location Code',
      'Severity Level',
      'Severity Type',
      'Cost',
      'Validated',
      'Question',
      'Answer'
    ];

    // Prepare data rows
    const data = costParams.map(param => [
      param.vehiclePart.label,
      param.vehiclePart.code,
      param.vehiclePartLocation.codeEN,
      param.vehiclePartLocation.identifier,
      param.severityType.levelNb,
      param.severityType.label,
      editedParams[param.id]?.cost ?? param.cost,
      editedParams[param.id]?.validated ?? param.validated ? 'Yes' : 'No',
      param.question || '',
      param.answer || ''
    ]);

    // Create worksheet with headers and data
    const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);

    // Auto-size columns
    const colWidths = headers.map((_, i) => {
      const maxLen = Math.max(
        headers[i]?.length || 0,
        ...data.map(row => String(row[i] || '').length)
      );
      return { wch: Math.min(maxLen + 2, 50) };
    });
    ws['!cols'] = colWidths;

    // Create workbook and add worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Cost Matrix');

    // Generate file name and download
    const fileName = (costSettings.className || costSettings.name || 'cost-matrix').toLowerCase().replace(/\s+/g, '-');
    XLSX.writeFile(wb, `${fileName}-cost-matrix.xlsx`);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !id) return;

    setImporting(true);
    setImportProgress(0);
    setImportResult(null);

    // Simulate progress during import (estimated based on file size)
    const progressInterval = setInterval(() => {
      setImportProgress((prev) => {
        if (prev >= 90) return prev; // Cap at 90% until actual completion
        return prev + 5;
      });
    }, 200);

    try {
      const result = await costSettingsService.importCostParamsFromExcel(id, file);

      // Complete progress
      clearInterval(progressInterval);
      setImportProgress(100);
      setImportResult(result);

      if (result.success) {
        setTimeout(() => {
          alert(`Import réussi: ${result.created} paramètres de coûts importés!${result.errors.length > 0 ? `\n\nAttention: ${result.errors.length} lignes avec erreurs.` : ''}`);
        }, 300);

        // Reload cost params after successful import
        await loadData();
      }
    } catch (err: any) {
      clearInterval(progressInterval);
      console.error('Error importing Excel file:', err);
      alert(`Échec de l'import: ${err.message}`);
    } finally {
      setTimeout(() => {
        setImporting(false);
        setImportProgress(0);
      }, 500);

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const filteredParams = costParams.filter(param => {
    const matchesPart = !filterByPart ||
      param.vehiclePart.label.toLowerCase().includes(filterByPart.toLowerCase()) ||
      param.vehiclePart.code.toLowerCase().includes(filterByPart.toLowerCase());
    const matchesLocation = !filterByLocation ||
      param.vehiclePartLocation.codeEN.toLowerCase().includes(filterByLocation.toLowerCase()) ||
      param.vehiclePartLocation.identifier.toLowerCase().includes(filterByLocation.toLowerCase());
    const matchesSeverity = !filterBySeverity ||
      param.severityType.level === filterBySeverity;
    return matchesPart && matchesLocation && matchesSeverity;
  });

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={t('costs:messages.loading')} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading cost matrix...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !costSettings) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={t('common:error')} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error || 'Cost matrix not found'}</p>
            <Button onClick={() => navigate('/cost-matrices')}>
              Back to Cost Matrices
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const companyName = costSettings.companyPtr?.className || costSettings.companyPtr?.name || costSettings.companyName || 'N/A';

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header title={t('costs:modals.editTitle', { name: formData.name })} />

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
          {/* Header with cost settings info */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{formData.name}</h2>
                <p className="text-gray-600">Company: {companyName}</p>
                <p className="text-sm text-gray-500">Last updated: {formatDate(costSettings.updatedAt)}</p>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="text-center">
                  <div className="font-semibold text-gray-900">{formData.tax}%</div>
                  <div className="text-gray-600">Tax Rate</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900">{costSettings?.currency || getCurrencySymbol(formData.currency)}</div>
                  <div className="text-gray-600">Currency</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-2 justify-center">
                    <div>
                      <div className="font-semibold text-gray-900">{costParams.length}</div>
                      <div className="text-gray-600">Cost Entries</div>
                    </div>
                    {costParams.length > 0 && (
                      <button
                        onClick={() => setShowDeleteModal(true)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Supprimer tous les paramètres de coûts"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  onClick={handleDownloadXlsx}
                  className="flex items-center gap-2"
                  size="sm"
                >
                  <Download size={16} />
                  Download XLSX
                </Button>
                <Button
                  variant="primary"
                  onClick={handleImportClick}
                  className="flex items-center gap-2"
                  size="sm"
                  disabled={importing}
                >
                  <Upload size={16} />
                  {importing ? `Import en cours... ${importProgress}%` : 'Import from Excel'}
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              {/* Progress Bar */}
              {importing && (
                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${importProgress}%` }}
                  ></div>
                </div>
              )}
            </div>
          </div>

          {/* Matrix Settings */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Matrix Settings</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Input
                label="Matrix Name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                error={errors.name}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                <select
                  value={formData.currency}
                  onChange={(e) => handleInputChange('currency', e.target.value)}
                  className={`block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.currency ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="EUR">EUR (€)</option>
                  <option value="USD">USD ($)</option>
                  <option value="GBP">GBP (£)</option>
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

          {/* Filters */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
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
                  <option value="SEV1">Minor</option>
                  <option value="SEV2">Light</option>
                  <option value="SEV3">Moderate</option>
                  <option value="SEV4">Major</option>
                  <option value="SEV5">Severe</option>
                </select>
              </div>
            </div>
          </div>

          {/* Cost Params Table */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Cost Entries</h3>
              <p className="text-sm text-gray-600">
                Showing {filteredParams.length} of {costParams.length} entries
              </p>
            </div>

            <div className="overflow-x-auto">
              {filteredParams.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No cost entries found</p>
                </div>
              ) : (
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">VEHICLE PART</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">LOCATION</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">SEVERITY TYPE</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">COST</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">VALIDATED</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredParams.map((param) => (
                      <tr key={param.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium text-gray-900">{param.vehiclePart.label}</div>
                            <div className="text-xs text-gray-500">Code: {param.vehiclePart.code}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium text-gray-900">{param.vehiclePartLocation.codeEN}</div>
                            <div className="text-xs text-gray-500">{param.vehiclePartLocation.identifier}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="space-y-1">
                            <div className="font-medium text-gray-900">{param.severityType.label}</div>
                            <span
                              className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                                severityColors[param.severityType.level] || 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              Level {param.severityType.levelNb}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={editedParams[param.id]?.cost ?? param.cost}
                              onChange={(e) => handleParamChange(param.id, 'cost', parseFloat(e.target.value) || 0)}
                              className="block w-24 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                              min="0"
                              step="0.01"
                            />
                            <span className="text-sm text-gray-600">{costSettings?.currency || getCurrencySymbol(formData.currency)}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="checkbox"
                            checked={editedParams[param.id]?.validated ?? param.validated}
                            onChange={(e) => handleParamChange(param.id, 'validated', e.target.checked)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
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

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirmer la suppression"
        size="md"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Supprimer tous les paramètres de coûts ?
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Vous êtes sur le point de supprimer <span className="font-semibold">{costParams.length} paramètres de coûts</span> de la matrice "{formData.name}".
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-800">
                  <strong>Cette action est irréversible.</strong> Tous les cost entries seront supprimés, mais la matrice de coûts elle-même sera conservée. Vous pourrez réimporter des données par la suite.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
              disabled={deleting}
            >
              Annuler
            </Button>
            <Button
              onClick={handleDelete}
              disabled={deleting}
              className="!bg-red-600 hover:!bg-red-700 !text-white"
            >
              {deleting ? 'Suppression...' : 'Supprimer les cost entries'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
