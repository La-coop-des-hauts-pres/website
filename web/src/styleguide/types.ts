import type { JSX } from 'solid-js';

export type StoryMeta = {
  readonly title: string;
  readonly description?: string;
};

export type StoryRender = () => JSX.Element;

export type StoryModule = {
  readonly default: StoryMeta;
} & Record<string, StoryRender | StoryMeta>;

export type Story = {
  readonly id: string;
  readonly group: string;
  readonly title: string;
  readonly name: string;
  readonly render: StoryRender;
};
