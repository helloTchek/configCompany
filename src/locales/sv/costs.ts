export const costs = {
  title: 'Kostnadsmatriser',
  subtitle: 'Hantera reparationskostnader efter deltyp, plats och allvarlighetsgrad',
  create: 'Skapa ny matris',
  createTitle: 'Skapa Kostnadsmatris',
  edit: 'Redigera kostnadsmatris',
  fields: {
    company: 'Företag',
    currency: 'Valuta',
    taxRate: 'Momssats (%)',
    partsCount: 'Antal delar',
    partType: 'Deltyp',
    location: 'Plats',
    severity: 'Allvarlighetsgrad',
    cost: 'Kostnad'
  },
  severities: {
    minor: 'Mindre',
    moderate: 'Måttlig',
    major: 'Stor',
    severe: 'Allvarlig'
  },
  locations: {
    front: 'Fram',
    rear: 'Bak',
    left: 'Vänster',
    right: 'Höger',
    roof: 'Tak',
    interior: 'Interiör'
  },
  actions: {
    addPart: 'Lägg till del',
    removePart: 'Ta bort del',
    importCsv: 'Importera CSV',
    exportCsv: 'Exportera CSV',
    bulkEdit: 'Redigera i bulk'
  },
  modals: {
    editTitle: 'Redigera Matris - {{name}}',
    deleteTitle: 'Bekräfta Borttagning',
    duplicateTitle: 'Duplicera Kostnadsmatris'
  },
  messages: {
    createSuccess: 'Kostnadsmatris skapad framgångsrikt',
    updateSuccess: 'Kostnadsmatris uppdaterad framgångsrikt',
    deleteSuccess: 'Kostnadsmatris raderad framgångsrikt',
    importSuccess: 'CSV importerad framgångsrikt',
    exportSuccess: 'CSV exporterad framgångsrikt',
    invalidCsv: 'Ogiltigt CSV-format'
  }
} as const;
