import type { CostMatrix } from '../types';

export const mockCostMatrices: CostMatrix[] = [
  {
    id: '1',
    company: 'AutoCorp Insurance',
    tax: 20,
    currency: 'EUR',
    parts: [
      { 
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
      },
      { 
        partTypeCode: 'carbody',
        partCode: 'PRT',
        locationCode: 'AVG',
        partNameEn: 'Door',
        locationEn: 'Front Left',
        conditionLabelEn: 'scratched',
        severity: 'SEV3',
        repairTypeEn: 'Painting',
        costBeforeTax: 320,
        partNameFr: 'PORTE',
        locationFr: 'Avant Gauche',
        conditionLabelFr: 'Rayé',
        repairTypeFr: 'Peinture',
        conditionCode: 'scratched',
        repairCode: 'painting'
      }
    ]
  }
];