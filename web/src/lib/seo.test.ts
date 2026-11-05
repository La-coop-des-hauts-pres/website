import { organizationJsonLd, resolveSeo, robotsText } from './seo';

const site = {
  name: 'Haut-Prés',
  description: 'Boutique et producteurs.',
  locale: 'fr',
  origin: new URL('https://lacoopdeshautspres.fr'),
};

describe('resolveSeo', () => {
  it('uses the site name alone when the page has no title', () => {
    expect(resolveSeo(site, { path: '/' }).title).toBe('Haut-Prés');
  });

  it('suffixes the page title with the site name', () => {
    expect(resolveSeo(site, { path: '/a/', title: 'Producteurs' }).title).toBe(
      'Producteurs · Haut-Prés',
    );
  });

  it('falls back on the site description', () => {
    expect(resolveSeo(site, { path: '/' }).description).toBe('Boutique et producteurs.');
  });

  it('builds an absolute canonical address from the path', () => {
    expect(resolveSeo(site, { path: '/producteurs/' }).canonicalUrl).toBe(
      'https://lacoopdeshautspres.fr/producteurs/',
    );
  });

  it('asks crawlers to skip a page that is not indexable', () => {
    expect(resolveSeo(site, { path: '/x/', isIndexable: false }).robots).toBe('noindex, nofollow');
    expect(resolveSeo(site, { path: '/x/' }).robots).toBe('index, follow');
  });

  it('makes the share image absolute', () => {
    expect(resolveSeo(site, { path: '/', image: '/share.png' }).imageUrl).toBe(
      'https://lacoopdeshautspres.fr/share.png',
    );
  });
});

describe('organizationJsonLd', () => {
  it('links the website to its publisher', () => {
    const graph = organizationJsonLd(site)['@graph'] as readonly Record<string, unknown>[];
    expect(graph.map((entry) => entry['@type'])).toEqual(['Organization', 'WebSite']);
    expect(graph[1]?.publisher).toEqual({ '@id': 'https://lacoopdeshautspres.fr/#organization' });
  });
});

describe('robotsText', () => {
  it('lists the disallowed paths and the sitemap', () => {
    expect(robotsText(site.origin, ['/styleguide/'])).toBe(
      'User-agent: *\nAllow: /\nDisallow: /styleguide/\n\nSitemap: https://lacoopdeshautspres.fr/sitemap-index.xml\n',
    );
  });
});
