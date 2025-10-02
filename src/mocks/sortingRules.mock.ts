import type { SortingRule } from '../types';

export const mockSortingRules: SortingRule[] = [
  {
    id: '1',
    company: 'AutoCorp Insurance',
    type: 'detectionPhase',
    fromCollection: 'ROI',
    targetCollection: 'ROI',
    referenceKey: 'damageType',
    referencePrefix: 'DMG_',
    filters: '{"severity": {"$gte": 3}}',
    updates: '{"priority": "high"}',
    processingPriority: 1
  }
];