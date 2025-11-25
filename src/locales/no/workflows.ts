export const workflows = {
  title: 'Arbeidsflyter',
  subtitle: 'Opprett og administrer inspeksjonsreise-arbeidsflyter',
  create: 'Opprett ny reise',
  edit: 'Rediger reise',
  duplicate: 'Dupliser reise',
  fields: {
    name: 'Reisenavn',
    description: 'Beskrivelse',
    company: 'Selskap',
    blocksCount: 'Antall blokker',
    status: 'Status',
    isActive: 'Aktiv'
  },
  blocks: {
    title: 'Reiseblokker',
    addBlock: 'Legg til blokk',
    form: 'Skjemablokk',
    shootInspection: 'Fotoinspiseringsblokk',
    fastTrack: 'Rask spor-blokk',
    addDamage: 'Legg til skadeblokk',
    static: 'Statisk skjermblokk'
  },
  blockTypes: {
    form: {
      name: 'Skjemablokk',
      description: 'Egendefinert skjema med JSON-konfigurasjon'
    },
    shootInspection: {
      name: 'Fotoinspiseringsblokk',
      description: 'Fotoinnsamlingsarbeidsflyt'
    },
    fastTrack: {
      name: 'Rask spor-blokk',
      description: 'Rask inspeksjonsprosess'
    },
    addDamage: {
      name: 'Legg til skadeblokk',
      description: 'Manuell skaderapportering'
    },
    static: {
      name: 'Statisk skjermblokk',
      description: 'Statisk innhold (onboarding/offboarding)'
    }
  },
  configuration: {
    title: 'Reisekonfigurasjon',
    importJson: 'Importer JSON',
    exportJson: 'Eksporter JSON'
  },
  messages: {
    createSuccess: 'Reise opprettet',
    updateSuccess: 'Reise oppdatert',
    deleteSuccess: 'Reise slettet',
    duplicateSuccess: 'Reise duplisert',
    deleteConfirm: 'Er du sikker på at du vil slette denne reisen?',
    noBlocks: 'Ingen blokker lagt til ennå. Klikk "Legg til blokk" for å starte reisen.',
    nameRequired: 'Vennligst skriv inn et reisenavn',
    blocksRequired: 'Vennligst legg til minst én blokk i reisen'
  }
} as const;
