import type { StoryMeta } from '@/styleguide/types';

import { TextField } from './TextField';

export default { title: 'UI/TextField' } satisfies StoryMeta;

export const Default = () => <TextField label="Nom" name="name" autocomplete="family-name" />;
export const WithHelper = () => (
  <TextField label="Courriel" name="email" type="email" helperText="Nous ne le partagerons pas." />
);
export const WithError = () => (
  <TextField label="Téléphone" name="phone" type="tel" required errorText="Numéro invalide." />
);
