export const costs = {
  title: 'Matrici dei costi',
  subtitle: 'Gestisci i costi di riparazione per tipo di componente, posizione e gravità',
  create: 'Crea nuova matrice',
  createTitle: 'Crea Matrice dei Costi',
  edit: 'Modifica matrice dei costi',
  fields: {
    company: 'Azienda',
    currency: 'Valuta',
    taxRate: 'Aliquota fiscale (%)',
    partsCount: 'Numero di componenti',
    partType: 'Tipo di componente',
    location: 'Posizione',
    severity: 'Gravità',
    cost: 'Costo'
  },
  severities: {
    minor: 'Minore',
    moderate: 'Moderata',
    major: 'Maggiore',
    severe: 'Grave'
  },
  locations: {
    front: 'Anteriore',
    rear: 'Posteriore',
    left: 'Sinistra',
    right: 'Destra',
    roof: 'Tetto',
    interior: 'Interno'
  },
  actions: {
    addPart: 'Aggiungi componente',
    removePart: 'Rimuovi componente',
    importCsv: 'Importa CSV',
    exportCsv: 'Esporta CSV',
    bulkEdit: 'Modifica in blocco'
  },
  modals: {
    editTitle: 'Modifica Matrice - {{name}}',
    deleteTitle: 'Conferma Eliminazione',
    duplicateTitle: 'Duplica Matrice dei Costi'
  },
  messages: {
    createSuccess: 'Matrice dei costi creata con successo',
    updateSuccess: 'Matrice dei costi aggiornata con successo',
    deleteSuccess: 'Matrice dei costi eliminata con successo',
    importSuccess: 'CSV importato con successo',
    exportSuccess: 'CSV esportato con successo',
    invalidCsv: 'Formato CSV non valido'
  }
} as const;
