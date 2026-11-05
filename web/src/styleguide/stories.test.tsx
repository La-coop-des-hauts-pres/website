import { render } from '@solidjs/testing-library';

import { accessibilityViolations } from '../../tests/axe';
import { allStories } from './registry';
import { parseTokens } from './Styleguide';

describe('styleguide stories', () => {
  const stories = allStories();

  it('discovers the stories of the design system', () => {
    expect(stories.length).toBeGreaterThan(0);
  });

  it('gives every story a unique address', () => {
    const ids = stories.map((story) => story.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it.each(stories.map((story) => [story.id, story] as const))(
    '%s has no WCAG A/AA violation',
    async (_id, story) => {
      const { container } = render(() => story.render());
      expect(await accessibilityViolations(container)).toEqual([]);
    },
  );
});

describe('parseTokens', () => {
  it('reads the custom properties of a stylesheet', () => {
    expect(parseTokens(':root {\n  --ink: #111;\n  --space-1: 0.25rem;\n}')).toEqual([
      { name: '--ink', value: '#111' },
      { name: '--space-1', value: '0.25rem' },
    ]);
  });
});
