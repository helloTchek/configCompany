import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Save, Plus, Trash2, Eye, EyeOff } from 'lucide-react';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import Modal from '../../components/UI/Modal';
import { Tabs } from '../../components/UI/Tabs';

const CreateCompanyPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  // Company basic info state
  const [companyData, setCompanyData] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
    email: '',
    website: '',
    vatNumber: '',
    registrationNumber: ''
  });

  // Events & Webhooks state
  const [eventCompanyEmailStates, setEventCompanyEmailStates] = useState({});
  const [chaseUpSettings, setChaseUpSettings] = useState({
    activationDate: '',
    maxSendings: 3,
    sendingHour: 9,
    sendingMinute: 0
  });
  const [reminders, setReminders] = useState([
    {
      id: 1,
      name: 'First Reminder',
      delayDays: 1,
      delayMinutes: 0,
      recipients: [],
      templates: {}
    }
  ]);

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showUnsavedModal, setShowUnsavedModal] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setCompanyData(prev => ({
      ...prev,
      [field]: value
    }));
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    console.log('Saving company:', companyData);
    setHasUnsavedChanges(false);
    navigate('/companies');
  };

  const handleNavigation = (path: string) => {
    if (hasUnsavedChanges) {
      setPendingNavigation(path);
      setShowUnsavedModal(true);
    } else {
      navigate(path);
    }
  };

  const handleCompanyEmailToggle = (eventType: string, enabled: boolean) => {
    setEventCompanyEmailStates(prev => ({
      ...prev,
      [eventType]: enabled
    }));
    setHasUnsavedChanges(true);
  };

  const handleChaseUpSettingsChange = (field: string, value: any) => {
    setChaseUpSettings(prev => ({
      ...prev,
      [field]: value
    }));
    setHasUnsavedChanges(true);
  };

  const addReminder = () => {
    const newReminder = {
      id: Date.now(),
      name: `Reminder ${reminders.length + 1}`,
      delayDays: 3,
      delayMinutes: 0,
      recipients: [],
      templates: {}
    };
    setReminders(prev => [...prev, newReminder]);
    setHasUnsavedChanges(true);
  };

  const removeReminder = (id: number) => {
    if (reminders.length > 1) {
      setReminders(prev => prev.filter(r => r.id !== id));
      setHasUnsavedChanges(true);
    }
  };

  const updateReminder = (id: number, field: string, value: any) => {
    setReminders(prev => prev.map(r => 
      r.id === id ? { ...r, [field]: value } : r
    ));
    setHasUnsavedChanges(true);
  };

  const CompanyInfoTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label={t('company.name')}
          value={companyData.name}
          onChange={(value) => handleInputChange('name', value)}
          required
        />
        <Input
          label={t('company.email')}
          type="email"
          value={companyData.email}
          onChange={(value) => handleInputChange('email', value)}
        />
        <Input
          label={t('company.phone')}
          value={companyData.phone}
          onChange={(value) => handleInputChange('phone', value)}
        />
        <Input
          label={t('company.website')}
          value={companyData.website}
          onChange={(value) => handleInputChange('website', value)}
        />
        <Input
          label={t('company.address')}
          value={companyData.address}
          onChange={(value) => handleInputChange('address', value)}
        />
        <Input
          label={t('company.city')}
          value={companyData.city}
          onChange={(value) => handleInputChange('city', value)}
        />
        <Input
          label={t('company.postalCode')}
          value={companyData.postalCode}
          onChange={(value) => handleInputChange('postalCode', value)}
        />
        <Input
          label={t('company.country')}
          value={companyData.country}
          onChange={(value) => handleInputChange('country', value)}
        />
        <Input
          label={t('company.vatNumber')}
          value={companyData.vatNumber}
          onChange={(value) => handleInputChange('vatNumber', value)}
        />
        <Input
          label={t('company.registrationNumber')}
          value={companyData.registrationNumber}
          onChange={(value) => handleInputChange('registrationNumber', value)}
        />
      </div>
    </div>
  );

  const EventsWebhooksTab = () => {
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const fieldRefs = useRef<{[key: string]: HTMLInputElement | HTMLTextAreaElement}>({});
    const [showVariables, setShowVariables] = useState(false);

    const assignFieldRef = useCallback((fieldName: string) => {
      return (element: HTMLInputElement | HTMLTextAreaElement | null) => {
        if (element) {
          fieldRefs.current[fieldName] = element;
        } else {
          delete fieldRefs.current[fieldName];
        }
      };
    }, []);

    const availableVariables = [
      '{{company_name}}',
      '{{inspection_date}}',
      '{{inspector_name}}',
      '{{report_url}}',
      '{{due_date}}',
      '{{contact_person}}'
    ];

    const handleVariableClick = (variable: string) => {
      if (focusedField && fieldRefs.current[focusedField]) {
        const field = fieldRefs.current[focusedField];
        const start = field.selectionStart || 0;
        const end = field.selectionEnd || 0;
        const currentValue = field.value;
        const newValue = currentValue.substring(0, start) + variable + currentValue.substring(end);
        
        field.value = newValue;
        field.dispatchEvent(new Event('input', { bubbles: true }));
        field.dispatchEvent(new Event('change', { bubbles: true }));
        
        const newCursorPos = start + variable.length;
        setTimeout(() => {
          field.setSelectionRange(newCursorPos, newCursorPos);
          field.focus();
        }, 0);
      }
    };

    const eventTypes = [
      { key: 'inspection_completed', label: t('events.inspectionCompleted') },
      { key: 'report_generated', label: t('events.reportGenerated') },
      { key: 'payment_received', label: t('events.paymentReceived') }
    ];

    return (
      <div className="space-y-8">
        {/* Event Email Settings */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t('events.emailNotifications')}
          </h3>
          <div className="space-y-4">
            {eventTypes.map(event => (
              <div key={event.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <span className="font-medium text-gray-700">{event.label}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={eventCompanyEmailStates[event.key] || false}
                    onChange={(e) => handleCompanyEmailToggle(event.key, e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Chase-up Messages */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              {t('events.automatedChaseUp')}
            </h3>
            <Button
              onClick={addReminder}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              {t('events.addReminder')}
            </Button>
          </div>

          {/* General Settings */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="font-medium text-gray-900 mb-4">{t('events.generalSettings')}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Input
                label={t('events.activationDate')}
                type="date"
                value={chaseUpSettings.activationDate}
                onChange={(value) => handleChaseUpSettingsChange('activationDate', value)}
              />
              <Input
                label={t('events.maxSendings')}
                type="number"
                min="1"
                max="10"
                value={chaseUpSettings.maxSendings.toString()}
                onChange={(value) => handleChaseUpSettingsChange('maxSendings', parseInt(value) || 1)}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('events.sendingTime')} (UTC)
                </label>
                <div className="flex gap-2">
                  <select
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={chaseUpSettings.sendingHour}
                    onChange={(e) => handleChaseUpSettingsChange('sendingHour', parseInt(e.target.value))}
                  >
                    {Array.from({ length: 24 }, (_, i) => (
                      <option key={i} value={i}>{i.toString().padStart(2, '0')}</option>
                    ))}
                  </select>
                  <select
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={chaseUpSettings.sendingMinute}
                    onChange={(e) => handleChaseUpSettingsChange('sendingMinute', parseInt(e.target.value))}
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

          {/* Reminders */}
          <div className="space-y-6">
            {reminders.map((reminder, index) => (
              <div key={reminder.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                      #{index + 1}
                    </span>
                    <Input
                      value={reminder.name}
                      onChange={(value) => updateReminder(reminder.id, 'name', value)}
                      className="font-medium"
                      placeholder={t('events.reminderName')}
                    />
                  </div>
                  {reminders.length > 1 && (
                    <Button
                      onClick={() => removeReminder(reminder.id)}
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                {/* Delay Settings */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {index === 0 ? t('events.delayFromInspection') : t('events.delayFromPrevious')}
                    </label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        min="0"
                        value={reminder.delayDays.toString()}
                        onChange={(value) => updateReminder(reminder.id, 'delayDays', parseInt(value) || 0)}
                        placeholder="0"
                      />
                      <span className="flex items-center text-sm text-gray-500">days</span>
                      <Input
                        type="number"
                        min="0"
                        max="1439"
                        value={reminder.delayMinutes.toString()}
                        onChange={(value) => updateReminder(reminder.id, 'delayMinutes', parseInt(value) || 0)}
                        placeholder="0"
                      />
                      <span className="flex items-center text-sm text-gray-500">min</span>
                    </div>
                  </div>
                </div>

                {/* Recipients */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('events.recipients')}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['client', 'inspector', 'admin'].map(recipient => (
                      <label key={recipient} className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          checked={reminder.recipients.includes(recipient)}
                          onChange={(e) => {
                            const newRecipients = e.target.checked
                              ? [...reminder.recipients, recipient]
                              : reminder.recipients.filter(r => r !== recipient);
                            updateReminder(reminder.id, 'recipients', newRecipients);
                          }}
                        />
                        <span className="ml-2 text-sm text-gray-700 capitalize">{recipient}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Templates */}
                <div className="space-y-4">
                  <h5 className="font-medium text-gray-900">{t('events.templates')}</h5>
                  
                  {/* Email Templates */}
                  <div className="space-y-3">
                    <h6 className="text-sm font-medium text-gray-700">{t('events.emailTemplates')}</h6>
                    {['en', 'fr'].map(lang => (
                      <div key={`email-${lang}`} className="space-y-2">
                        <label className="block text-sm text-gray-600">
                          {t('events.emailSubject')} ({lang.toUpperCase()})
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder={t('events.emailSubjectPlaceholder')}
                          ref={assignFieldRef(`reminder-${reminder.id}-email-subject-${lang}`)}
                          onFocus={() => {
                            setFocusedField(`reminder-${reminder.id}-email-subject-${lang}`);
                            setShowVariables(true);
                          }}
                        />
                        <label className="block text-sm text-gray-600">
                          {t('events.emailBody')} ({lang.toUpperCase()})
                        </label>
                        <textarea
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder={t('events.emailBodyPlaceholder')}
                          ref={assignFieldRef(`reminder-${reminder.id}-email-body-${lang}`)}
                          onFocus={() => {
                            setFocusedField(`reminder-${reminder.id}-email-body-${lang}`);
                            setShowVariables(true);
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* SMS Templates */}
                  <div className="space-y-3">
                    <h6 className="text-sm font-medium text-gray-700">{t('events.smsTemplates')}</h6>
                    {['en', 'fr'].map(lang => (
                      <div key={`sms-${lang}`} className="space-y-2">
                        <label className="block text-sm text-gray-600">
                          {t('events.smsMessage')} ({lang.toUpperCase()})
                        </label>
                        <textarea
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder={t('events.smsMessagePlaceholder')}
                          maxLength={160}
                          ref={assignFieldRef(`reminder-${reminder.id}-sms-${lang}`)}
                          onFocus={() => {
                            setFocusedField(`reminder-${reminder.id}-sms-${lang}`);
                            setShowVariables(true);
                          }}
                        />
                        <div className="text-xs text-gray-500 text-right">
                          160 characters max
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Available Variables Panel */}
        {showVariables && focusedField && (
          <div className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-64 z-50">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900">{t('events.availableVariables')}</h4>
              <Button
                onClick={() => setShowVariables(false)}
                variant="outline"
                size="sm"
                className="p-1"
              >
                <EyeOff className="w-4 h-4" />
              </Button>
            </div>
            <div className="text-xs text-gray-600 mb-3">
              {t('events.clickToInsert')}
            </div>
            <div className="max-h-64 overflow-y-auto space-y-1">
              {availableVariables.map(variable => (
                <button
                  key={variable}
                  onClick={() => handleVariableClick(variable)}
                  className="w-full text-left px-2 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded font-mono"
                >
                  {variable}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const tabs = [
    {
      id: 'company-info',
      label: t('company.companyInfo'),
      content: <CompanyInfoTab />
    },
    {
      id: 'events-webhooks',
      label: t('company.eventsWebhooks'),
      content: <EventsWebhooksTab />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => handleNavigation('/companies')}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('common.back')}
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">
              {t('company.createCompany')}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {hasUnsavedChanges && (
              <span className="text-sm text-amber-600 font-medium">
                {t('common.unsavedChanges')}
              </span>
            )}
            <Button
              onClick={handleSave}
              className="flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {t('common.save')}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs tabs={tabs} />
      </div>

      <Modal
        isOpen={showUnsavedModal}
        onClose={() => setShowUnsavedModal(false)}
        title={t('common.unsavedChanges')}
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            {t('common.unsavedChangesMessage')}
          </p>
          <div className="flex justify-end gap-3">
            <Button
              onClick={() => setShowUnsavedModal(false)}
              variant="outline"
            >
              {t('common.cancel')}
            </Button>
            <Button
              onClick={() => {
                setHasUnsavedChanges(false);
                setShowUnsavedModal(false);
                if (pendingNavigation) {
                  navigate(pendingNavigation);
                }
              }}
              variant="destructive"
            >
              {t('common.discardChanges')}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CreateCompanyPage;