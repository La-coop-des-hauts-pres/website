import { NumberInput } from '@ark-ui/solid/number-input';
import { createMemo, createSignal, For } from 'solid-js';

import type { VotingCollege } from '@/content/cooperative';

import { weightedOutcome } from './voting';

export type VoteSimulatorProps = { readonly colleges: readonly VotingCollege[] };

type Tally = { readonly inFavour: number; readonly against: number };

const percent = (share: number): string => `${Math.round(share * 1000) / 10} %`;

const VoteCounter = (props: {
  readonly label: string;
  readonly value: number;
  readonly onChange: (value: number) => void;
}) => (
  <NumberInput.Root
    min={0}
    max={9999}
    value={String(props.value)}
    onValueChange={(details) =>
      props.onChange(Number.isNaN(details.valueAsNumber) ? 0 : details.valueAsNumber)
    }
  >
    <NumberInput.Label>{props.label}</NumberInput.Label>
    <NumberInput.Control>
      <NumberInput.DecrementTrigger aria-label={`Retirer une voix — ${props.label}`}>
        −
      </NumberInput.DecrementTrigger>
      <NumberInput.Input />
      <NumberInput.IncrementTrigger aria-label={`Ajouter une voix — ${props.label}`}>
        +
      </NumberInput.IncrementTrigger>
    </NumberInput.Control>
  </NumberInput.Root>
);

export const VoteSimulator = (props: VoteSimulatorProps) => {
  const [tallies, setTallies] = createSignal<Readonly<Record<string, Tally>>>({});
  const tallyOf = (id: string): Tally => tallies()[id] ?? { inFavour: 0, against: 0 };
  const update = (id: string, patch: Partial<Tally>) =>
    setTallies((current) => ({ ...current, [id]: { ...tallyOf(id), ...patch } }));

  const outcome = createMemo(() =>
    weightedOutcome(
      props.colleges.map((college) => ({
        weight: college.poids,
        inFavour: tallyOf(college.id).inFavour,
        against: tallyOf(college.id).against,
      })),
    ),
  );

  return (
    <form onSubmit={(event) => event.preventDefault()} aria-labelledby="simulator-title">
      <h3 id="simulator-title">Simulateur de vote pondéré</h3>
      <p>
        Dans chaque collège, chaque sociétaire a une voix. Les voix sont totalisées par collège,
        puis reportées au prorata des « pour » et des « contre », avec le coefficient du collège .
        Un collège où personne ne vote est ignoré dans cette simulation.
      </p>
      <For each={props.colleges}>
        {(college) => (
          <fieldset>
            <legend>
              {college.nom} ({college.poids} %)
            </legend>
            <VoteCounter
              label={`Pour — ${college.nom}`}
              value={tallyOf(college.id).inFavour}
              onChange={(value) => update(college.id, { inFavour: value })}
            />
            <VoteCounter
              label={`Contre — ${college.nom}`}
              value={tallyOf(college.id).against}
              onChange={(value) => update(college.id, { against: value })}
            />
          </fieldset>
        )}
      </For>
      <div role="status" aria-live="polite">
        <h4>Résultat pondéré</h4>
        <svg
          viewBox="0 0 100 8"
          role="img"
          aria-label={`Part des voix pondérées pour : ${percent(outcome().inFavourShare)}`}
          width="100%"
        >
          <rect
            x="0"
            y="0"
            width="100"
            height="8"
            fill="none"
            stroke="currentColor"
            stroke-width="0.4"
          />
          <rect x="0" y="0" width={outcome().inFavourShare * 100} height="8" fill="currentColor" />
          <line
            x1="50"
            x2="50"
            y1="0"
            y2="8"
            stroke="var(--surface)"
            stroke-width="0.4"
            stroke-dasharray="1 1"
          />
          <line x1="66.67" x2="66.67" y1="0" y2="8" stroke="var(--surface)" stroke-width="0.4" />
        </svg>
        <p>
          Pour : {percent(outcome().inFavourShare)} — Contre : {percent(outcome().againstShare)}
        </p>
        <ul>
          <li>
            Majorité simple (assemblée ordinaire) :{' '}
            {outcome().isSimpleMajority ? 'atteinte' : 'non atteinte'}
          </li>
          <li>
            Majorité des 2/3 (assemblée extraordinaire) :{' '}
            {outcome().isQualifiedMajority ? 'atteinte' : 'non atteinte'}
          </li>
          <li>
            Collèges ayant voté : {outcome().countedColleges}
            {outcome().countedColleges > 0 && !outcome().hasPonderationMinimum
              ? ' — en dessous de 3 collèges, la pondération ne s’applique pas'
              : ''}
          </li>
        </ul>
      </div>
    </form>
  );
};
