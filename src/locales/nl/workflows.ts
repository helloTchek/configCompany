export const workflows = {
  title: 'Workflows',
  subtitle: 'Maak en beheer inspectie-reisworkflows',
  create: 'Nieuwe reis aanmaken',
  createTitle: 'Inspectiereis Aanmaken',
  edit: 'Reis bewerken',
  duplicate: 'Reis dupliceren',
  fields: {
    name: 'Reisnaam',
    description: 'Beschrijving',
    company: 'Bedrijf',
    blocksCount: 'Aantal blokken',
    status: 'Status',
    isActive: 'Actief'
  },
  blocks: {
    title: 'Reisblokken',
    addBlock: 'Blok toevoegen',
    form: 'Formulierblok',
    shootInspection: 'Fotoblok inspectie',
    fastTrack: 'Snelspoorblok',
    addDamage: 'Blok schade toevoegen',
    static: 'Statisch schermblok'
  },
  blockTypes: {
    form: {
      name: 'Formulierblok',
      description: 'Aangepast formulier met JSON-configuratie'
    },
    shootInspection: {
      name: 'Fotoblok inspectie',
      description: 'Workflow voor het maken van foto\'s'
    },
    fastTrack: {
      name: 'Snelspoorblok',
      description: 'Snelle inspectieprocedure'
    },
    addDamage: {
      name: 'Blok schade toevoegen',
      description: 'Handmatige schade-aangifte'
    },
    static: {
      name: 'Statisch schermblok',
      description: 'Statische contentschermen (onboarding/offboarding)'
    }
  },
  configuration: {
    title: 'Reisconfiguratie',
    importJson: 'JSON importeren',
    exportJson: 'JSON exporteren'
  },
  modals: {
    editJourneyTitle: 'Reis bewerken - {{name}}',
    duplicateTitle: 'Reis dupliceren',
    duplicateMessage: 'Een kopie maken van',
    deleteTitle: 'Reis verwijderen',
    deleteMessage: 'Weet u zeker dat u {{name}} wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt.'
  },
  messages: {
    createSuccess: 'Reis succesvol aangemaakt',
    updateSuccess: 'Reis succesvol bijgewerkt',
    deleteSuccess: 'Reis succesvol verwijderd',
    duplicateSuccess: 'Reis succesvol gedupliceerd',
    deleteConfirm: 'Weet u zeker dat u deze reis wilt verwijderen?',
    noBlocks: 'Er zijn nog geen blokken toegevoegd. Klik op "Blok toevoegen" om uw reis te starten.',
    nameRequired: 'Voer een reisnaam in',
    blocksRequired: 'Voeg ten minste één blok toe aan de reis'
  }
} as const;
