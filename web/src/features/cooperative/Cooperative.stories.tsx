import { votingColleges } from '@/content/cooperative';
import type { StoryMeta } from '@/styleguide/types';

import { CollegesExplorer } from './CollegesExplorer';
import { VoteSimulator } from './VoteSimulator';

export default { title: 'Cooperative' } satisfies StoryMeta;

export const Colleges = () => <CollegesExplorer colleges={votingColleges} />;
export const Simulateur = () => <VoteSimulator colleges={votingColleges} />;
