export const shootInspect = {
  title: 'Konfiguration av fotoinspektion',
  subtitle: 'Konfigurera arbetsflöde och inställningar för fotoinspelning',
  fields: {
    name: 'Konfigurationsnamn',
    description: 'Beskrivning',
    maxRetries: 'Max antal försök',
    qualityCheckEnabled: 'Kvalitetskontroll aktiverad',
    photoAngles: 'Foto-vinklar',
    allowedDamageTypes: 'Tillåtna skadetyper'
  },
  angles: {
    front: 'Fram',
    back: 'Bak',
    leftSide: 'Vänster sida',
    rightSide: 'Höger sida',
    interior: 'Interiör',
    dashboard: 'Instrumentbräda'
  },
  damageTypes: {
    carBody: 'Bilkaross',
    interior: 'Interiör',
    glazings: 'Glasytor',
    dashboard: 'Instrumentbräda',
    declaration: 'Deklaration',
    documents: 'Dokument'
  },
  steps: {
    title: 'Inspektionssteg',
    addStep: 'Lägg till steg',
    editStep: 'Redigera steg',
    removeStep: 'Ta bort steg',
    stepOrder: 'Steg {{order}}',
    stepTitle: 'Stegtitel',
    stepDescription: 'Stegbeskrivning',
    isOptional: 'Valfritt steg',
    showHelp: 'Visa hjälp',
    runDetection: 'Kör detektion',
    thumbnailUrl: 'Miniatyr-URL',
    overlayUrl: 'Överläggs-URL'
  },
  messages: {
    createSuccess: 'Fotoinspektionskonfiguration skapad',
    updateSuccess: 'Fotoinspektionskonfiguration uppdaterad',
    deleteSuccess: 'Fotoinspektionskonfiguration raderad',
    stepAdded: 'Steg tillagt',
    stepRemoved: 'Steg borttaget',
    invalidConfiguration: 'Ogiltigt konfigurationsformat'
  }
} as const;
