export default function styleguide() {
  return {
    name: 'styleguide',
    hooks: {
      'astro:config:setup': ({ command, injectRoute }) => {
        if (command !== 'dev') return;
        injectRoute({
          pattern: '/styleguide',
          entrypoint: './src/styleguide/page.astro',
          prerender: true,
        });
      },
    },
  };
}
