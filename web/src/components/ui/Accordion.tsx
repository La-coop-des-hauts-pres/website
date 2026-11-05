import { Accordion as ArkAccordion } from '@ark-ui/solid/accordion';
import { For, type JSX } from 'solid-js';
import { css } from 'styled-system/css';

const rootStyle = css({
  display: 'flex',
  flexDirection: 'column',
  borderBlockStart: '1px solid var(--line)',
});
const itemStyle = css({ borderBlockEnd: '1px solid var(--line)' });
const triggerStyle = css({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
  minHeight: 'action',
  paddingBlock: '3',
  background: 'none',
  border: 'none',
  color: 'ink',
  fontFamily: 'inherit',
  fontSize: 'lg',
  fontWeight: '600',
  textAlign: 'start',
  cursor: 'pointer',
});
const contentStyle = css({ paddingBlockEnd: '4', color: 'inkMuted' });

export type AccordionEntry = {
  readonly value: string;
  readonly title: string;
  readonly content: JSX.Element;
};

export type AccordionProps = {
  readonly entries: readonly AccordionEntry[];
  readonly multiple?: boolean;
};

export const Accordion = (props: AccordionProps) => (
  <ArkAccordion.Root class={rootStyle} collapsible multiple={props.multiple === true}>
    <For each={props.entries}>
      {(entry) => (
        <ArkAccordion.Item class={itemStyle} value={entry.value}>
          <h3>
            <ArkAccordion.ItemTrigger class={triggerStyle}>
              {entry.title}
              <ArkAccordion.ItemIndicator aria-hidden="true">+</ArkAccordion.ItemIndicator>
            </ArkAccordion.ItemTrigger>
          </h3>
          <ArkAccordion.ItemContent class={contentStyle}>{entry.content}</ArkAccordion.ItemContent>
        </ArkAccordion.Item>
      )}
    </For>
  </ArkAccordion.Root>
);
