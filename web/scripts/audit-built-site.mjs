import { JSDOM } from 'jsdom';

import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';

const buildDirectory = process.argv[2] ?? 'dist';
const maxGzipKilobytesPerAsset = 60;

const collectFiles = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) =>
      entry.isDirectory()
        ? collectFiles(join(directory, entry.name))
        : [join(directory, entry.name)],
    ),
  );
  return nested.flat();
};

const builtFiles = await collectFiles(buildDirectory);
const htmlFiles = builtFiles.filter((file) => file.endsWith('.html'));
if (htmlFiles.length === 0) throw new Error('No built pages found. Run pnpm build first.');

const failures = [];
const fail = (file, message) => failures.push(`${file}: ${message}`);

for (const file of htmlFiles) {
  const { window } = new JSDOM(await readFile(file, 'utf8'));
  const { document } = window;
  const isNotFoundPage = file.endsWith('404.html');

  if (!document.documentElement.lang) fail(file, 'html has no lang attribute');
  if (!document.title.trim()) fail(file, 'page has no title');
  if (!document.querySelector('meta[name="description"]')?.content?.trim())
    fail(file, 'page has no meta description');
  if (!document.querySelector('meta[name="viewport"]')) fail(file, 'page has no viewport meta');
  if (!isNotFoundPage && !document.querySelector('link[rel="canonical"]'))
    fail(file, 'page has no canonical link');
  if (document.querySelectorAll('h1').length !== 1) fail(file, 'page must have exactly one h1');
  if (document.querySelectorAll('main').length !== 1) fail(file, 'page must have exactly one main');
  if (!document.querySelector('a[href^="#"]')) fail(file, 'page has no skip link');

  for (const image of document.images) {
    if (!image.hasAttribute('alt')) fail(file, `image ${image.src} has no alt attribute`);
    if (!(Number(image.getAttribute('width')) > 0 && Number(image.getAttribute('height')) > 0))
      fail(file, `image ${image.src} has no intrinsic dimensions`);
  }

  for (const control of document.querySelectorAll('input:not([type="hidden"]), select, textarea')) {
    const hasName =
      control.labels?.length > 0 ||
      control.hasAttribute('aria-label') ||
      control.hasAttribute('aria-labelledby');
    if (!hasName)
      fail(file, `form control ${control.name || control.tagName} has no accessible name`);
  }

  for (const script of document.querySelectorAll('script[type="application/ld+json"]')) {
    try {
      JSON.parse(script.textContent ?? '');
    } catch {
      fail(file, 'JSON-LD is not valid JSON');
    }
  }

  const ids = [...document.querySelectorAll('[id]')].map((element) => element.id);
  if (new Set(ids).size !== ids.length) fail(file, 'duplicate id attributes');

  window.close();
}

const textAssets = await Promise.all(
  builtFiles
    .filter((file) => /\.(css|js)$/.test(file))
    .map(async (file) => {
      const contents = await readFile(file);
      return { file, gzipBytes: gzipSync(contents).length };
    }),
);
for (const asset of textAssets) {
  if (asset.gzipBytes > maxGzipKilobytesPerAsset * 1024)
    fail(asset.file, `${asset.gzipBytes} gzip bytes exceeds ${maxGzipKilobytesPerAsset} KiB`);
}

if (builtFiles.some((file) => /styleguide/i.test(file)))
  failures.push('styleguide must not be part of the production build');

process.stdout.write(
  `${JSON.stringify({ pages: htmlFiles.length, textAssets, failures }, null, 2)}\n`,
);
if (failures.length > 0) process.exitCode = 1;
