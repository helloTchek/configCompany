import type { SortingRule } from '@/types/entities';

export const mockSortingRules: SortingRule[] = [
  {
    id: '1',
    company: 'FleetMax Leasing',
    type: 'detectionPhase',
    fromCollection: 'ROI',
    targetCollection: 'ROI',
    referenceKey: 'damageType',
    referencePrefix: 'DMG_',
    filters: '{"severity": {"$gte": 3}}',
    updates: '{"priority": "high"}',
    processingPriority: 1,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  }
];