// Core entity types for the application
export interface Company {
  id: string;
  name: string;
  identifier: string;
  apiToken: string;
  currentApiRequests: number;
  maxApiRequests: number;
  requestsExpiryDate: string;
  companyCode: string;
  parentCompany?: string;
  childrenCount: number;
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
  isDisabled?: boolean;
  disabledReason?: string;
  lastLogin?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface InspectionJourney {
  id: string;
  companyId: string;
  name: string;
  description?: string;
  blocks: JourneyBlock[];
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface JourneyBlock {
  id: string;
  type: 'form' | 'shootInspect' | 'fastTrack' | 'addDamage' | 'static';
  name: string;
  description?: string;
  configId?: string;
  order: number;
  config?: Record<string, unknown>;
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
  createdAt?: string;
  updatedAt?: string;
}

export interface CostMatrix {
  id: string;
  company: string;
  tax: number;
  currency: string;
  parts: CostMatrixPart[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CostMatrixPart {
  id?: string;
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

export interface ShootInspectionData {
  id: string;
  name: string;
  description: string;
  config: ShootStep[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ShootStep {
  id?: string;
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

// Request/Response types
export interface CreateCompanyRequest {
  name: string;
  identifier?: string;
  contractType: Company['contractType'];
  businessSector: string;
  logoUrl?: string;
  retentionPeriod?: number;
  disableFastTrack?: boolean;
  parentCompany?: string;
  styles?: string;
  reportSettings?: string;
  configModules?: string;
}

export interface UpdateCompanyRequest extends Partial<CreateCompanyRequest> {
  id: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  role: User['role'];
  company: string;
}

export interface UpdateUserRequest extends Partial<CreateUserRequest> {
  id: string;
}

export interface CreateJourneyRequest {
  companyId: string;
  name: string;
  description?: string;
  blocks: Omit<JourneyBlock, 'id'>[];
}

export interface UpdateJourneyRequest extends Partial<CreateJourneyRequest> {
  id: string;
}

export interface CreateSortingRuleRequest {
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

export interface UpdateSortingRuleRequest extends Partial<CreateSortingRuleRequest> {
  id: string;
}

export interface CreateCostMatrixRequest {
  company: string;
  tax: number;
  currency: string;
  parts: Omit<CostMatrixPart, 'id'>[];
}

export interface UpdateCostMatrixRequest extends Partial<CreateCostMatrixRequest> {
  id: string;
}

export interface CreateChaseupRuleRequest {
  company: string;
  type: ChaseupRule['type'];
  activationDate: string;
  utcSendingTime: ChaseupRule['utcSendingTime'];
  affectedStatuses: ChaseupRule['affectedStatuses'];
  firstDelayDays?: number;
  firstDelayMinutes?: number;
  secondDelayDays?: number;
  secondDelayMinutes?: number;
  maxSendings: ChaseupRule['maxSendings'];
  firstReminder: ChaseupReminder;
  secondReminder?: ChaseupReminder;
}

export interface UpdateChaseupRuleRequest extends Partial<CreateChaseupRuleRequest> {
  id: string;
}