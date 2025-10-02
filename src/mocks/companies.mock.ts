import type { Company } from '../types';

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
    costSettings: ['bodywork', 'interior', 'mechanical'],
    isArchived: false
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
    isArchived: false
  }
];