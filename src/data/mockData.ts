import { Company, User, InspectionJourney, SortingRule, CostMatrix } from '../types';

export const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'AutoCorp Insurance',
    identifier: 'AC001',
    apiToken: 'ac_tk_abc123def456',
    currentApiRequests: 2450,
    maxApiRequests: 5000,
    requestsExpiryDate: '2024-12-31',
    companyCode: 'AUTOCORP',
    parentCompany: undefined,
    childrenCount: 3,
    contractType: 'Client',
    businessSector: 'Insurance',
    logoUrl: 'https://images.pexels.com/photos/164686/pexels-photo-164686.jpeg?auto=compress&cs=tinysrgb&w=100',
    retentionPeriod: 24,
    disableFastTrack: false,
    styles: '{"primaryColor": "#3B82F6", "secondaryColor": "#14B8A6"}',
    reportSettings: '{"includeImages": true, "format": "PDF"}',
    configModules: '{"damageDetection": true, "vinScanning": true}',
    costSettings: ['bodywork', 'interior', 'mechanical']
  },
  {
    id: '2',
    name: 'FleetMax Leasing',
    identifier: 'FM002',
    apiToken: 'fm_tk_xyz789ghi012',
    currentApiRequests: 1200,
    maxApiRequests: 3000,
    requestsExpiryDate: '2024-11-30',
    companyCode: 'FLEETMAX',
    parentCompany: '1',
    childrenCount: 1,
    contractType: 'Client',
    businessSector: 'Leasing',
    retentionPeriod: 18,
    disableFastTrack: true,
    costSettings: ['bodywork', 'mechanical']
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@autocorp.com',
    role: 'admin',
    company: 'AutoCorp Insurance',
    status: 'active',
    lastLogin: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@fleetmax.com',
    role: 'user',
    company: 'FleetMax Leasing',
    status: 'active',
    lastLogin: '2024-01-14T14:22:00Z'
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
        type: 'onboarding',
        name: 'Customer Onboarding',
        description: 'Collect customer information',
        config: { fields: ['name', 'email', 'phone'] },
        order: 1
      },
      {
        id: 'b2',
        type: 'shootInspection',
        name: 'Vehicle Photography',
        description: 'Capture vehicle images',
        config: { angles: ['front', 'back', 'sides'], mandatory: true },
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

export const mockCostMatrices: CostMatrix[] = [
  {
    id: '1',
    company: 'AutoCorp Insurance',
    tax: 20,
    currency: 'EUR',
    parts: [
      { partType: 'Front Bumper', location: 'Front', severity: 'Minor', cost: 450 },
      { partType: 'Front Bumper', location: 'Front', severity: 'Major', cost: 850 },
      { partType: 'Door Panel', location: 'Side', severity: 'Minor', cost: 320 }
    ]
  }
];