export const workflows = {
  title: 'Arbetsflöden',
  subtitle: 'Skapa och hantera inspektionsresors arbetsflöden',
  create: 'Skapa Ny Resa',
  edit: 'Redigera Resa',
  duplicate: 'Duplicera Resa',
  fields: {
    name: 'Resans Namn',
    description: 'Beskrivning',
    company: 'Företag',
    blocksCount: 'Antal Block',
    status: 'Status',
    isActive: 'Aktiv'
  },
  blocks: {
    title: 'Resans Block',
    addBlock: 'Lägg till Block',
    form: 'Formulärblock',
    shootInspection: 'Fotoinspelningsblock',
    fastTrack: 'Snabbspårsblock',
    addDamage: 'Lägg till Skadeblock',
    static: 'Statisk Skärmblock'
  },
  blockTypes: {
    form: {
      name: 'Formulärblock',
      description: 'Anpassat formulär med JSON-konfiguration'
    },
    shootInspection: {
      name: 'Fotoinspelningsblock',
      description: 'Arbetsflöde för fotoinspelning'
    },
    fastTrack: {
      name: 'Snabbspårsblock',
      description: 'Snabb inspektionsprocess'
    },
    addDamage: {
      name: 'Lägg till Skadeblock',
      description: 'Manuell skadeanmälan'
    },
    static: {
      name: 'Statisk Skärmblock',
      description: 'Statiska innehållsskärmar (onboarding/offboarding)'
    }
  },
  configuration: {
    title: 'Resans Konfiguration',
    importJson: 'Importera JSON',
    exportJson: 'Exportera JSON'
  },
  messages: {
    createSuccess: 'Resa skapad',
    updateSuccess: 'Resa uppdaterad',
    deleteSuccess: 'Resa borttagen',
    duplicateSuccess: 'Resa duplicerad',
    deleteConfirm: 'Är du säker på att du vill ta bort denna resa?',
    noBlocks: 'Inga block har lagts till ännu. Klicka på "Lägg till Block" för att börja bygga din resa.',
    nameRequired: 'Ange ett resnamn',
    blocksRequired: 'Lägg till minst ett block i resan'
  }
} as const;
