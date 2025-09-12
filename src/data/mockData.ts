import { Company, User, InspectionJourney, SortingRule, CostMatrix } from '../types';

export const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'AutoCorp Insurance',
    identifier: 'AC001',
    apiToken: 'ac_tk_abc123def456',
    currentApiRequests: 2450,
    maxApiRequests: 5000,
    requestsExpiryDate: '2025-12-31',
    companyCode: 'AUTOCORP',
    parentCompany: undefined,
    childrenCount: 3,
    contractType: 'Client',
    businessSector: 'Insurance',
    logoUrl: 'https://images.pexels.com/photos/164686/pexels-photo-164686.jpeg?auto=compress&cs=tinysrgb&w=100',
    retentionPeriod: 24,
    disableFastTrack: false,
    styles: '{"report":{"backgroundColor":"#252387","costsBackgroundColor":"#6A68D4","costsTextColor":"#000000","costsInfoColor":"#252387","topRightHorizontalBarColor":"#252387","borderColor":"#6a68d4"},"shootInspect":{"overlayColor":"#1adf6c"},"globalTheme":{"primaryColor":"#323276","primaryTextColor":"#ffffff","accentColor":"#1adf6c","accentTextColor":"ffffff","dominantColor":"#151841","dominantTextColor":"#ffffff","isDarkTheme":true}}',
    reportSettings: '{"picturesPreSelected":"true","showDamage":"true","showGallery":"true","showNewDamage":"true","showState":"true","oldDamages":true,"checkDamages":true,"isCarDealership":true,"showWatermark":false,"prefix":"","selectorSens":"clockwise","selectorSvgColor":"repairSeverity","selectorSvg":"renault","state":{"checklist":true,"picturesPreSelected":true,"showCost":true,"showSeverity":true,"signatory":true,"vehicleDetails":true,"croppImages":true,"signing":false,"notes":true,"tchekScan":true},"simple":{"signatory":true,"picturesPreSelected":true,"showCost":true,"showSeverity":true,"vehicleDetails":true,"croppImages":true},"specificSectionsConfig":{"withCosts":{"intro":{"visible":true,"showTopRightHorizontalBar":true},"signatoryAndVehicle":{"visible":true,"showEmptyFields":false},"estimatedCosts":{"visible":true},"preselectedPictures":{"visible":true},"gallery":{"visible":true,"showMiniatures":true,"showActionButton":true},"vehicleStateWithoutComparison":{"visible":true},"vehicleStateWithComparison":{"visible":true},"newDamages":{"visible":true},"damageDetails":{"visible":true},"damageInterior":{"visible":true},"exteriorElements":{"visible":true},"additionalElements":{"visible":true},"clientNotes":{"visible":true},"tchekScan":{"visible":true},"signing":{"visible":false},"footer":{"visible":true},"severityDetailsConfig":{"showCrop":true,"showCropId":false,"showCropScore":false,"showCropType":true,"showCropRoi":true,"showRois":true}},"withoutCosts":{"intro":{"visible":true,"showTopRightHorizontalBar":true},"signatoryAndVehicle":{"visible":true,"showEmptyFields":false},"estimatedCosts":{"visible":false},"preselectedPictures":{"visible":true},"gallery":{"visible":true,"showMiniatures":true,"showActionButton":true},"vehicleStateWithoutComparison":{"visible":true},"vehicleStateWithComparison":{"visible":true},"newDamages":{"visible":true},"damageDetails":{"visible":true},"damageInterior":{"visible":true},"exteriorElements":{"visible":true},"additionalElements":{"visible":true},"clientNotes":{"visible":true},"tchekScan":{"visible":true},"signing":{"visible":false},"footer":{"visible":true},"severityDetailsConfig":{"showCrop":true,"showCropId":false,"showCropScore":false,"showCropType":true,"showCropRoi":true,"showRois":true}}}}',
    configModules: '{"fastTrack":{"canWearAndTear":true,"deletedStatusEnabled":false,"validatedStatusEnabled":true,"wearAndTearStatusEnabled":true,"editionMode":true,"zoomConfig":{"minDamageCropMargin":0.3,"regularWidthMargin":1.4,"regularHeightMargin":1.4,"strokeWidthScale":5}},"shootInspect":{"autoFinalizationEnabled":false,"autoFinalizationThreshold":2},"global":{"modelIA":"codeter_ensembling"},"endInspect":{"npsEnabled":true,"npsDelay":3000}}',
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