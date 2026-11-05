export type PageSeo = {
  readonly title?: string;
  readonly description?: string;
  readonly path: string;
  readonly isIndexable?: boolean;
  readonly image?: string;
};

export type SiteIdentity = {
  readonly name: string;
  readonly description: string;
  readonly locale: string;
  readonly origin: URL;
};

export type ResolvedSeo = {
  readonly title: string;
  readonly description: string;
  readonly canonicalUrl: string;
  readonly robots: string;
  readonly imageUrl: string | undefined;
};

export const resolveSeo = (site: SiteIdentity, page: PageSeo): ResolvedSeo => ({
  title: page.title === undefined ? site.name : `${page.title} · ${site.name}`,
  description: page.description ?? site.description,
  canonicalUrl: new URL(page.path, site.origin).href,
  robots: page.isIndexable === false ? 'noindex, nofollow' : 'index, follow',
  imageUrl: page.image === undefined ? undefined : new URL(page.image, site.origin).href,
});

export const organizationJsonLd = (site: SiteIdentity): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': new URL('/#organization', site.origin).href,
      name: site.name,
      url: site.origin.href,
    },
    {
      '@type': 'WebSite',
      '@id': new URL('/#website', site.origin).href,
      url: site.origin.href,
      name: site.name,
      description: site.description,
      inLanguage: site.locale,
      publisher: { '@id': new URL('/#organization', site.origin).href },
    },
  ],
});

export const robotsText = (origin: URL, disallowedPaths: readonly string[] = []): string =>
  [
    'User-agent: *',
    'Allow: /',
    ...disallowedPaths.map((path) => `Disallow: ${path}`),
    '',
    `Sitemap: ${new URL('/sitemap-index.xml', origin).href}`,
    '',
  ].join('\n');
