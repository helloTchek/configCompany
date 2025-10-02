// Central export point for all services
export { companyService } from './CompanyService';
export { journeyService } from './JourneyService';
export { userService } from './UserService';
export { sortingRuleService } from './SortingRuleService';
export { costMatrixService } from './CostMatrixService';
export { chaseupRuleService } from './ChaseupRuleService';

// Re-export types for convenience
export type { 
  Company, 
  User, 
  InspectionJourney, 
  SortingRule, 
  CostMatrix, 
  ChaseupRule,
  CreateCompanyRequest,
  UpdateCompanyRequest,
  CreateUserRequest,
  UpdateUserRequest,
  CreateJourneyRequest,
  UpdateJourneyRequest,
  CreateSortingRuleRequest,
  UpdateSortingRuleRequest,
  CreateCostMatrixRequest,
  UpdateCostMatrixRequest,
  CreateChaseupRuleRequest,
  UpdateChaseupRuleRequest
} from '@/types/entities';