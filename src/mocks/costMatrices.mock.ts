import type { CostMatrix } from '@/types/entities';

export const mockCostMatrices: CostMatrix[] = [
  {
    id: '1',
    company: 'AutoCorp Insurance',
    tax: 20,
    currency: 'EUR',
    parts: [
      { 
        id: 'part-1',
        partTypeCode: 'carbody',
        partCode: 'PRC',
        locationCode: 'AV',
        partNameEn: 'Bumper',
        locationEn: 'Front',
        conditionLabelEn: 'scuffed',
        severity: 'SEV1',
        repairTypeEn: 'Polish',
        costBeforeTax: 450,
        partNameFr: 'PARE-CHOC',
        locationFr: 'Avant',
        conditionLabelFr: 'Éraflé',
        repairTypeFr: 'Polish',
        conditionCode: 'scuffed',
        repairCode: 'polish'
      },
      { 
        id: 'part-2',
        partTypeCode: 'carbody',
        partCode: 'PRC',
        locationCode: 'AV',
        partNameEn: 'Bumper',
        locationEn: 'Front',
        conditionLabelEn: 'damaged',
        severity: 'SEV4',
        repairTypeEn: 'Sheet Metal Work and Painting',
        costBeforeTax: 850,
        partNameFr: 'PARE-CHOC',
        locationFr: 'Avant',
        conditionLabelFr: 'Endommagé',
        repairTypeFr: 'Tôlerie Peinture',
        conditionCode: 'damaged',
        repairCode: 'sheet_metal_work_and_painting'
      }
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  }
];