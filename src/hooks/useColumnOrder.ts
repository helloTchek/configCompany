import { useState, useEffect, useCallback } from 'react';
import { Column } from '../components/UI/Table';

export function useColumnOrder<T = object>(
  storageKey: string,
  defaultColumns: Column<T>[]
) {
  const [orderedColumns, setOrderedColumns] = useState<Column<T>[]>(() => {
    const savedOrder = localStorage.getItem(storageKey);
    if (savedOrder) {
      try {
        const savedKeys = JSON.parse(savedOrder) as string[];
        const reordered: Column<T>[] = [];
        const columnMap = new Map(defaultColumns.map(col => [col.key, col]));

        savedKeys.forEach(key => {
          const column = columnMap.get(key);
          if (column) {
            reordered.push(column);
            columnMap.delete(key);
          }
        });

        columnMap.forEach(column => {
          reordered.push(column);
        });

        return reordered.length > 0 ? reordered : defaultColumns;
      } catch {
        return defaultColumns;
      }
    }
    return defaultColumns;
  });

  useEffect(() => {
    const columnKeys = orderedColumns.map(col => col.key);
    localStorage.setItem(storageKey, JSON.stringify(columnKeys));
  }, [orderedColumns, storageKey]);

  const handleReorder = useCallback((activeId: string, overId: string) => {
    setOrderedColumns(columns => {
      const oldIndex = columns.findIndex(col => col.key === activeId);
      const newIndex = columns.findIndex(col => col.key === overId);

      if (oldIndex === -1 || newIndex === -1) return columns;

      const newColumns = [...columns];
      const [movedColumn] = newColumns.splice(oldIndex, 1);
      newColumns.splice(newIndex, 0, movedColumn);

      return newColumns;
    });
  }, []);

  const resetOrder = useCallback(() => {
    setOrderedColumns(defaultColumns);
    localStorage.removeItem(storageKey);
  }, [defaultColumns, storageKey]);

  return {
    orderedColumns,
    handleReorder,
    resetOrder,
  };
}
