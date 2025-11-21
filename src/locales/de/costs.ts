export const costs = {
  title: 'Kostenmatrizen',
  subtitle: 'Reparaturkosten nach Teiltypen, Positionen und Schweregraden verwalten',
  create: 'Neue Matrix erstellen',
  edit: 'Kostenmatrix bearbeiten',
  fields: {
    company: 'Unternehmen',
    currency: 'Währung',
    taxRate: 'Steuersatz (%)',
    partsCount: 'Anzahl der Teile',
    partType: 'Teiletyp',
    location: 'Position',
    severity: 'Schweregrad',
    cost: 'Kosten'
  },
  severities: {
    minor: 'Gering',
    moderate: 'Mittel',
    major: 'Hoch',
    severe: 'Schwer'
  },
  locations: {
    front: 'Vorne',
    rear: 'Hinten',
    left: 'Links',
    right: 'Rechts',
    roof: 'Dach',
    interior: 'Innenraum'
  },
  actions: {
    addPart: 'Teil hinzufügen',
    removePart: 'Teil entfernen',
    importCsv: 'CSV importieren',
    exportCsv: 'CSV exportieren',
    bulkEdit: 'Massenbearbeitung'
  },
  messages: {
    createSuccess: 'Kostenmatrix erfolgreich erstellt',
    updateSuccess: 'Kostenmatrix erfolgreich aktualisiert',
    deleteSuccess: 'Kostenmatrix erfolgreich gelöscht',
    importSuccess: 'CSV erfolgreich importiert',
    exportSuccess: 'CSV erfolgreich exportiert',
    invalidCsv: 'Ungültiges CSV-Format'
  }
} as const;
