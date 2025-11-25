import { useState, useCallback } from 'react';

/**
 * Hook pour gérer l'état d'une modale avec données associées
 * @template T Type des données associées à la modale
 * @returns Object avec isOpen, data, open, close
 *
 * @example
 * const deleteModal = useModalState<User>();
 * // Ouvrir avec données
 * deleteModal.open(user);
 * // Accéder aux données
 * deleteModal.data // User | undefined
 * // Fermer
 * deleteModal.close();
 */
export function useModalState<T = undefined>() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<T | undefined>();

  const open = useCallback((modalData?: T) => {
    setData(modalData);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setData(undefined);
  }, []);

  return { isOpen, data, open, close };
}
