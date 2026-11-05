import type { StoryMeta } from '@/styleguide/types';

import { Accordion } from './Accordion';

export default { title: 'UI/Accordion' } satisfies StoryMeta;

export const Default = () => (
  <Accordion
    entries={[
      { value: 'hours', title: 'Horaires', content: 'Du mardi au samedi.' },
      { value: 'access', title: 'Accès', content: 'Parking à proximité.' },
    ]}
  />
);
