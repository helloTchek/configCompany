import { ReactNode } from 'react';
import { ChevronUp, ChevronDown, GripVertical } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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
  onColumnReorder?: (activeId: string, overId: string) => void;
  className?: string;
  getRowClassName?: (row: T) => string;
}

interface SortableColumnHeaderProps<T = object> {
  column: Column<T>;
  sortKey: string | undefined;
  sortDirection: 'asc' | 'desc' | undefined;
  onSort: ((key: string) => void) | undefined;
  isDraggable: boolean;
}

function SortableColumnHeader<T = object>({
  column,
  sortKey,
  sortDirection,
  onSort,
  isDraggable,
}: SortableColumnHeaderProps<T>) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: column.key });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <th
      ref={setNodeRef}
      style={style}
      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
        column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
      } ${isDragging ? 'z-50' : ''}`}
    >
      <div className="flex items-center gap-2">
        {isDraggable && (
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing hover:text-gray-700 touch-none"
            onClick={(e) => e.stopPropagation()}
          >
            <GripVertical size={16} />
          </div>
        )}
        <div
          className="flex items-center gap-1 flex-1"
          onClick={() => column.sortable && onSort?.(column.key)}
        >
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
      </div>
    </th>
  );
}

export default function Table<T extends object>({
  columns,
  data,
  sortKey,
  sortDirection,
  onSort,
  onColumnReorder,
  className = '',
  getRowClassName
}: TableProps<T>) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      onColumnReorder?.(active.id as string, over.id as string);
    }
  };

  const columnIds = columns.map((col) => col.key);
  const isDraggable = !!onColumnReorder;

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-gray-50">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={columnIds}
              strategy={horizontalListSortingStrategy}
            >
              <tr>
                {columns.map((column) => (
                  <SortableColumnHeader<T>
                    key={column.key}
                    column={column}
                    sortKey={sortKey}
                    sortDirection={sortDirection}
                    onSort={onSort}
                    isDraggable={isDraggable}
                  />
                ))}
              </tr>
            </SortableContext>
          </DndContext>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row, rowIndex) => {
            const rowClassName = getRowClassName ? getRowClassName(row) : '';
            return (
              <tr key={rowIndex} className={`hover:bg-gray-50 ${rowClassName}`}>
                {columns.map((column) => {
                  const value = (row as Record<string, unknown>)[column.key];
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
