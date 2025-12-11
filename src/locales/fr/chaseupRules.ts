export const chaseupRules = {
  title: 'TEST',
  subtitle: 'Manage automated chase-up rules for your companies',
  create: 'Create Chase-up Rule',
  edit: 'Edit Chase-up Rule',
  fields: {
    company: 'Company',
    type: 'Type',
    activationDate: 'Activation Date',
    utcTime: 'UTC Time',
    maxSendings: 'test',
    firstDelay: 'First Delay',
    secondDelay: 'Second Delay',
    thirdDelay: 'Third Delay',
  },
  types: {
    event: 'Event',
    time: 'Time'
  },
  actions: {
    duplicate: 'Duplicate Rule',
    delete: 'Delete Rule'
  },
  messages: {
    createSuccess: 'Chase-up rule created successfully',
    updateSuccess: 'Chase-up rule updated successfully',
    deleteSuccess: 'Chase-up rule deleted successfully',
    duplicateSuccess: 'Chase-up rule duplicated successfully',
    noRulesFound: 'No chase-up rules found matching your criteria.'
  },
  filters: {
    allTypes: 'All Types',
    allCompanies: 'All Companies'
  }
} as const;
