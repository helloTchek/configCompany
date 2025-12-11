export const costs = {
  title: 'Kostenmatrices',
  subtitle: 'Beheer reparatiekosten per type onderdeel, locatie en ernst',
  create: 'Nieuwe matrix aanmaken',
  createTitle: 'Kostenmatrix Aanmaken',
  edit: 'Kostenmatrix bewerken',
  fields: {
    company: 'Bedrijf',
    currency: 'Valuta',
    taxRate: 'Belastingtarief (%)',
    partsCount: 'Aantal onderdelen',
    partType: 'Type onderdeel',
    location: 'Locatie',
    severity: 'Ernst',
    cost: 'Kosten'
  },
  severities: {
    minor: 'Mild',
    moderate: 'Gemiddeld',
    major: 'Ernstig',
    severe: 'Zeer ernstig'
  },
  locations: {
    front: 'Voor',
    rear: 'Achter',
    left: 'Links',
    right: 'Rechts',
    roof: 'Dak',
    interior: 'Interieur'
  },
  actions: {
    addPart: 'Onderdeel toevoegen',
    removePart: 'Onderdeel verwijderen',
    importCsv: 'CSV importeren',
    exportCsv: 'CSV exporteren',
    bulkEdit: 'Bulkbewerking'
  },
  modals: {
    editTitle: 'Matrix bewerken - {{name}}',
    deleteTitle: 'Verwijdering Bevestigen',
    duplicateTitle: 'Kostenmatrix Dupliceren'
  },
  messages: {
    createSuccess: 'Kostenmatrix succesvol aangemaakt',
    updateSuccess: 'Kostenmatrix succesvol bijgewerkt',
    deleteSuccess: 'Kostenmatrix succesvol verwijderd',
    importSuccess: 'CSV succesvol geïmporteerd',
    exportSuccess: 'CSV succesvol geëxporteerd',
    invalidCsv: 'Ongeldig CSV-formaat'
  }
} as const;
