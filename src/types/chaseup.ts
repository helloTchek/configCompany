/**
 * Types pour les règles de relance automatique (Chase-up Rules)
 */

export interface EmailTemplate {
  subject: string;
  text?: string;
  html?: string;
}

export type LanguageCode = 'en' | 'fr' | 'de' | 'it' | 'es' | 'nl' | 'sv' | 'no';

export interface EventConfig {
  webhook: boolean;
  agentEmail: boolean;
  agentSMS: boolean;
  customerEmail: boolean;
  customerSMS: boolean;
  companyEmail: boolean;
  companySMS: boolean;
  agentEmailAddress?: string;
  agentSMSNumber?: string;
  companyEmailAddress?: string;
  companySMSNumber?: string;
}

export interface EventTemplates {
  // Agent templates
  agentEmail_EN?: EmailTemplate;
  agentEmail_FR?: EmailTemplate;
  agentEmail_DE?: EmailTemplate;
  agentEmail_IT?: EmailTemplate;
  agentEmail_ES?: EmailTemplate;
  agentEmail_NL?: EmailTemplate;
  agentEmail_SV?: EmailTemplate;
  agentEmail_NO?: EmailTemplate;
  agentSMS_EN?: string;
  agentSMS_FR?: string;
  agentSMS_DE?: string;
  agentSMS_IT?: string;
  agentSMS_ES?: string;
  agentSMS_NL?: string;
  agentSMS_SV?: string;
  agentSMS_NO?: string;

  // Customer templates
  customerEmail_EN?: EmailTemplate;
  customerEmail_FR?: EmailTemplate;
  customerEmail_DE?: EmailTemplate;
  customerEmail_IT?: EmailTemplate;
  customerEmail_ES?: EmailTemplate;
  customerEmail_NL?: EmailTemplate;
  customerEmail_SV?: EmailTemplate;
  customerEmail_NO?: EmailTemplate;
  customerSMS_EN?: string;
  customerSMS_FR?: string;
  customerSMS_DE?: string;
  customerSMS_IT?: string;
  customerSMS_ES?: string;
  customerSMS_NL?: string;
  customerSMS_SV?: string;
  customerSMS_NO?: string;

  // Company templates
  companyEmail_EN?: EmailTemplate;
  companyEmail_FR?: EmailTemplate;
  companyEmail_DE?: EmailTemplate;
  companyEmail_IT?: EmailTemplate;
  companyEmail_ES?: EmailTemplate;
  companyEmail_NL?: EmailTemplate;
  companyEmail_SV?: EmailTemplate;
  companyEmail_NO?: EmailTemplate;
  companySMS_EN?: string;
  companySMS_FR?: string;
  companySMS_DE?: string;
  companySMS_IT?: string;
  companySMS_ES?: string;
  companySMS_NL?: string;
  companySMS_SV?: string;
  companySMS_NO?: string;
}

export interface ChaseupReminder {
  config: EventConfig[];
  templates: EventTemplates[];
}

export interface ChaseupRuleFormData {
  company: string;
  companyId: string;
  type: 'event' | 'anonymization';
  actionType: 'event' | 'anonymization';
  activationDate: string;
  utcSendingTime: {
    hour: number;
    minute: number;
  };
  maxSendings: number;
  firstDelayDays?: number;
  firstDelayMinutes?: number;
  secondDelayDays?: number;
  thirdDelayDays?: number;
  autoChaseUpConfig?: EventConfig[];
  autoChaseUpTemplates?: EventTemplates[];
}
