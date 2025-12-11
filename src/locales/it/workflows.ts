export const workflows = {
  title: 'Flussi di Lavoro',
  subtitle: 'Crea e gestisci i flussi dei percorsi di ispezione',
  create: 'Crea Nuovo Percorso',
  createTitle: 'Crea Percorso di Ispezione',
  edit: 'Modifica Percorso',
  duplicate: 'Duplica Percorso',
  fields: {
    name: 'Nome Percorso',
    description: 'Descrizione',
    company: 'Azienda',
    blocksCount: 'Numero di Blocchi',
    status: 'Stato',
    isActive: 'Attivo'
  },
  blocks: {
    title: 'Blocchi del Percorso',
    addBlock: 'Aggiungi Blocco',
    form: 'Blocco Modulo',
    shootInspection: 'Blocco Ispezione Fotografica',
    fastTrack: 'Blocco Fast Track',
    addDamage: 'Blocco Aggiungi Danno',
    static: 'Blocco Schermata Statica'
  },
  blockTypes: {
    form: {
      name: 'Blocco Modulo',
      description: 'Modulo personalizzato con configurazione JSON'
    },
    shootInspection: {
      name: 'Blocco Ispezione Fotografica',
      description: 'Flusso di acquisizione foto'
    },
    fastTrack: {
      name: 'Blocco Fast Track',
      description: 'Processo di ispezione rapido'
    },
    addDamage: {
      name: 'Blocco Aggiungi Danno',
      description: 'Segnalazione manuale dei danni'
    },
    static: {
      name: 'Blocco Schermata Statica',
      description: 'Schermate statiche (onboarding/offboarding)'
    }
  },
  configuration: {
    title: 'Configurazione Percorso',
    importJson: 'Importa JSON',
    exportJson: 'Esporta JSON'
  },
  messages: {
    createSuccess: 'Percorso creato con successo',
    updateSuccess: 'Percorso aggiornato con successo',
    deleteSuccess: 'Percorso eliminato con successo',
    duplicateSuccess: 'Percorso duplicato con successo',
    deleteConfirm: 'Sei sicuro di voler eliminare questo percorso?',
    noBlocks: 'Nessun blocco aggiunto. Clicca su "Aggiungi Blocco" per iniziare a costruire il percorso.',
    nameRequired: 'Inserisci un nome per il percorso',
    blocksRequired: 'Aggiungi almeno un blocco al percorso'
  }
} as const;
