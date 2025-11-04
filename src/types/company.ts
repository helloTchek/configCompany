// Types pour Company
export interface Company {
  objectId: string;
  identifier: string;
  name: string;
  logo?: {
    __type: string;
    name: string;
    url: string;
  };
  createdAt: string;
  updatedAt: string;
  ACL?: Record<string, any>;
  apiToken?: ApiToken;
  settingsPtr?: Pointer;
  eventManagerPtr?: Pointer;
  configShootInspect?: any[];
  // Legacy fields for backwards compatibility
  id?: string;
  contractType?: 'Client' | 'Prospect' | 'Partner';
  businessSector?: string;
  retentionPeriod?: number;
  isFastTrackDisabled?: boolean;
  processingParams?: ProcessingParams;
  iaValidation?: boolean;
  humanValidationEnabled?: boolean;
  validationPriority?: number;
  maxValidationDelay?: number;
  minTaskProcessingDuration?: number;
  showStartInstantInspection?: boolean;
  showSendInspectionLink?: boolean;
  parentCompanyId?: string;
  childCompanyIds?: string[];
}

export interface Pointer {
  __type: string;
  className: string;
  objectId: string;
}

export interface ApiToken {
  decisonTree?: {
    withClassification: boolean;
    tile: boolean;
    sizeTile: number;
  };
  numberRequest?: number;
  token?: string;
  api?: boolean;
  removeBg?: boolean;
  locale?: string;
  maxRequestAPI?: number;
  canClassification?: boolean;
  canDetection?: boolean;
  canRead?: boolean;
  canImageprocessing?: boolean;
  companyPtr?: Pointer;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  canCostCalculation?: boolean;
  isDeleted?: boolean;
  ACL?: Record<string, any>;
  objectId?: string;
}

export interface ProcessingParams {
  mileageEnabled: boolean;
  blurEnabled: boolean;
  vinEnabled: boolean;
  readCarInformationEnabled: boolean;
}

export interface CompanyHierarchy extends Company {
  parentCompany?: Company;
  childCompanies: Company[];
}

// Type pour la création (champs optionnels)
export type CreateCompanyData = Partial<Omit<Company, 'id' | 'createdAt' | 'updatedAt'>>;

// Type pour la mise à jour
export type UpdateCompanyData = Partial<Omit<Company, 'id'>>;