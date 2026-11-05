import { Dialog as ArkDialog } from '@ark-ui/solid/dialog';
import type { JSX } from 'solid-js';
import { Portal } from 'solid-js/web';
import { css } from 'styled-system/css';

import { Button } from './Button';

const backdropStyle = css({
  position: 'fixed',
  inset: '0',
  background: 'rgb(0 0 0 / 0.5)',
  zIndex: '50',
});
const positionerStyle = css({
  position: 'fixed',
  inset: '0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '4',
  zIndex: '51',
});
const contentStyle = css({
  width: '100%',
  maxWidth: '32rem',
  maxHeight: '90dvh',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '3',
  padding: '6',
  borderRadius: 'lg',
  background: 'surface',
  color: 'ink',
  boxShadow: 'raised',
});
const titleStyle = css({ fontSize: 'xl', fontWeight: '700', lineHeight: 'title' });
const descriptionStyle = css({ color: 'inkMuted' });

export type DialogProps = {
  readonly triggerLabel: string;
  readonly title: string;
  readonly description?: string;
  readonly closeLabel: string;
  readonly children?: JSX.Element;
};

export const Dialog = (props: DialogProps) => (
  <ArkDialog.Root lazyMount unmountOnExit>
    <ArkDialog.Trigger
      asChild={(triggerProps) => <Button {...triggerProps()}>{props.triggerLabel}</Button>}
    />
    <Portal>
      <ArkDialog.Backdrop class={backdropStyle} />
      <ArkDialog.Positioner class={positionerStyle}>
        <ArkDialog.Content class={contentStyle}>
          <ArkDialog.Title class={titleStyle}>{props.title}</ArkDialog.Title>
          {props.description !== undefined && (
            <ArkDialog.Description class={descriptionStyle}>
              {props.description}
            </ArkDialog.Description>
          )}
          {props.children}
          <ArkDialog.CloseTrigger
            asChild={(closeProps) => (
              <Button variant="outline" {...closeProps()}>
                {props.closeLabel}
              </Button>
            )}
          />
        </ArkDialog.Content>
      </ArkDialog.Positioner>
    </Portal>
  </ArkDialog.Root>
);
