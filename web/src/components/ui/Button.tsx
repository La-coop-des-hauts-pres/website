import { type JSX, splitProps } from 'solid-js';
import { cva, cx, type RecipeVariantProps } from 'styled-system/css';

export const buttonRecipe = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2',
    minHeight: 'action',
    paddingInline: '6',
    borderRadius: 'md',
    borderWidth: '1px',
    borderStyle: 'solid',
    fontFamily: 'inherit',
    fontSize: 'md',
    fontWeight: '600',
    cursor: 'pointer',
    '@media (prefers-reduced-motion: no-preference)': {
      transitionProperty: 'background-color, border-color, color',
      transitionDuration: 'quick',
      transitionTimingFunction: 'standard',
    },
    _disabled: { opacity: '0.5', cursor: 'not-allowed' },
  },
  variants: {
    variant: {
      solid: {
        background: 'accent',
        borderColor: 'accent',
        color: 'inkOnAccent',
        '&:hover:not(:disabled)': { background: 'accentStrong', borderColor: 'accentStrong' },
      },
      outline: {
        background: 'transparent',
        borderColor: 'lineStrong',
        color: 'ink',
        '&:hover:not(:disabled)': { borderColor: 'accent', color: 'accentStrong' },
      },
      ghost: {
        background: 'transparent',
        borderColor: 'transparent',
        color: 'ink',
        '&:hover:not(:disabled)': { background: 'surfaceWash' },
      },
    },
  },
  defaultVariants: { variant: 'solid' },
});

export type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> &
  NonNullable<RecipeVariantProps<typeof buttonRecipe>>;

export const Button = (props: ButtonProps) => {
  const [own, native] = splitProps(props, ['variant', 'type', 'class']);
  return (
    <button
      {...native}
      type={own.type ?? 'button'}
      class={cx(buttonRecipe({ variant: own.variant }), own.class)}
    />
  );
};
