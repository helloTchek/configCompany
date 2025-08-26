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
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'superadmin' | 'admin' | 'user';
  company: string;
  status: 'active' | 'inactive';
  lastLogin?: string;
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
  type: 'form' | 'shootInspection' | 'fastTrack' | 'addDamage' | 'onboarding' | 'offboarding' | 'sortingRules' | 'decisionTree';
  name: string;
  description?: string;
  config: any;
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

// Re-export for compatibility
export type { ShootStep, ShootInspectionData };

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
  partType: string;
  location: string;
  severity: string;
  cost: number;
}