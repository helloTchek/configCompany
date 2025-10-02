import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import Button from '../../components/UI/Button';
import { costMatrixService } from '../../services';
import { CostMatrix } from '../../types';
import { CreditCard as Edit, Download, Copy, Trash2, Plus, Eye } from 'lucide-react';
import showToast from '../../components/ui/Toast';

export default function CostMatricesPage() {
  const navigate = useNavigate();
  const [matrices, setMatrices] = useState<CostMatrix[]>([]);
  const [loading, setLoading] = useState(true);

  // Load cost matrices data
  const loadMatrices = async () => {
    try {
      setLoading(true);
      const data = await costMatrixService.getAll();
      setMatrices(data);
    } catch (error) {
      console.error('Failed to load cost matrices:', error);
      showToast.error('Failed to load cost matrices');
    } finally {
      setLoading(false);
    }
  };

  // Load matrices on mount
  useEffect(() => {
    loadMatrices();
  }, []);

  const handleDownloadTemplate = () => {
    // Create CSV template
    const csvContent = "Part Type,Location,Severity,Cost\nFront Bumper,Front,Minor,450\nDoor Panel,Side,Major,850";
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cost-matrix-template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleDuplicate = (matrix: CostMatrix) => {
    const newCompanyName = prompt('Enter company name for the duplicated matrix:');
    if (!newCompanyName) return;

    costMatrixService.duplicate(matrix.id, newCompanyName)
      .then(() => {
        showToast.success('Cost matrix duplicated successfully');
        loadMatrices(); // Refresh the list
      })
      .catch((error) => {
        console.error('Failed to duplicate matrix:', error);
        showToast.error('Failed to duplicate matrix');
      });
  };

  const handleDelete = (matrix: CostMatrix) => {
    if (confirm(`Are you sure you want to delete the cost matrix for ${matrix.company}?`)) {
      costMatrixService.delete(matrix.id)
        .then(() => {
          showToast.success('Cost matrix deleted successfully');
          loadMatrices(); // Refresh the list
        })
        .catch((error) => {
          console.error('Failed to delete matrix:', error);
          showToast.error('Failed to delete matrix');
        });
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header title="Repair Costs Management" />
      
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Repair Costs Management</h2>
            <p className="text-sm text-gray-600">Manage cost matrices for vehicle repair estimates</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={handleDownloadTemplate}
              className="flex items-center gap-2"
            >
              <Download size={16} />
              Download Template
            </Button>
            <Button
              onClick={() => navigate('/cost-matrices/new')}
              className="flex items-center gap-2"
            >
              <Plus size={16} />
              Create Matrix
            </Button>
          </div>
        </div>

        {/* Cost Matrices Section */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Cost Matrices</h3>
            <p className="text-sm text-gray-600">Select and manage your repair cost matrices</p>
          </div>

          <div className="p-6">
            {loading && (
              <div className="flex justify-center items-center h-32">
                <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">MATRIX</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">CURRENCY & TAX</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">ENTRIES</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">STATUS</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">LAST UPDATED</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {matrices.map((matrix) => (
                    <tr key={matrix.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium text-gray-900">{matrix.company.toUpperCase()}</div>
                          <div className="text-sm text-gray-600">Standard cost matrix for this company</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium text-gray-900">{matrix.currency}</div>
                          <div className="text-sm text-gray-600">Tax: {matrix.tax}%</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-900">{matrix.parts.length}</div>
                        <div className="text-sm text-gray-600">Cost entries</div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                          Active
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-gray-900">14/01/2024</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => navigate(`/cost-matrices/${matrix.id}/view`)}
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            title="View"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => navigate(`/cost-matrices/${matrix.id}/edit`)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDuplicate(matrix)}
                            className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                            title="Duplicate"
                          >
                            <Copy size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(matrix)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}