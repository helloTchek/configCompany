import { useState, useRef, useEffect } from 'react';
import { Search, X, ChevronDown } from 'lucide-react';

interface Company {
  id: string;
  objectId?: string;
  name: string;
  identifier?: string;
}

interface CompanySelectorProps {
  companies: Company[];
  selectedCompanyId: string;
  onSelect: (companyId: string) => void;
  excludeCompanyIds?: string[];
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
}

export default function CompanySelector({
  companies,
  selectedCompanyId,
  onSelect,
  excludeCompanyIds = [],
  placeholder = 'Search companies...',
  label,
  error,
  disabled = false
}: CompanySelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Get selected company name for display
  const selectedCompany = companies.find(c => (c.objectId || c.id) === selectedCompanyId);
  const displayValue = selectedCompany ? selectedCompany.name : searchTerm;

  // Filter companies based on search and exclusions
  const filteredCompanies = companies.filter(company => {
    const companyId = company.objectId || company.id;

    // Exclude specified companies
    if (excludeCompanyIds.includes(companyId)) return false;

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        company.name?.toLowerCase().includes(searchLower) ||
        company.identifier?.toLowerCase().includes(searchLower)
      );
    }

    return true;
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
        // Reset search term if no company selected
        if (!selectedCompanyId) {
          setSearchTerm('');
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selectedCompanyId]);

  const handleInputClick = () => {
    if (!disabled) {
      setShowDropdown(true);
      setSearchTerm('');
    }
  };

  const handleInputChange = (value: string) => {
    setSearchTerm(value);
    setShowDropdown(true);
    // Clear selection when typing
    if (selectedCompanyId) {
      onSelect('');
    }
  };

  const handleSelectCompany = (company: Company) => {
    const companyId = company.objectId || company.id;
    onSelect(companyId);
    setSearchTerm(company.name);
    setShowDropdown(false);
  };

  const handleClear = () => {
    onSelect('');
    setSearchTerm('');
    setShowDropdown(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={dropdownRef} className="relative">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />

        <input
          ref={inputRef}
          type="text"
          value={showDropdown ? searchTerm : displayValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onClick={handleInputClick}
          onFocus={handleInputClick}
          placeholder={placeholder}
          disabled={disabled}
          className={`pl-10 pr-20 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
            error ? 'border-red-500' : 'border-gray-300'
          } ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white cursor-text'}`}
        />

        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
          {selectedCompanyId && !disabled && (
            <button
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-600 p-1"
              type="button"
            >
              <X size={16} />
            </button>
          )}
          <ChevronDown
            size={16}
            className={`text-gray-400 transition-transform ${showDropdown ? 'transform rotate-180' : ''}`}
          />
        </div>
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}

      {/* Dropdown */}
      {showDropdown && !disabled && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((company) => {
              const companyId = company.objectId || company.id;
              const isSelected = companyId === selectedCompanyId;

              return (
                <div
                  key={companyId}
                  onClick={() => handleSelectCompany(company)}
                  className={`px-3 py-2 cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-blue-50 text-blue-700'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="font-medium">{company.name}</div>
                  {company.identifier && (
                    <div className="text-xs text-gray-500">{company.identifier}</div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="px-3 py-2 text-gray-500 text-sm">
              No companies found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
