import type { Company } from '@/types/entities';

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
    reportSettings: '{"picturesPreSelected":"true","showDamage":"true","showGallery":"true","showNewDamage":"true","showState":"true","oldDamages":true,"checkDamages":true,"isCarDealership":true,"showWatermark":false,"prefix":"","selectorSens":"clockwise","selectorSvgColor":"repairSeverity","selectorSvg":"renault"}',
    configModules: '{"fastTrack":{"canWearAndTear":true,"deletedStatusEnabled":false,"validatedStatusEnabled":true,"wearAndTearStatusEnabled":true,"editionMode":true,"zoomConfig":{"minDamageCropMargin":0.3,"regularWidthMargin":1.4,"regularHeightMargin":1.4,"strokeWidthScale":5}},"shootInspect":{"autoFinalizationEnabled":false,"autoFinalizationThreshold":2},"global":{"modelIA":"codeter_ensembling"},"endInspect":{"npsEnabled":true,"npsDelay":3000}}',
    costSettings: ['bodywork', 'interior', 'mechanical'],
    isArchived: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'FleetMax Leasing',
    identifier: 'FM002',
    apiToken: 'fm_tk_xyz789ghi012',
    currentApiRequests: 1200,
    maxApiRequests: 3000,
    requestsExpiryDate: '2025-11-30',
    companyCode: 'FLEETMAX',
    parentCompany: '1',
    childrenCount: 1,
    contractType: 'Client',
    businessSector: 'Leasing',
    retentionPeriod: 18,
    disableFastTrack: true,
    costSettings: ['bodywork', 'mechanical'],
    isArchived: false,
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-14T14:22:00Z'
  }
];