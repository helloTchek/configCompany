export const shootInspect = {
  title: 'Fotoinspektions-Konfiguration',
  subtitle: 'Workflow und Einstellungen für Fotoaufnahmen konfigurieren',
  fields: {
    name: 'Konfigurationsname',
    description: 'Beschreibung',
    maxRetries: 'Maximale Wiederholungen',
    qualityCheckEnabled: 'Qualitätskontrolle aktiviert',
    photoAngles: 'Foto-Winkel',
    allowedDamageTypes: 'Erlaubte Schadensarten'
  },
  angles: {
    front: 'Vorne',
    back: 'Hinten',
    leftSide: 'Linke Seite',
    rightSide: 'Rechte Seite',
    interior: 'Innenraum',
    dashboard: 'Armaturenbrett'
  },
  damageTypes: {
    carBody: 'Karosserie',
    interior: 'Innenraum',
    glazings: 'Verglasungen',
    dashboard: 'Armaturenbrett',
    declaration: 'Deklaration',
    documents: 'Dokumente'
  },
  steps: {
    title: 'Inspektionsschritte',
    addStep: 'Schritt hinzufügen',
    editStep: 'Schritt bearbeiten',
    removeStep: 'Schritt entfernen',
    stepOrder: 'Schritt {{order}}',
    stepTitle: 'Schritt-Titel',
    stepDescription: 'Schrittbeschreibung',
    isOptional: 'Optionaler Schritt',
    showHelp: 'Hilfe anzeigen',
    runDetection: 'Erkennung ausführen',
    thumbnailUrl: 'Thumbnail-URL',
    overlayUrl: 'Overlay-URL'
  },
  messages: {
    createSuccess: 'Fotoinspektions-Konfiguration erfolgreich erstellt',
    updateSuccess: 'Fotoinspektions-Konfiguration erfolgreich aktualisiert',
    deleteSuccess: 'Fotoinspektions-Konfiguration erfolgreich gelöscht',
    stepAdded: 'Schritt erfolgreich hinzugefügt',
    stepRemoved: 'Schritt erfolgreich entfernt',
    invalidConfiguration: 'Ungültiges Konfigurationsformat'
  }
} as const;
