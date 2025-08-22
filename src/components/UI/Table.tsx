import React, { ReactNode } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: any) => ReactNode;
}

interface TableProps {
  columns: Column[];
  data: any[];
  sortKey?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (key: string) => void;
  className?: string;
}

export default function Table({ 
  columns, 
  data, 
  sortKey, 
  sortDirection, 
  onSort,
  className = '' 
}: TableProps) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                  column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                }`}
                onClick={() => column.sortable && onSort?.(column.key)}
              >
                <div className="flex items-center gap-1">
                  {column.label}
                  {column.sortable && (
                    <div className="flex flex-col">
                      <ChevronUp 
                        size={12} 
                        className={`${
                          sortKey === column.key && sortDirection === 'asc' 
                            ? 'text-blue-600' 
                            : 'text-gray-400'
                        }`} 
                      />
                      <ChevronDown 
                        size={12} 
                        className={`${
                          sortKey === column.key && sortDirection === 'desc' 
                            ? 'text-blue-600' 
                            : 'text-gray-400'
                        }`} 
                      />
                    </div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {columns.map((column) => (
                <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}