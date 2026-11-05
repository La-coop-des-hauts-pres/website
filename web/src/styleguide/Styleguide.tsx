import tokensSource from '@design/tokens.css?raw';
import { createMemo, createSignal, For, onCleanup, onMount, Show } from 'solid-js';
import { css } from 'styled-system/css';

import { allStories } from './registry';

type TokenEntry = { readonly name: string; readonly value: string };

export const parseTokens = (source: string): readonly TokenEntry[] =>
  [...source.matchAll(/^\s*(--[\w-]+):\s*([^;]+);/gm)].map((match) => ({
    name: match[1] ?? '',
    value: (match[2] ?? '').trim(),
  }));

const isColor = (value: string): boolean => /^(#|rgb|hsl)/.test(value);

const layoutStyle = css({
  display: 'grid',
  gridTemplateColumns: { base: '1fr', md: '16rem 1fr' },
  minHeight: '100dvh',
});
const sidebarStyle = css({
  padding: '4',
  borderInlineEnd: { md: '1px solid var(--line)' },
  background: 'surfaceRaised',
});
const canvasStyle = css({ padding: '8' });
const linkStyle = css({ display: 'block', paddingBlock: '1', color: 'ink' });
const swatchStyle = css({
  display: 'inline-block',
  width: '1.25rem',
  height: '1.25rem',
  borderRadius: 'sm',
  border: '1px solid var(--line-strong)',
  verticalAlign: 'middle',
});

const readHash = (): string => decodeURIComponent(window.location.hash.replace(/^#/, ''));

export const Styleguide = () => {
  const stories = allStories();
  const tokens = parseTokens(tokensSource);
  const [selected, setSelected] = createSignal(readHash());
  const current = createMemo(() => stories.find((story) => story.id === selected()));
  const groups = createMemo(() => [...new Set(stories.map((story) => story.group))]);

  onMount(() => {
    const onHashChange = () => setSelected(readHash());
    window.addEventListener('hashchange', onHashChange);
    onCleanup(() => window.removeEventListener('hashchange', onHashChange));
  });

  return (
    <div class={layoutStyle}>
      <nav class={sidebarStyle} aria-label="Catalogue">
        <h1 class={css({ fontSize: 'lg', fontWeight: '700' })}>Styleguide</h1>
        <a class={linkStyle} href="#tokens">
          Jetons
        </a>
        <For each={groups()}>
          {(group) => (
            <section>
              <h2 class={css({ fontSize: 'sm', color: 'inkQuiet', marginBlockStart: '4' })}>
                {group}
              </h2>
              <For each={stories.filter((story) => story.group === group)}>
                {(story) => (
                  <a
                    class={linkStyle}
                    href={`#${story.id}`}
                    aria-current={selected() === story.id ? 'page' : undefined}
                  >
                    {story.name}
                  </a>
                )}
              </For>
            </section>
          )}
        </For>
      </nav>
      <main class={canvasStyle} id="main-content">
        <Show
          when={current()}
          fallback={
            <section>
              <h2>Jetons</h2>
              <ul>
                <For each={tokens}>
                  {(token) => (
                    <li>
                      <Show when={isColor(token.value)}>
                        <span
                          class={swatchStyle}
                          style={{ background: token.value }}
                          aria-hidden="true"
                        />{' '}
                      </Show>
                      <code>{token.name}</code> : {token.value}
                    </li>
                  )}
                </For>
              </ul>
            </section>
          }
        >
          {(story) => (
            <section aria-label={`${story().title} — ${story().name}`}>{story().render()}</section>
          )}
        </Show>
      </main>
    </div>
  );
};
