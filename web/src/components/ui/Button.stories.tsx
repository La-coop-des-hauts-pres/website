import type { StoryMeta } from '@/styleguide/types';

import { Button } from './Button';

export default { title: 'UI/Button' } satisfies StoryMeta;

export const Solid = () => <Button>Action principale</Button>;
export const Outline = () => <Button variant="outline">Action secondaire</Button>;
export const Ghost = () => <Button variant="ghost">Action discrète</Button>;
export const Disabled = () => <Button disabled>Indisponible</Button>;
