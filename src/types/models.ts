// Core domain models with strict typing

export interface Company {
  id: string;
  companyObjectId: string;
  identifier: string;
  name: string;
  companyCode: string;
  contractType: 'Client' | 'Prospect' | 'Test' | 'Demo';
  businessSector: 'Insurance' | 'Leasing' | 'Rental' | 'Fleet Management' | 'Automotive';
  logo?: string;
  retentionPeriod: number;
  isFastTrackDisabled: boolean;
  processingParams: {
    mileageEnabled: boolean;
    blurEnabled: boolean;
    vinEnabled: boolean;
    readCarInformationEnabled: boolean;
  };
  iaValidation: boolean;
  humanValidationEnabled: boolean;
  validationPriority: 0 | 1 | 2 | 3 | 4 | 5;
  maxValidationDelay: number;
  minTaskProcessingDuration: number;
  showStartInstantInspection: boolean;
  showSendInspectionLink: boolean;
  parentCompanyId?: string;
  childCompanyIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ApiToken {
  id: string;
  companyId: string;
  token: string;
  numberRequest: number;
  maxRequestAPI: number;
  expiration: string;
  decisionTree?: Record<string, unknown>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Settings {
  id: string;
  companyId: string;
  style: Record<string, unknown>;
  report: Record<string, unknown>;
  configModules: Record<string, unknown>;
  instantInspection: boolean;
  urlBackground?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EventManager {
  id: string;
  companyId: string;
  tradeinVehicleConfig: EventRecipientConfig;
  tradeinVehicleTemplates: EventTemplates;
  chaseUpVehicleConfig: EventRecipientConfig;
  chaseUpVehicleTemplates: EventTemplates;
  detectionFinishedConfig: EventRecipientConfig;
  detectionFinishedTemplates: EventTemplates;
  createReportConfig: EventRecipientConfig;
  createReportTemplates: EventTemplates;
  shareUpdatedReportConfig: EventRecipientConfig;
  shareUpdatedReportTemplates: EventTemplates;
  webhookUrlV2?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EventRecipientConfig {
  enabled: boolean;
  recipients: EventRecipient[];
}

export interface EventRecipient {
  id: string;
  type: 'email' | 'sms' | 'webhook';
  address: string;
  name?: string;
  enabled: boolean;
}

export interface EventTemplates {
  [language: string]: {
    email?: {
      subject: string;
      htmlContent: string;
      enabled: boolean;
    };
    sms?: {
      content: string;
      enabled: boolean;
    };
  };
}

export interface User {
  id: string;
  mail: string;
  name: string;
  companyId: string;
  companyName: string;
  isAdmin: boolean;
  isSuperadmin: boolean;
  isDeleted: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CostSettings {
  id: string;
  companyId: string;
  currency: string;
  tax: number;
  parts: CostPart[];
  createdAt: string;
  updatedAt: string;
}

export interface CostPart {
  id: string;
  partType: string;
  location: string;
  severity: 'Minor' | 'Moderate' | 'Major' | 'Severe';
  cost: number;
}

export interface Workflow {
  id: string;
  companyId: string;
  name: string;
  description?: string;
  steps: WorkflowStep[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WorkflowStep {
  id: string;
  type: 'form' | 'shootInspect' | 'fastTrack' | 'addDamage' | 'static';
  name: string;
  description?: string;
  configId?: string;
  order: number;
  config?: Record<string, unknown>;
}

export interface ShootInspectConfig {
  id: string;
  name: string;
  description: string;
  steps: ShootInspectStep[];
  createdAt: string;
  updatedAt: string;
}

export interface ShootInspectStep {
  id: string;
  order: number;
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
  title: LocalizedContent;
  overlay?: {
    url: string;
    constraints: {
      portrait: OverlayConstraints;
      landscape: OverlayConstraints;
    };
  };
  help: {
    localization: LocalizedHelpContent[];
  };
}

export interface LocalizedContent {
  name: string;
  localization: Array<{
    locale: string;
    title: string;
  }>;
}

export interface LocalizedHelpContent {
  locale: string;
  title: string | null;
  content: string | null;
}

export interface OverlayConstraints {
  position: number;
  scaleType: number;
  marginStart: boolean;
  marginEnd: boolean;
}

// Derived types for UI
export type UserRole = User['isAdmin'] extends true 
  ? User['isSuperadmin'] extends true 
    ? 'superAdmin' 
    : 'admin'
  : 'user';

export type UserStatus = User['isDeleted'] extends true ? 'inactive' : 'active';

export type CompanyHierarchy = Company & {
  parentCompany?: Company;
  childCompanies: Company[];
};