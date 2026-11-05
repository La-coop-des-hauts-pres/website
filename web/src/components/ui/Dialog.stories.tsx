import type { StoryMeta } from '@/styleguide/types';

import { Dialog } from './Dialog';

export default { title: 'UI/Dialog' } satisfies StoryMeta;

export const Default = () => (
  <Dialog
    triggerLabel="Ouvrir"
    title="Titre de la fenêtre"
    description="Contenu descriptif de la fenêtre."
    closeLabel="Fermer"
  />
);
