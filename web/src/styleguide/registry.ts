import type { Story, StoryMeta, StoryModule, StoryRender } from './types';

const slug = (text: string): string =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const readableName = (exportName: string): string =>
  exportName.replace(/([a-z0-9])([A-Z])/g, '$1 $2');

const isRender = (value: unknown): value is StoryRender => typeof value === 'function';

export const storiesOf = (modules: Readonly<Record<string, StoryModule>>): readonly Story[] =>
  Object.values(modules).flatMap((module) => {
    const meta: StoryMeta = module.default;
    return Object.entries(module)
      .filter(([exportName, value]) => exportName !== 'default' && isRender(value))
      .map(([exportName, value]) => ({
        id: `${slug(meta.title)}--${slug(exportName)}`,
        group: meta.title,
        title: meta.title,
        name: readableName(exportName),
        render: value as StoryRender,
      }));
  });

export const allStories = (): readonly Story[] =>
  storiesOf(
    import.meta.glob<StoryModule>('../**/*.stories.tsx', { eager: true }) as Readonly<
      Record<string, StoryModule>
    >,
  );
