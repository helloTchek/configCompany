// Types pour Company
export interface Company {
  id: string;
  companyObjectId: string;
  identifier: string;
  name: string;
  companyCode: string;
  contractType: 'Client' | 'Prospect' | 'Partner';
  businessSector: string;
  logo?: string;
  retentionPeriod: number;
  isFastTrackDisabled: boolean;
  processingParams: ProcessingParams;
  iaValidation: boolean;
  humanValidationEnabled: boolean;
  validationPriority: number;
  maxValidationDelay: number;
  minTaskProcessingDuration: number;
  showStartInstantInspection: boolean;
  showSendInspectionLink: boolean;
  parentCompanyId?: string;
  childCompanyIds: string[];
  createdAt: string;
  updatedAt: string;
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