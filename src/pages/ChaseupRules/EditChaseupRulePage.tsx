import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../../components/Layout/Header';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import CompanySelector from '../../components/UI/CompanySelector';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { ArrowLeft, Save } from 'lucide-react';
import { ChaseupRule, ChaseupReminder, ChaseupTemplates } from '../../types';
import chaseUpRulesService, { CreateChaseUpRuleData } from '../../services/chaseupRulesService';
import companiesService from '../../services/companiesService';
import { languages, getVariables } from './chaseupRulesHelpers';

const createEmptyTemplates = (): ChaseupTemplates => {
  const templates: ChaseupTemplates = {};
  languages.forEach(lang => {
    templates[lang.code] = {
      email: { subject: '', content: '' },
      sms: { content: '' }
    };
  });
  return templates;
};

const createEmptyReminder = (): ChaseupReminder => ({
  webhook: { enabled: false },
  user: {
    enabled: false,
    address: '',
    smsNumber: '',
    sms: false,
    email: false,
    templates: createEmptyTemplates()
  },
  customer: {
    enabled: false,
    sms: false,
    email: false,
    templates: createEmptyTemplates()
  },
  emailAddress: {
    enabled: false,
    address: '',
    smsNumber: '',
    sms: false,
    email: false,
    templates: createEmptyTemplates()
  }
});

// Normalize reminder to ensure all fields exist (for backward compatibility with old data)
const normalizeReminder = (reminder: any): ChaseupReminder => {
  if (!reminder) return createEmptyReminder();

  return {
    webhook: reminder.webhook || { enabled: false },
    user: {
      enabled: reminder.user?.enabled || false,
      address: reminder.user?.address || '',
      smsNumber: reminder.user?.smsNumber || '',
      sms: reminder.user?.sms || false,
      email: reminder.user?.email || false,
      templates: reminder.user?.templates || createEmptyTemplates()
    },
    customer: {
      enabled: reminder.customer?.enabled || false,
      sms: reminder.customer?.sms || false,
      email: reminder.customer?.email || false,
      templates: reminder.customer?.templates || createEmptyTemplates()
    },
    emailAddress: {
      enabled: reminder.emailAddress?.enabled || false,
      address: reminder.emailAddress?.address || '',
      smsNumber: reminder.emailAddress?.smsNumber || '',
      sms: reminder.emailAddress?.sms || false,
      email: reminder.emailAddress?.email || false,
      templates: reminder.emailAddress?.templates || createEmptyTemplates()
    }
  };
};

export default function EditChaseupRulePage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const variables = getVariables(t);
  // Store selected language per reminder/recipient combination
  const [selectedLanguages, setSelectedLanguages] = useState<Record<string, string>>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const fieldRefs = useRef<Record<string, HTMLInputElement | HTMLTextAreaElement>>({});
  const [loadingRule, setLoadingRule] = useState(true);
  const [ruleNotFound, setRuleNotFound] = useState(false);

  const [formData, setFormData] = useState({
    company: '',
    type: 'event' as 'event' | 'anonymization',
    activationDate: '',
    utcSendingTime: { hour: 9, minute: 0 },
    affectedStatuses: {
      inspectionCreated: false,
      inspectionInProgress: false,
      detectionFinished: false,
      damageReviewOngoing: false,
      completed: false,
      chasedUpManually: false
    },
    firstDelayDays: undefined as number | undefined,
    firstDelayMinutes: undefined as number | undefined,
    secondDelayDays: undefined as number | undefined,
    secondDelayMinutes: undefined as number | undefined,
    maxSendings: 0 as 0 | 1 | 2,
    firstReminder: createEmptyReminder(),
    secondReminder: undefined as ChaseupReminder | undefined
  });

  const [errors, setErrors] = useState({
    company: '',
    activationDate: ''
  });

  const [allCompaniesLight, setAllCompaniesLight] = useState<Array<{ id: string; name: string; identifier?: string }>>([]);
  const [loadingCompanies, setLoadingCompanies] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Load existing rule data
  useEffect(() => {
    const loadRule = async () => {
      if (!id) {
        setRuleNotFound(true);
        setLoadingRule(false);
        return;
      }

      try {
        setLoadingRule(true);
        const rule = await chaseUpRulesService.getChaseUpRuleById(id);

        if (!rule) {
          setRuleNotFound(true);
          return;
        }

        // Transform backend rule to form data
        // Extract date safely
        let activationDateStr = '';
        try {
          if (rule.activationDate) {
            const dateObj = typeof rule.activationDate === 'string'
              ? new Date(rule.activationDate)
              : rule.activationDate;
            if (dateObj && !isNaN(dateObj.getTime())) {
              const isoString = dateObj.toISOString();
              activationDateStr = isoString.split('T')[0] || '';
            }
          }
        } catch (e) {
          console.error('Error parsing activation date:', e);
        }

        setFormData({
          company: rule.companyId || rule.company || '',  // Use companyId if available, fallback to company name
          type: rule.type,
          activationDate: activationDateStr,
          utcSendingTime: rule.utcSendingTime,
          affectedStatuses: rule.affectedStatuses,
          firstDelayDays: rule.firstDelayDays,
          firstDelayMinutes: rule.firstDelayMinutes,
          secondDelayDays: rule.secondDelayDays,
          secondDelayMinutes: undefined,
          maxSendings: rule.maxSendings,
          firstReminder: normalizeReminder(rule.firstReminder),
          secondReminder: rule.secondReminder ? normalizeReminder(rule.secondReminder) : undefined
        });
      } catch (error) {
        console.error('Error loading chase-up rule:', error);
        setRuleNotFound(true);
      } finally {
        setLoadingRule(false);
      }
    };

    loadRule();
  }, [id]);

  // Load all companies light (for dropdown) - REUSING CompaniesPage logic
  useEffect(() => {
    const loadAllCompaniesLight = async () => {
      try {
        setLoadingCompanies(true);
        const lightCompanies = await companiesService.getAllCompaniesLight();
        setAllCompaniesLight(lightCompanies);
      } catch (error) {
        console.error('Error loading all companies light:', error);
      } finally {
        setLoadingCompanies(false);
      }
    };
    loadAllCompaniesLight();
  }, []);

  // Auto-adjust max sendings and second reminder based on delays
  React.useEffect(() => {
    const hasDelays = formData.firstDelayDays || formData.firstDelayMinutes ||
                     formData.secondDelayDays || formData.secondDelayMinutes;

    if (hasDelays && formData.maxSendings !== 2) {
      setFormData(prev => ({
        ...prev,
        maxSendings: 2,
        secondReminder: prev.secondReminder || createEmptyReminder()
      }));
    }
  }, [formData.firstDelayDays, formData.firstDelayMinutes, formData.secondDelayDays, formData.secondDelayMinutes]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleStatusChange = (status: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      affectedStatuses: {
        ...prev.affectedStatuses,
        [status]: checked
      }
    }));
  };

  const handleReminderChange = (reminderType: 'firstReminder' | 'secondReminder', path: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [reminderType]: {
        ...prev[reminderType]!,
        ...setNestedValue(prev[reminderType]!, path, value)
      }
    }));
  };

  const setNestedValue = (obj: any, path: string, value: any): any => {
    const keys = path.split('.');
    const result = { ...obj };
    let current = result;

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (key) {
        current[key] = { ...current[key] };
        current = current[key];
      }
    }

    const lastKey = keys[keys.length - 1];
    if (lastKey) {
      current[lastKey] = value;
    }
    return result;
  };

  const handleVariableClick = (variableKey: string) => {
    if (focusedField && fieldRefs.current[focusedField]) {
      const field = fieldRefs.current[focusedField];
      const start = field.selectionStart || 0;
      const end = field.selectionEnd || 0;
      const currentValue = field.value;
      const newValue = currentValue.substring(0, start) + variableKey + currentValue.substring(end);

      field.value = newValue;

      // Trigger change event
      const event = new Event('input', { bubbles: true });
      field.dispatchEvent(event);

      // Set cursor position after the inserted variable
      setTimeout(() => {
        field.focus();
        field.setSelectionRange(start + variableKey.length, start + variableKey.length);
      }, 0);
    }
  };

  const assignFieldRef = useCallback((fieldId: string, ref: HTMLInputElement | HTMLTextAreaElement | null) => {
    if (ref) {
      fieldRefs.current[fieldId] = ref;
    } else {
      delete fieldRefs.current[fieldId];
    }
  }, []);

  const validateForm = () => {
    const newErrors = { company: '', activationDate: '' };

    if (!formData.company.trim()) {
      newErrors.company = t('chaseupRules.form.companyRequired');
    }

    if (!formData.activationDate.trim()) {
      newErrors.activationDate = t('chaseupRules.form.activationDateRequired');
    }

    setErrors(newErrors);
    return !newErrors.company && !newErrors.activationDate;
  };

  /**
   * Transform frontend formData to backend API format
   * Backend expects EventOptionsModel[] with boolean flags
   */
  const transformFrontendToBackend = (): CreateChaseUpRuleData => {
    // Convert affectedStatuses object to inspectionStatuses array
    const inspectionStatuses: number[] = [];
    if (formData.affectedStatuses.inspectionCreated) inspectionStatuses.push(0);
    if (formData.affectedStatuses.inspectionInProgress) inspectionStatuses.push(1);
    if (formData.affectedStatuses.detectionFinished) inspectionStatuses.push(2);
    if (formData.affectedStatuses.damageReviewOngoing) inspectionStatuses.push(3);
    if (formData.affectedStatuses.completed) inspectionStatuses.push(4);
    if (formData.affectedStatuses.chasedUpManually) inspectionStatuses.push(5);

    // Build config array in EventOptionsModel format
    const config: any[] = [];
    const templates: any[] = [];

    // Helper function to build config object for a reminder
    const buildConfigObject = (reminder: ChaseupReminder | undefined) => {
      if (!reminder) return null;

      return {
        webhook: reminder.webhook.enabled,
        companyEmail: reminder.emailAddress.enabled && reminder.emailAddress.email,
        companyEmailAddress: reminder.emailAddress.address || '',
        companySMSNumber: reminder.emailAddress.smsNumber || '',
        companySMS: reminder.emailAddress.enabled && reminder.emailAddress.sms,
        agentEmail: reminder.user.enabled && reminder.user.email,
        agentEmailAddress: reminder.user.address || '',
        agentSMS: reminder.user.enabled && reminder.user.sms,
        agentSMSNumber: reminder.user.smsNumber || '',
        customerEmail: reminder.customer.enabled && reminder.customer.email,
        customerSMS: reminder.customer.enabled && reminder.customer.sms,
        senderEmail: '',
        senderName: ''
      };
    };

    // Helper function to build templates array for a reminder
    const buildTemplatesArray = (reminder: ChaseupReminder | undefined, templatesArray: any[]) => {
      if (!reminder) return;

      // Build templates in EventTemplatesModel format
      // Backend expects: { agentEmail_FR: {subject, text, html}, agentSMS_EN: "text", ... }

      // Map frontend language codes to backend format (fr -> FR, nlbe -> NL-BE, etc.)
      const langCodeMap: Record<string, string> = {
        'fr': 'FR',
        'en': 'EN',
        'de': 'DE',
        'it': 'IT',
        'es': 'ES',
        'nlbe': 'NL-BE',
        'sv': 'SV',
        'no': 'NO'
      };

      // Collect all templates per language into a single object
      const templatesByLang: Record<string, any> = {};

      // Process user/agent templates
      if (reminder.user.enabled && reminder.user.templates) {
        Object.entries(reminder.user.templates).forEach(([lang, tmpl]) => {
          const langCode = langCodeMap[lang] || lang.toUpperCase();
          if (!templatesByLang[langCode]) templatesByLang[langCode] = {};

          if (reminder.user.email && (tmpl.email?.subject || tmpl.email?.content)) {
            templatesByLang[langCode][`agentEmail_${langCode}`] = {
              subject: tmpl.email.subject || '',
              text: tmpl.email.content || '',
              html: tmpl.email.content || ''
            };
          }
          if (reminder.user.sms && tmpl.sms?.content) {
            templatesByLang[langCode][`agentSMS_${langCode}`] = tmpl.sms.content;
          }
        });
      }

      // Process customer templates
      if (reminder.customer.enabled && reminder.customer.templates) {
        Object.entries(reminder.customer.templates).forEach(([lang, tmpl]) => {
          const langCode = langCodeMap[lang] || lang.toUpperCase();
          if (!templatesByLang[langCode]) templatesByLang[langCode] = {};

          if (reminder.customer.email && (tmpl.email?.subject || tmpl.email?.content)) {
            templatesByLang[langCode][`customerEmail_${langCode}`] = {
              subject: tmpl.email.subject || '',
              text: tmpl.email.content || '',
              html: tmpl.email.content || ''
            };
          }
          if (reminder.customer.sms && tmpl.sms?.content) {
            templatesByLang[langCode][`customerSMS_${langCode}`] = tmpl.sms.content;
          }
        });
      }

      // Process company templates
      if (reminder.emailAddress.enabled && reminder.emailAddress.templates) {
        Object.entries(reminder.emailAddress.templates).forEach(([lang, tmpl]) => {
          const langCode = langCodeMap[lang] || lang.toUpperCase();
          if (!templatesByLang[langCode]) templatesByLang[langCode] = {};

          if (reminder.emailAddress.email && (tmpl.email?.subject || tmpl.email?.content)) {
            templatesByLang[langCode][`companyEmail_${langCode}`] = {
              subject: tmpl.email.subject || '',
              text: tmpl.email.content || '',
              html: tmpl.email.content || ''
            };
          }
          if (reminder.emailAddress.sms && tmpl.sms?.content) {
            templatesByLang[langCode][`companySMS_${langCode}`] = tmpl.sms.content;
          }
        });
      }

      // Convert to array format expected by backend (one object per language with all templates)
      Object.values(templatesByLang).forEach(langTemplates => {
        if (Object.keys(langTemplates).length > 0) {
          templatesArray.push(langTemplates);
        }
      });
    };

    // Build config for first reminder
    const firstConfig = buildConfigObject(formData.firstReminder);
    if (firstConfig) {
      config.push(firstConfig);
      buildTemplatesArray(formData.firstReminder, templates);
    }

    // Build config for second reminder if exists
    if (formData.secondReminder) {
      const secondConfig = buildConfigObject(formData.secondReminder);
      if (secondConfig) {
        config.push(secondConfig);
        buildTemplatesArray(formData.secondReminder, templates);
      }
    }

    const result: CreateChaseUpRuleData = {
      companyId: formData.company,
      actionType: formData.type,
      active: true,
      activationDate: formData.activationDate,
      inspectionStatuses,
      config,
      templates,
      sendingUTCTimeHour: formData.utcSendingTime.hour,
      sendingUTCTimeMinute: formData.utcSendingTime.minute,
      maxSendingsNb: formData.maxSendings
    };

    // Only add optional delay fields if they have values
    if (formData.firstDelayDays !== undefined) {
      result.firstChaseUpDelayInDays = formData.firstDelayDays;
    }
    if (formData.firstDelayMinutes !== undefined) {
      result.firstChaseUpDelayInMinutes = formData.firstDelayMinutes;
    }
    if (formData.secondDelayDays !== undefined) {
      result.periodSubsequentSendingsInDays = formData.secondDelayDays;
    }

    return result;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    if (!id) {
      alert('Rule ID is missing');
      return;
    }

    try {
      setIsSaving(true);
      const backendData = transformFrontendToBackend();
      await chaseUpRulesService.updateChaseUpRule(id, backendData);
      navigate('/chaseup-rules');
    } catch (error) {
      console.error('Error updating chase-up rule:', error);
      alert('Failed to update chase-up rule. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const renderRecipientConfig = (
    reminderType: 'firstReminder' | 'secondReminder',
    recipientType: 'user' | 'customer' | 'emailAddress',
    recipientLabel: string
  ) => {
    const reminder = formData[reminderType];
    if (!reminder) return null;

    const recipient = reminder[recipientType];

    // Create unique key for this reminder/recipient combination
    const sectionKey = `${reminderType}-${recipientType}`;
    // Get or initialize the selected language for this specific section
    const selectedLanguage = selectedLanguages[sectionKey] || 'en';
    const setSelectedLanguage = (lang: string) => {
      setSelectedLanguages(prev => ({ ...prev, [sectionKey]: lang }));
    };

    return (
      <div className="border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h5 className="font-medium text-gray-900">{recipientLabel}</h5>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={recipient.enabled}
              onChange={(e) => handleReminderChange(reminderType, `${recipientType}.enabled`, e.target.checked)}
              className="rounded border-gray-300 text-blue-600 shadow-sm"
            />
            <span className="ml-2 text-sm text-gray-700">{t('chaseupRules.reminder.enabled')}</span>
          </label>
        </div>

        {recipient.enabled && (
          <div className="space-y-4">
            {(recipientType === 'emailAddress' || recipientType === 'user') && 'address' in recipient && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Input
                  label={recipientType === 'emailAddress' ? t('chaseupRules.reminder.emailAddress') : t('chaseupRules.reminder.userEmailAddress')}
                  type="email"
                  value={recipient.address}
                  onChange={(e) => handleReminderChange(reminderType, `${recipientType}.address`, e.target.value)}
                  placeholder={recipientType === 'emailAddress' ? 'recipient@example.com' : 'user@example.com'}
                />
                <Input
                  label={recipientType === 'emailAddress' ? t('chaseupRules.reminder.smsNumber') : t('chaseupRules.reminder.userSmsNumber')}
                  type="tel"
                  value={recipient.smsNumber || ''}
                  onChange={(e) => handleReminderChange(reminderType, `${recipientType}.smsNumber`, e.target.value)}
                  placeholder="+33612345678"
                />
              </div>
            )}

            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={recipient.sms}
                  onChange={(e) => handleReminderChange(reminderType, `${recipientType}.sms`, e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 shadow-sm"
                />
                <span className="ml-2 text-sm text-gray-700">{t('chaseupRules.reminder.sms')}</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={recipient.email}
                  onChange={(e) => handleReminderChange(reminderType, `${recipientType}.email`, e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 shadow-sm"
                />
                <span className="ml-2 text-sm text-gray-700">{t('chaseupRules.reminder.email')}</span>
              </label>
            </div>

            {(recipient.sms || recipient.email) && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700">{t('chaseupRules.reminder.language')}:</label>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                </div>

                {recipient.email && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">{t('chaseupRules.reminder.emailSubject')}</label>
                    <input
                      ref={(ref) => assignFieldRef(`${reminderType}-${recipientType}-email-subject-${selectedLanguage}`, ref)}
                      type="text"
                      value={recipient.templates[selectedLanguage]?.email.subject || ''}
                      onChange={(e) => handleReminderChange(reminderType, `${recipientType}.templates.${selectedLanguage}.email.subject`, e.target.value)}
                      onFocus={() => setFocusedField(`${reminderType}-${recipientType}-email-subject-${selectedLanguage}`)}
                      className={`block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        focusedField === `${reminderType}-${recipientType}-email-subject-${selectedLanguage}` ? 'border-blue-300 bg-blue-50' : 'border-gray-300'
                      }`}
                      placeholder={t('chaseupRules.reminder.emailSubject')}
                    />
                  </div>
                )}

                {recipient.email && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">{t('chaseupRules.reminder.emailContent')}</label>
                    <textarea
                      ref={(ref) => assignFieldRef(`${reminderType}-${recipientType}-email-content-${selectedLanguage}`, ref)}
                      rows={4}
                      value={recipient.templates[selectedLanguage]?.email.content || ''}
                      onChange={(e) => handleReminderChange(reminderType, `${recipientType}.templates.${selectedLanguage}.email.content`, e.target.value)}
                      onFocus={() => setFocusedField(`${reminderType}-${recipientType}-email-content-${selectedLanguage}`)}
                      className={`block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm ${
                        focusedField === `${reminderType}-${recipientType}-email-content-${selectedLanguage}` ? 'border-blue-300 bg-blue-50' : 'border-gray-300'
                      }`}
                      placeholder={t('chaseupRules.reminder.emailContent')}
                    />
                  </div>
                )}

                {recipient.sms && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">{t('chaseupRules.reminder.smsContent')}</label>
                    <textarea
                      ref={(ref) => assignFieldRef(`${reminderType}-${recipientType}-sms-content-${selectedLanguage}`, ref)}
                      rows={3}
                      value={recipient.templates[selectedLanguage]?.sms.content || ''}
                      onChange={(e) => handleReminderChange(reminderType, `${recipientType}.templates.${selectedLanguage}.sms.content`, e.target.value)}
                      onFocus={() => setFocusedField(`${reminderType}-${recipientType}-sms-content-${selectedLanguage}`)}
                      className={`block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm ${
                        focusedField === `${reminderType}-${recipientType}-sms-content-${selectedLanguage}` ? 'border-blue-300 bg-blue-50' : 'border-gray-300'
                      }`}
                      placeholder={t('chaseupRules.reminder.smsMaxLength')}
                      maxLength={160}
                    />
                    <p className="text-xs text-gray-500">
                      {t('chaseupRules.reminder.characterCount', { count: (recipient.templates[selectedLanguage]?.sms.content || '').length })}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // Show loading spinner while loading rule
  if (loadingRule) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={t('chaseupRules.editTitle')} />
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  // Show error if rule not found
  if (ruleNotFound) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={t('chaseupRules.editTitle')} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{t('chaseupRules.messages.ruleNotFound')}</h2>
            <p className="text-gray-600 mb-4">{t('chaseupRules.messages.ruleNotFoundMessage')}</p>
            <Button onClick={() => navigate('/chaseup-rules')}>
              {t('chaseupRules.backToList')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header title={t('chaseupRules.editTitle')} />

      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6">
          <Button
            variant="secondary"
            onClick={() => navigate('/chaseup-rules')}
            className="flex items-center gap-2 mb-4"
          >
            <ArrowLeft size={16} />
            {t('chaseupRules.backToList')}
          </Button>
        </div>

        <div className="max-w-6xl mx-auto space-y-6">
          {/* Available Variables - Always visible when field is focused */}
          {focusedField && (
            <div className="sticky top-4 z-10 bg-white rounded-lg border-2 border-blue-200 shadow-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-md font-semibold text-blue-900">📋 {t('chaseupRules.sections.availableVariables')}</h3>
                <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">{t('chaseupRules.form.clickToInsert')}</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-40 overflow-y-auto">
                {variables.map((variable) => (
                  <button
                    key={variable.key}
                    onClick={() => handleVariableClick(variable.key)}
                    className="text-left p-2 bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 text-sm font-mono transition-colors hover:shadow-sm"
                    title={`Click to insert ${variable.key}`}
                  >
                    <div className="font-medium text-blue-700">{variable.key}</div>
                    <div className="text-xs text-blue-500">{variable.name}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Basic Configuration */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('chaseupRules.sections.basicConfiguration')}</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CompanySelector
                companies={allCompaniesLight}
                selectedCompanyId={formData.company}
                onSelect={(companyId) => handleInputChange('company', companyId)}
                placeholder={loadingCompanies ? t('chaseupRules.form.loadingCompanies') : t('chaseupRules.form.searchCompany')}
                label={t('chaseupRules.form.company')}
                error={errors.company}
                disabled={loadingCompanies}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('chaseupRules.form.type')}</label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="event">{t('chaseupRules.types.event')}</option>
                  <option value="anonymization">{t('chaseupRules.types.anonymization')}</option>
                </select>
              </div>

              <Input
                label={t('chaseupRules.form.activationDate')}
                type="date"
                value={formData.activationDate}
                onChange={(e) => handleInputChange('activationDate', e.target.value)}
                error={errors.activationDate}
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('chaseupRules.form.utcSendingTime')}</label>
                <div className="flex gap-2">
                  <select
                    value={formData.utcSendingTime.hour}
                    onChange={(e) => handleInputChange('utcSendingTime', { ...formData.utcSendingTime, hour: parseInt(e.target.value) })}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {Array.from({ length: 24 }, (_, i) => (
                      <option key={i} value={i}>{i.toString().padStart(2, '0')}</option>
                    ))}
                  </select>
                  <span className="flex items-center text-gray-500">:</span>
                  <select
                    value={formData.utcSendingTime.minute}
                    onChange={(e) => handleInputChange('utcSendingTime', { ...formData.utcSendingTime, minute: parseInt(e.target.value) })}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value={0}>00</option>
                    <option value={15}>15</option>
                    <option value={30}>30</option>
                    <option value={45}>45</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Affected Inspection Statuses */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('chaseupRules.sections.affectedStatuses')}</h3>
            <p className="text-sm text-gray-600 mb-4">{t('chaseupRules.form.statusesHelp')}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.affectedStatuses.inspectionCreated}
                  onChange={(e) => handleStatusChange('inspectionCreated', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 shadow-sm"
                />
                <span className="ml-2 text-sm text-gray-700">{t('chaseupRules.statuses.inspectionCreated')}</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.affectedStatuses.inspectionInProgress}
                  onChange={(e) => handleStatusChange('inspectionInProgress', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 shadow-sm"
                />
                <span className="ml-2 text-sm text-gray-700">{t('chaseupRules.statuses.inspectionInProgress')}</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.affectedStatuses.detectionFinished}
                  onChange={(e) => handleStatusChange('detectionFinished', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 shadow-sm"
                />
                <span className="ml-2 text-sm text-gray-700">{t('chaseupRules.statuses.detectionFinished')}</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.affectedStatuses.damageReviewOngoing}
                  onChange={(e) => handleStatusChange('damageReviewOngoing', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 shadow-sm"
                />
                <span className="ml-2 text-sm text-gray-700">{t('chaseupRules.statuses.damageReviewOngoing')}</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.affectedStatuses.completed}
                  onChange={(e) => handleStatusChange('completed', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 shadow-sm"
                />
                <span className="ml-2 text-sm text-gray-700">{t('chaseupRules.statuses.completed')}</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.affectedStatuses.chasedUpManually}
                  onChange={(e) => handleStatusChange('chasedUpManually', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 shadow-sm"
                />
                <span className="ml-2 text-sm text-gray-700">{t('chaseupRules.statuses.chasedUpManually')}</span>
              </label>
            </div>
          </div>

          {/* Delay Configuration */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('chaseupRules.sections.delayConfiguration')}</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Input
                label={t('chaseupRules.form.firstDelayDays')}
                type="number"
                value={formData.firstDelayDays || ''}
                onChange={(e) => handleInputChange('firstDelayDays', e.target.value ? parseInt(e.target.value) : undefined)}
                min="0"
              />
              <Input
                label={t('chaseupRules.form.firstDelayMinutes')}
                type="number"
                value={formData.firstDelayMinutes || ''}
                onChange={(e) => handleInputChange('firstDelayMinutes', e.target.value ? parseInt(e.target.value) : undefined)}
                min="0"
              />
              <Input
                label={t('chaseupRules.form.secondDelayDays')}
                type="number"
                value={formData.secondDelayDays || ''}
                onChange={(e) => handleInputChange('secondDelayDays', e.target.value ? parseInt(e.target.value) : undefined)}
                min="0"
              />
              <Input
                label={t('chaseupRules.form.secondDelayMinutes')}
                type="number"
                value={formData.secondDelayMinutes || ''}
                onChange={(e) => handleInputChange('secondDelayMinutes', e.target.value ? parseInt(e.target.value) : undefined)}
                min="0"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('chaseupRules.form.maxSendings')}</label>
              <select
                value={formData.maxSendings}
                onChange={(e) => handleInputChange('maxSendings', parseInt(e.target.value) as 0 | 1 | 2)}
                className="block w-32 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
              </select>
            </div>
          </div>

          {/* First Reminder */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('chaseupRules.sections.firstReminder')}</h3>

            {/* Webhook */}
            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.firstReminder.webhook.enabled}
                  onChange={(e) => handleReminderChange('firstReminder', 'webhook.enabled', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 shadow-sm"
                />
                <span className="ml-2 text-sm text-gray-700">{t('chaseupRules.reminder.webhook')}</span>
              </label>
            </div>

            <div className="space-y-6">
              {renderRecipientConfig('firstReminder', 'user', t('chaseupRules.reminder.user'))}
              {renderRecipientConfig('firstReminder', 'customer', t('chaseupRules.reminder.customer'))}
              {renderRecipientConfig('firstReminder', 'emailAddress', t('chaseupRules.reminder.emailAddress'))}
            </div>
          </div>

          {/* Second Reminder */}
          {(formData.maxSendings === 2 || formData.secondReminder) && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('chaseupRules.sections.secondReminder')}</h3>

              {/* Webhook */}
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.secondReminder?.webhook.enabled || false}
                    onChange={(e) => {
                      if (!formData.secondReminder) {
                        setFormData(prev => ({ ...prev, secondReminder: createEmptyReminder() }));
                      }
                      handleReminderChange('secondReminder', 'webhook.enabled', e.target.checked);
                    }}
                    className="rounded border-gray-300 text-blue-600 shadow-sm"
                  />
                  <span className="ml-2 text-sm text-gray-700">{t('chaseupRules.reminder.webhook')}</span>
                </label>
              </div>

              <div className="space-y-6">
                {renderRecipientConfig('secondReminder', 'user', t('chaseupRules.reminder.user'))}
                {renderRecipientConfig('secondReminder', 'customer', t('chaseupRules.reminder.customer'))}
                {renderRecipientConfig('secondReminder', 'emailAddress', t('chaseupRules.reminder.emailAddress'))}
              </div>
            </div>
          )}

          {/* Save Buttons */}
          <div className="flex gap-4 justify-end sticky bottom-0 bg-white py-4 border-t border-gray-200">
            <Button
              variant="secondary"
              onClick={() => navigate('/chaseup-rules')}
              disabled={isSaving}
            >
              {t('chaseupRules.actions.cancel')}
            </Button>
            <Button
              className="flex items-center gap-2"
              onClick={handleSave}
              disabled={isSaving || loadingCompanies}
            >
              <Save size={16} />
              {isSaving ? t('chaseupRules.actions.updating') : t('chaseupRules.actions.update')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
