export const costs = {
  title: 'Kostnadsmatriser',
  subtitle: 'Administrer reparasjonskostnader etter deltype, plassering og alvorlighetsgrad',
  create: 'Opprett ny matrise',
  createTitle: 'Opprett Kostnadsmatrise',
  edit: 'Rediger kostnadsmatrise',
  fields: {
    company: 'Selskap',
    currency: 'Valuta',
    taxRate: 'Skattesats (%)',
    partsCount: 'Antall deler',
    partType: 'Deltype',
    location: 'Plassering',
    severity: 'Alvorlighetsgrad',
    cost: 'Kostnad'
  },
  severities: {
    minor: 'Mindre',
    moderate: 'Moderat',
    major: 'Stor',
    severe: 'Alvorlig'
  },
  locations: {
    front: 'Front',
    rear: 'Bak',
    left: 'Venstre',
    right: 'Høyre',
    roof: 'Tak',
    interior: 'Interiør'
  },
  actions: {
    addPart: 'Legg til del',
    removePart: 'Fjern del',
    importCsv: 'Importer CSV',
    exportCsv: 'Eksporter CSV',
    bulkEdit: 'Bulkredigering'
  },
  modals: {
    editTitle: 'Rediger matrise - {{name}}',
    deleteTitle: 'Bekreft Sletting',
    duplicateTitle: 'Dupliser Kostnadsmatrise'
  },
  messages: {
    createSuccess: 'Kostnadsmatrise opprettet',
    updateSuccess: 'Kostnadsmatrise oppdatert',
    deleteSuccess: 'Kostnadsmatrise slettet',
    importSuccess: 'CSV importert',
    exportSuccess: 'CSV eksportert',
    invalidCsv: 'Ugyldig CSV-format'
  }
} as const;
