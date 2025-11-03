export interface Company {
  id: string;
  objectId?: string;
  name: string;
  identifier: string;
  apiToken: string;
  currentApiRequests: number;
  maxApiRequests: number;
  requestsExpiryDate: string;
  companyCode: string;
  parentCompanyId?: string;
  childCompanyIds?: string[];
  contractType: 'Client' | 'Prospect' | 'Test' | 'Demo';
  businessSector: string;
  logoUrl?: string;
  retentionPeriod: number;
  disableFastTrack: boolean;
  styles?: string;
  reportSettings?: string;
  configModules?: string;
  costSettings?: string[];
  isArchived?: boolean;
  archived?: boolean;
  archivedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'superadmin' | 'admin' | 'user';
  company: string;
  status: 'active' | 'inactive';
  isDeleted?: boolean;
  disabledReason?: string;
  roleCompany?: string;  // Parse Role (e.g., "R_SkodaFinancialServices" or "R_superAdmin")
}

export interface InspectionJourney {
  id: string;
  companyId: string;
  name: string;
  description?: string;
  blocks: JourneyBlock[];
  isActive: boolean;
}

export interface JourneyBlock {
  id: string;
  type: 'form' | 'shootInspect' | 'fastTrack' | 'addDamage' | 'static';
  name: string;
  description?: string;
  configId?: string;
  order: number;
}

export interface ShootStep {
  angle?: number;
  quality: boolean;
  optional: boolean;
  typeImage: number;
  typeExterior?: number;
  typeInterior?: number;
  typeAdditional?: number;
  retry: number;
  showHelp: boolean;
  runDetection?: boolean;
  urlThumb: string;
  title: {
    name: string;
    localization: Array<{
      locale: string;
      title: string;
    }>;
  };
  overlay?: {
    url: string;
    constraints: {
      portrait: {
        position: number;
        scaleType: number;
        marginStart: boolean;
        marginEnd: boolean;
      };
      landscape: {
        position: number;
        scaleType: number;
        marginStart: boolean;
        marginEnd: boolean;
      };
    };
  };
  help: {
    localization: Array<{
      locale: string;
      title: string | null;
      content: string | null;
    }>;
  };
}

export interface ShootInspectionData {
  id: string;
  name: string;
  description: string;
  config: ShootStep[];
}

export interface SortingRule {
  id: string;
  company: string;
  type: string;
  fromCollection: string;
  targetCollection: string;
  referenceKey: string;
  referencePrefix: string;
  filters: string;
  updates: string;
  processingPriority: number;
}

export interface CostMatrix {
  id: string;
  company: string;
  tax: number;
  currency: string;
  parts: CostMatrixPart[];
}

export interface CostMatrixPart {
  partTypeCode: string;
  partCode: string;
  locationCode: string;
  partNameEn: string;
  locationEn: string;
  conditionLabelEn: string;
  severity: string;
  repairTypeEn: string;
  costBeforeTax: number;
  partNameFr: string;
  locationFr: string;
  conditionLabelFr: string;
  repairTypeFr: string;
  conditionCode: string;
  repairCode: string;
}

export interface ChaseupRule {
  id: string;
  company: string;
  type: 'event' | 'anonymization';
  activationDate: string;
  utcSendingTime: {
    hour: number;
    minute: number;
  };
  affectedStatuses: {
    inspectionCreated: boolean;
    inspectionInProgress: boolean;
    detectionFinished: boolean;
    damageReviewOngoing: boolean;
    completed: boolean;
    chasedUpManually: boolean;
  };
  firstDelayDays?: number;
  firstDelayMinutes?: number;
  secondDelayDays?: number;
  secondDelayMinutes?: number;
  maxSendings: 0 | 1 | 2;
  firstReminder: ChaseupReminder;
  secondReminder?: ChaseupReminder;
  createdAt: string;
  updatedAt: string;
}

export interface ChaseupReminder {
  webhook: {
    enabled: boolean;
  };
  user: {
    enabled: boolean;
    sms: boolean;
    email: boolean;
    templates: ChaseupTemplates;
  };
  customer: {
    enabled: boolean;
    sms: boolean;
    email: boolean;
    templates: ChaseupTemplates;
  };
  emailAddress: {
    enabled: boolean;
    address: string;
    sms: boolean;
    email: boolean;
    templates: ChaseupTemplates;
  };
}

export interface ChaseupTemplates {
  [language: string]: {
    email: {
      subject: string;
      content: string;
    };
    sms: {
      content: string;
    };
  };
}