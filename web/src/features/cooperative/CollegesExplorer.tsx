import { Tabs } from '@ark-ui/solid/tabs';
import { createSignal, For } from 'solid-js';
import { css } from 'styled-system/css';

import type { VotingCollege } from '@/content/cooperative';

export type CollegesExplorerProps = { readonly colleges: readonly VotingCollege[] };

const totalWidth = 100;
const barHeight = 24;

const offsets = (colleges: readonly VotingCollege[]): readonly number[] =>
  colleges.map((_, index) =>
    colleges.slice(0, index).reduce((sum, college) => sum + college.poids, 0),
  );

const segmentStyle = css({
  opacity: '0.35',
  '&[data-selected]': { opacity: '1' },
  '@media (prefers-reduced-motion: no-preference)': {
    transitionProperty: 'opacity',
    transitionDuration: 'quick',
  },
});

export const CollegesExplorer = (props: CollegesExplorerProps) => {
  const [selected, setSelected] = createSignal(props.colleges[0]?.id ?? '');
  const starts = offsets(props.colleges);

  return (
    <Tabs.Root value={selected()} onValueChange={(details) => setSelected(details.value)}>
      <svg
        viewBox={`0 0 ${totalWidth} ${barHeight}`}
        role="img"
        aria-label={`Poids des cinq collèges de vote : ${props.colleges.map((college) => `${college.nom} ${college.poids} %`).join(' ; ')}`}
        width="100%"
      >
        <For each={props.colleges}>
          {(college, index) => (
            <g class={segmentStyle} data-selected={selected() === college.id ? '' : undefined}>
              <rect
                x={starts[index()]}
                y="0"
                width={college.poids}
                height={barHeight}
                fill="currentColor"
                stroke="var(--surface)"
                stroke-width="0.5"
              />
              <text
                x={(starts[index()] ?? 0) + college.poids / 2}
                y={barHeight / 2}
                text-anchor="middle"
                dominant-baseline="middle"
                fill="var(--surface)"
                font-size="4"
              >
                {college.poids} %
              </text>
            </g>
          )}
        </For>
      </svg>
      <Tabs.List aria-label="Collèges de vote">
        <For each={props.colleges}>
          {(college) => <Tabs.Trigger value={college.id}>{college.nom}</Tabs.Trigger>}
        </For>
        <Tabs.Indicator />
      </Tabs.List>
      <For each={props.colleges}>
        {(college) => (
          <Tabs.Content value={college.id}>
            <h3>
              {college.nom} — {college.poids} % des voix
            </h3>
            <p>{college.description}</p>
          </Tabs.Content>
        )}
      </For>
    </Tabs.Root>
  );
};
