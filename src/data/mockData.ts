import { User, InspectionJourney, SortingRule, CostMatrix } from '../types';
import type { ChaseupRule } from '../types';


export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@autocorp.com',
    role: 'admin',
    company: 'AutoCorp Insurance',
    status: 'active'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@fleetmax.com',
    role: 'user',
    company: 'FleetMax Leasing',
    status: 'active'
  }
];

export const mockJourneys: InspectionJourney[] = [
  {
    id: '1',
    companyId: '1',
    name: 'Standard Vehicle Inspection',
    description: 'Complete vehicle inspection journey with all standard checks',
    blocks: [
      {
        id: 'b1',
        type: 'form',
        name: 'Customer Onboarding',
        description: 'Collect customer information',
        configId: 'form-1',
        order: 1
      },
      {
        id: 'b2',
        type: 'shootInspect',
        name: 'Vehicle Photography',
        description: 'Capture vehicle images',
        configId: 'shoot-1',
        order: 2
      }
    ],
    isActive: true
  }
];

export const mockSortingRules: SortingRule[] = [
  {
    id: '1',
    company: 'AutoCorp Insurance',
    companyId: '1',
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

export const mockChaseupRules: ChaseupRule[] = [
  {
    id: '1',
    company: 'AutoCorp Insurance',
    type: 'event',
    activationDate: '2024-01-01',
    utcSendingTime: {
      hour: 9,
      minute: 0
    },
    affectedStatuses: {
      inspectionCreated: true,
      inspectionInProgress: true,
      detectionFinished: false,
      damageReviewOngoing: false,
      completed: false,
      chasedUpManually: false
    },
    firstDelayDays: 1,
    secondDelayDays: 3,
    maxSendings: 2,
    firstReminder: {
      webhook: { enabled: true },
      user: {
        enabled: true,
        sms: true,
        email: true,
        templates: {
          en: {
            email: {
              subject: 'Inspection Reminder',
              content: 'Please complete your vehicle inspection.'
            },
            sms: {
              content: 'Reminder: Complete your inspection'
            }
          }
        }
      },
      customer: {
        enabled: true,
        sms: true,
        email: false,
        templates: {
          en: {
            email: { subject: '', content: '' },
            sms: { content: 'Your inspection is pending' }
          }
        }
      },
      emailAddress: {
        enabled: false,
        address: '',
        sms: false,
        email: false,
        templates: {
          en: {
            email: { subject: '', content: '' },
            sms: { content: '' }
          }
        }
      }
    },
    secondReminder: {
      webhook: { enabled: false },
      user: {
        enabled: true,
        sms: false,
        email: true,
        templates: {
          en: {
            email: {
              subject: 'Final Inspection Reminder',
              content: 'This is your final reminder to complete the inspection.'
            },
            sms: { content: '' }
          }
        }
      },
      customer: {
        enabled: true,
        sms: true,
        email: true,
        templates: {
          en: {
            email: {
              subject: 'Final Notice',
              content: 'Please complete your inspection immediately.'
            },
            sms: {
              content: 'Final reminder: Complete inspection now'
            }
          }
        }
      },
      emailAddress: {
        enabled: false,
        address: '',
        sms: false,
        email: false,
        templates: {
          en: {
            email: { subject: '', content: '' },
            sms: { content: '' }
          }
        }
      }
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  }
];