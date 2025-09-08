import 'react-i18next';
import type { common } from '@/locales/en/common';
import type { company } from '@/locales/en/company';
import type { apiToken } from '@/locales/en/apiToken';
import type { users } from '@/locales/en/users';
import type { settings } from '@/locales/en/settings';
import type { events } from '@/locales/en/events';
import type { costs } from '@/locales/en/costs';
import type { workflows } from '@/locales/en/workflows';
import type { shootInspect } from '@/locales/en/shootInspect';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof common;
      company: typeof company;
      apiToken: typeof apiToken;
      users: typeof users;
      settings: typeof settings;
      events: typeof events;
      costs: typeof costs;
      workflows: typeof workflows;
      shootInspect: typeof shootInspect;
    };
  }
}