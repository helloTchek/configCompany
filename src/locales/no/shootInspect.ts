export const shootInspect = {
  title: 'Konfigurasjon av Fotoinspesjon',
  subtitle: 'Konfigurer arbeidsflyt for fotoinnsamling og innstillinger',
  fields: {
    name: 'Konfigurasjonsnavn',
    description: 'Beskrivelse',
    maxRetries: 'Maks antall forsøk',
    qualityCheckEnabled: 'Kvalitetssjekk aktivert',
    photoAngles: 'Fotovinkler',
    allowedDamageTypes: 'Tillatte skadetyper'
  },
  angles: {
    front: 'Front',
    back: 'Bak',
    leftSide: 'Venstre side',
    rightSide: 'Høyre side',
    interior: 'Interiør',
    dashboard: 'Instrumentpanel'
  },
  damageTypes: {
    carBody: 'Bilkarosseri',
    interior: 'Interiør',
    glazings: 'Glass/Glasstak',
    dashboard: 'Instrumentpanel',
    declaration: 'Deklarasjon',
    documents: 'Dokumenter'
  },
  steps: {
    title: 'Inspeksjonstrinn',
    addStep: 'Legg til trinn',
    editStep: 'Rediger trinn',
    removeStep: 'Fjern trinn',
    stepOrder: 'Trinn {{order}}',
    stepTitle: 'Trinntittel',
    stepDescription: 'Trinbeskrivelse',
    isOptional: 'Valgfritt trinn',
    showHelp: 'Vis hjelp',
    runDetection: 'Kjør deteksjon',
    thumbnailUrl: 'Miniatyrbilde-URL',
    overlayUrl: 'Overlegg-URL'
  },
  messages: {
    createSuccess: 'Fotoinspesjonskonfigurasjon opprettet',
    updateSuccess: 'Fotoinspesjonskonfigurasjon oppdatert',
    deleteSuccess: 'Fotoinspesjonskonfigurasjon slettet',
    stepAdded: 'Trinn lagt til',
    stepRemoved: 'Trinn fjernet',
    invalidConfiguration: 'Ugyldig konfigurasjonsformat'
  }
} as const;
