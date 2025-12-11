export const workflows = {
  title: 'Workflows',
  subtitle: 'Inspektionsabläufe erstellen und verwalten',
  create: 'Neue Journey erstellen',
  createTitle: 'Inspektions-Journey erstellen',
  edit: 'Journey bearbeiten',
  duplicate: 'Journey duplizieren',
  fields: {
    name: 'Name der Journey',
    description: 'Beschreibung',
    company: 'Unternehmen',
    blocksCount: 'Anzahl der Blöcke',
    status: 'Status',
    isActive: 'Aktiv'
  },
  blocks: {
    title: 'Journey-Blöcke',
    addBlock: 'Block hinzufügen',
    form: 'Formularblock',
    shootInspection: 'Fotoinspektionsblock',
    fastTrack: 'Fast-Track-Block',
    addDamage: 'Schadensblock hinzufügen',
    static: 'Statischer Bildschirmblock'
  },
  blockTypes: {
    form: {
      name: 'Formularblock',
      description: 'Benutzerdefiniertes Formular mit JSON-Konfiguration'
    },
    shootInspection: {
      name: 'Fotoinspektionsblock',
      description: 'Workflow für Fotoaufnahmen'
    },
    fastTrack: {
      name: 'Fast-Track-Block',
      description: 'Schneller Inspektionsprozess'
    },
    addDamage: {
      name: 'Schadensblock hinzufügen',
      description: 'Manuelle Schadensmeldung'
    },
    static: {
      name: 'Statischer Bildschirmblock',
      description: 'Statische Inhaltsbildschirme (Onboarding/Offboarding)'
    }
  },
  configuration: {
    title: 'Journey-Konfiguration',
    importJson: 'JSON importieren',
    exportJson: 'JSON exportieren'
  },
  messages: {
    createSuccess: 'Journey erfolgreich erstellt',
    updateSuccess: 'Journey erfolgreich aktualisiert',
    deleteSuccess: 'Journey erfolgreich gelöscht',
    duplicateSuccess: 'Journey erfolgreich dupliziert',
    deleteConfirm: 'Sind Sie sicher, dass Sie diese Journey löschen möchten?',
    noBlocks: 'Es wurden noch keine Blöcke hinzugefügt. Klicken Sie auf „Block hinzufügen“, um Ihre Journey zu starten.',
    nameRequired: 'Bitte geben Sie einen Journey-Namen ein',
    blocksRequired: 'Bitte fügen Sie der Journey mindestens einen Block hinzu'
  }
} as const;
