import { useRef, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react';

export interface DropdownOption {
  value: string;
  label: string;
  subtitle?: string;
}

export interface SearchableDropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  onSearchChange: (search: string) => void;
  searchTerm: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  placeholder?: string;
  emptyMessage?: string;
  className?: string;
  error?: string;
  disabled?: boolean;
  showAllOption?: boolean;
  allOptionLabel?: string;
}

export default function SearchableDropdown({
  options,
  value,
  onChange,
  onSearchChange,
  searchTerm,
  isOpen,
  onOpenChange,
  placeholder = 'Search...',
  emptyMessage = 'No options found',
  className = '',
  error,
  disabled = false,
  showAllOption = false,
  allOptionLabel = 'All'
}: SearchableDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get display label
  const selectedOption = options.find(opt => opt.value === value);
  const displayValue = selectedOption?.label || searchTerm || '';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onOpenChange(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onOpenChange]);

  const handleSelect = (optionValue: string, optionLabel: string) => {
    onChange(optionValue);
    onSearchChange(optionLabel);
    onOpenChange(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div className="relative">
        <input
          type="text"
          value={displayValue}
          onChange={(e) => {
            onSearchChange(e.target.value);
            onOpenChange(true);
          }}
          onFocus={() => onOpenChange(true)}
          disabled={disabled}
          className={`block w-full px-3 py-2 pr-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            error ? 'border-red-500' : 'border-gray-300'
          } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
          placeholder={placeholder}
        />
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>

      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          {showAllOption && (
            <div
              onClick={() => handleSelect('', '')}
              className="px-3 py-2 hover:bg-blue-50 cursor-pointer border-b border-gray-100 font-medium text-gray-700"
            >
              {allOptionLabel}
            </div>
          )}

          {options.length === 0 && searchTerm && (
            <div className="px-3 py-2 text-sm text-gray-500">{emptyMessage}</div>
          )}

          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value, option.label)}
              className="px-3 py-2 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
            >
              <div className="font-medium text-sm text-gray-900">{option.label}</div>
              {option.subtitle && (
                <div className="text-xs text-gray-500">{option.subtitle}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
