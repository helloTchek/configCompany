// Application constants

export const CONTRACT_TYPES = [
  { value: 'Client', label: 'Client' },
  { value: 'Prospect', label: 'Prospect' },
  { value: 'Test', label: 'Test' },
  { value: 'Demo', label: 'Demo' },
] as const;

export const BUSINESS_SECTORS = [
  { value: 'Insurance', label: 'Insurance' },
  { value: 'Leasing', label: 'Leasing' },
  { value: 'Rental', label: 'Rental' },
  { value: 'Fleet Management', label: 'Fleet Management' },
  { value: 'Automotive', label: 'Automotive' },
] as const;

export const USER_ROLES = [
  { value: 'user', label: 'User' },
  { value: 'admin', label: 'Admin' },
  { value: 'superadmin', label: 'Super Admin' },
] as const;

export const USER_STATUSES = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
] as const;

export const CURRENCIES = [
  { value: 'EUR', label: 'EUR (€)', symbol: '€' },
  { value: 'USD', label: 'USD ($)', symbol: '$' },
  { value: 'GBP', label: 'GBP (£)', symbol: '£' },
] as const;

export const SEVERITY_LEVELS = [
  { value: 'SEV1', label: 'SEV1 (Minor)', color: 'bg-green-100 text-green-800' },
  { value: 'SEV2', label: 'SEV2 (Light)', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'SEV3', label: 'SEV3 (Moderate)', color: 'bg-orange-100 text-orange-800' },
  { value: 'SEV4', label: 'SEV4 (Major)', color: 'bg-red-100 text-red-800' },
  { value: 'SEV5', label: 'SEV5 (Severe)', color: 'bg-red-200 text-red-900' },
] as const;

export const JOURNEY_BLOCK_TYPES = [
  { 
    value: 'form', 
    label: 'Form Block', 
    description: 'Custom form with JSON configuration' 
  },
  { 
    value: 'shootInspect', 
    label: 'Shoot Inspection Block', 
    description: 'Photo capture workflow' 
  },
  { 
    value: 'fastTrack', 
    label: 'Fast Track Block', 
    description: 'Quick inspection process' 
  },
  { 
    value: 'addDamage', 
    label: 'Add Damage Block', 
    description: 'Manual damage reporting' 
  },
  { 
    value: 'static', 
    label: 'Static Screen Block', 
    description: 'Static content screens (onboarding/offboarding)' 
  },
] as const;

export const SORTING_RULE_TYPES = [
  { value: 'detectionPhase', label: 'Detection Phase' },
  { value: 'validationPhase', label: 'Validation Phase' },
  { value: 'reportGeneration', label: 'Report Generation' },
] as const;

export const CHASEUP_RULE_TYPES = [
  { value: 'event', label: 'Event' },
  { value: 'anonymization', label: 'Anonymization' },
] as const;

export const PROCESSING_PRIORITIES = [
  { value: 1, label: '1 - Highest Priority' },
  { value: 2, label: '2 - High Priority' },
  { value: 3, label: '3 - Medium Priority' },
  { value: 4, label: '4 - Low Priority' },
  { value: 5, label: '5 - Lowest Priority' },
] as const;

export const MAX_SENDINGS_OPTIONS = [
  { value: 0, label: '0' },
  { value: 1, label: '1' },
  { value: 2, label: '2' },
] as const;

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
  { code: 'no', name: 'Norsk', flag: '🇳🇴' },
] as const;

export const VEHICLE_PARTS = [
  { code: 'PRC', nameEn: 'Bumper', nameFr: 'PARE-CHOC' },
  { code: 'PRT', nameEn: 'Door', nameFr: 'PORTE' },
  { code: 'JNA', nameEn: 'Aluminum rim', nameFr: 'JANTE ALLUMINIUM' },
  { code: 'JNT', nameEn: 'Steel rim', nameFr: 'JANTE TOLE' },
  { code: 'ENJ', nameEn: 'Hubcap', nameFr: 'ENJOLIVEUR' },
  { code: 'RTR', nameEn: 'Mirror', nameFr: 'RÉTROVISEUR' },
  { code: 'AIL', nameEn: 'Wing', nameFr: 'AILE' },
  { code: 'CAP', nameEn: 'Hood', nameFr: 'CAPOT' },
  { code: 'HAY', nameEn: 'Tailgate', nameFr: 'HAYON' },
  { code: 'TOI', nameEn: 'Roof', nameFr: 'TOIT' },
  { code: 'BAS', nameEn: 'Rocker panel', nameFr: 'BAS DE CAISSE' },
  { code: 'GRI', nameEn: 'Grille', nameFr: 'GRILLE' },
  { code: 'OPT', nameEn: 'Headlight', nameFr: 'OPTIQUE' },
  { code: 'PLQ', nameEn: 'License plate', nameFr: 'PLAQUE' },
] as const;

export const VEHICLE_LOCATIONS = [
  { code: 'AV', nameEn: 'Front', nameFr: 'Avant' },
  { code: 'AR', nameEn: 'Rear', nameFr: 'Arrière' },
  { code: 'AVG', nameEn: 'Front Left', nameFr: 'Avant Gauche' },
  { code: 'AVD', nameEn: 'Front Right', nameFr: 'Avant Droite' },
  { code: 'ARG', nameEn: 'Rear Left', nameFr: 'Arrière Gauche' },
  { code: 'ARD', nameEn: 'Rear Right', nameFr: 'Arrière Droite' },
  { code: 'G', nameEn: 'Left', nameFr: 'Gauche' },
  { code: 'D', nameEn: 'Right', nameFr: 'Droite' },
  { code: 'C', nameEn: 'Center', nameFr: 'Centre' },
  { code: 'SUP', nameEn: 'Top', nameFr: 'Supérieur' },
  { code: 'INF', nameEn: 'Bottom', nameFr: 'Inférieur' },
] as const;

export const CHASEUP_VARIABLES = [
  { key: '{{customerName}}', name: 'Customer Name' },
  { key: '{{customerEmail}}', name: 'Customer Email' },
  { key: '{{customerPhone}}', name: 'Customer Phone' },
  { key: '{{inspectionId}}', name: 'Inspection ID' },
  { key: '{{inspectionLink}}', name: 'Inspection Link' },
  { key: '{{vehicleMake}}', name: 'Vehicle Make' },
  { key: '{{vehicleModel}}', name: 'Vehicle Model' },
  { key: '{{licensePlate}}', name: 'License Plate' },
  { key: '{{companyName}}', name: 'Company Name' },
  { key: '{{agentName}}', name: 'Agent Name' },
  { key: '{{inspectionDate}}', name: 'Inspection Date' },
  { key: '{{trackingUrl}}', name: 'Tracking URL' },
] as const;

// Default values
export const DEFAULT_VALUES = {
  company: {
    retentionPeriod: 24,
    maxApiRequests: 5000,
    tax: 20,
    currency: 'EUR',
  },
  user: {
    role: 'user',
    status: 'active',
  },
  journey: {
    isActive: true,
  },
  sortingRule: {
    processingPriority: 3,
  },
  chaseupRule: {
    type: 'event',
    maxSendings: 1,
    utcSendingTime: { hour: 9, minute: 0 },
  },
} as const;