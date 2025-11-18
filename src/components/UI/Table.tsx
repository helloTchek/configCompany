import { ReactNode } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

export interface Column<T = object> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: unknown, row: T) => ReactNode;
}

export interface TableProps<T = object> {
  columns: Column<T>[];
  data: T[];
  sortKey?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (key: string) => void;
  className?: string;
  getRowClassName?: (row: T) => string;
}

export default function Table<T extends object>({
  columns,
  data,
  sortKey,
  sortDirection,
  onSort,
  className = '',
  getRowClassName
}: TableProps<T>) {
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
          {data.map((row, rowIndex) => {
            const rowClassName = getRowClassName ? getRowClassName(row) : '';
            return (
              <tr key={rowIndex} className={`hover:bg-gray-50 ${rowClassName}`}>
                {columns.map((column) => {
                  const value = row[column.key];
                  const content = column.render ? column.render(value, row) : value;
                  return (
                    <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {content as ReactNode}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}