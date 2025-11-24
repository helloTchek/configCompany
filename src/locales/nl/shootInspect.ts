export const shootInspect = {
  title: 'Shoot Inspectie Configuratie',
  subtitle: 'Configureer workflow en instellingen voor foto-opnames',
  fields: {
    name: 'Configuratienaam',
    description: 'Beschrijving',
    maxRetries: 'Maximaal aantal pogingen',
    qualityCheckEnabled: 'Kwaliteitscontrole ingeschakeld',
    photoAngles: 'Fotohoeken',
    allowedDamageTypes: 'Toegestane schade-types'
  },
  angles: {
    front: 'Voorzijde',
    back: 'Achterzijde',
    leftSide: 'Linkerzijde',
    rightSide: 'Rechterzijde',
    interior: 'Interieur',
    dashboard: 'Dashboard'
  },
  damageTypes: {
    carBody: 'Carrosserie',
    interior: 'Interieur',
    glazings: 'Ruiten',
    dashboard: 'Dashboard',
    declaration: 'Verklaring',
    documents: 'Documenten'
  },
  steps: {
    title: 'Inspectiestappen',
    addStep: 'Stap toevoegen',
    editStep: 'Stap bewerken',
    removeStep: 'Stap verwijderen',
    stepOrder: 'Stap {{order}}',
    stepTitle: 'Staptitel',
    stepDescription: 'Stapbeschrijving',
    isOptional: 'Optionele stap',
    showHelp: 'Toon hulp',
    runDetection: 'Detectie uitvoeren',
    thumbnailUrl: 'Miniatuur-URL',
    overlayUrl: 'Overlay-URL'
  },
  messages: {
    createSuccess: 'Shoot inspectie configuratie succesvol aangemaakt',
    updateSuccess: 'Shoot inspectie configuratie succesvol bijgewerkt',
    deleteSuccess: 'Shoot inspectie configuratie succesvol verwijderd',
    stepAdded: 'Stap succesvol toegevoegd',
    stepRemoved: 'Stap succesvol verwijderd',
    invalidConfiguration: 'Ongeldig configuratieformaat'
  }
} as const;
