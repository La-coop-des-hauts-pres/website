import axe from 'axe-core';

export const accessibilityViolations = async (container: Element): Promise<readonly string[]> => {
  const { violations } = await axe.run(container, {
    runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'],
    rules: { 'color-contrast': { enabled: false } },
  });
  return violations.map((violation) => `${violation.id}: ${violation.help}`);
};
