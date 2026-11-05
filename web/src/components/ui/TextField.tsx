import { Field } from '@ark-ui/solid/field';
import { type JSX, Show, splitProps } from 'solid-js';
import { css } from 'styled-system/css';

const rootStyle = css({ display: 'flex', flexDirection: 'column', gap: '1' });
const labelStyle = css({ fontWeight: '600', fontSize: 'sm', color: 'ink' });
const inputStyle = css({
  minHeight: 'action',
  paddingInline: '3',
  borderRadius: 'md',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'lineStrong',
  background: 'surface',
  color: 'ink',
  fontFamily: 'inherit',
  fontSize: 'md',
  _invalid: { borderColor: 'danger' },
  _disabled: { opacity: '0.5', cursor: 'not-allowed' },
});
const helperStyle = css({ fontSize: 'sm', color: 'inkMuted' });
const errorStyle = css({ fontSize: 'sm', color: 'danger' });

export type TextFieldProps = Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'class' | 'id'> & {
  readonly label: string;
  readonly helperText?: string;
  readonly errorText?: string;
  readonly required?: boolean;
};

export const TextField = (props: TextFieldProps) => {
  const [own, native] = splitProps(props, ['label', 'helperText', 'errorText', 'required']);
  return (
    <Field.Root
      class={rootStyle}
      invalid={own.errorText !== undefined}
      required={own.required === true}
    >
      <Field.Label class={labelStyle}>
        {own.label}
        <Field.RequiredIndicator fallback={null}> *</Field.RequiredIndicator>
      </Field.Label>
      <Field.Input {...native} class={inputStyle} />
      <Show when={own.helperText}>
        <Field.HelperText class={helperStyle}>{own.helperText}</Field.HelperText>
      </Show>
      <Show when={own.errorText}>
        <Field.ErrorText class={errorStyle}>{own.errorText}</Field.ErrorText>
      </Show>
    </Field.Root>
  );
};
