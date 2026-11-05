// Génère les icônes et l'image de partage depuis l'illustration de la carotte.
// Usage : pnpm icons   (les fichiers produits sont versionnés dans public/)
import sharp from 'sharp';

import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const paper = '#efa194'; // --identity-paper
const ink = '#653530'; // --identity-ink
const source = fileURLToPath(new URL('../public/identite/carotte-portique.png', import.meta.url));
const out = (name) => fileURLToPath(new URL(`../public/${name}`, import.meta.url));

// L'illustration devient un aplat « encre » qui garde la transparence du dessin.
const inked = (input) =>
  sharp(input)
    .ensureAlpha()
    .linear([0, 0, 0, 1], [...hex(ink), 0])
    .png()
    .toBuffer();
function hex(color) {
  return [1, 3, 5].map((i) => Number.parseInt(color.slice(i, i + 2), 16));
}

const drawing = await inked(source);

// Icône d'application : la carotte seule (sans texte, illisible en petit), centrée sur le papier.
const piece = (left, top, width, height) =>
  sharp(drawing).extract({ left, top, width, height }).toBuffer();
const carrot = await sharp({
  create: { width: 580, height: 1214, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
})
  .composite([
    { input: await piece(360, 40, 580, 375), left: 0, top: 0 }, // fanes
    { input: await piece(470, 415, 310, 130), left: 110, top: 375 }, // bas des fanes
    { input: await piece(548, 545, 212, 155), left: 188, top: 505 }, // haut de la carotte
    { input: await piece(548, 700, 187, 240), left: 188, top: 660 },
    { input: await piece(570, 940, 130, 314), left: 210, top: 900 }, // pointe
  ])
  .png()
  .toBuffer();

const square = async (size, padding) => {
  const inner = size - 2 * padding;
  const resized = await sharp(carrot)
    .resize({ width: inner, height: inner, fit: 'inside' })
    .toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: paper } })
    .composite([{ input: resized, gravity: 'centre' }])
    .png()
    .toBuffer();
};

const icon = async (name, size, paddingRatio) =>
  writeFile(out(name), await square(size, Math.round(size * paddingRatio)));

await icon('icon-192.png', 192, 0.08);
await icon('icon-512.png', 512, 0.08);
await icon('icon-maskable-512.png', 512, 0.2); // zone de sécurité des icônes « maskable »
await icon('apple-touch-icon.png', 180, 0.1);

// favicon.ico : 32 px et 48 px, PNG embarqués.
const sizes = [32, 48];
const images = await Promise.all(sizes.map((size) => square(size, Math.round(size * 0.06))));
const header = Buffer.alloc(6);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(images.length, 4);
let offset = 6 + 16 * images.length;
const entries = images.map((image, index) => {
  const entry = Buffer.alloc(16);
  entry.writeUInt8(sizes[index], 0);
  entry.writeUInt8(sizes[index], 1);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(image.length, 8);
  entry.writeUInt32LE(offset, 12);
  offset += image.length;
  return entry;
});
await writeFile(out('favicon.ico'), Buffer.concat([header, ...entries, ...images]));

// Image de partage 1200 × 630 (Open Graph : réseaux sociaux, messageries, SMS).
const art = await sharp(drawing).resize({ height: 560 }).toBuffer();
await writeFile(
  out('og-image.png'),
  await sharp({ create: { width: 1200, height: 630, channels: 4, background: paper } })
    .composite([{ input: art, gravity: 'centre' }])
    .png({ compressionLevel: 9, palette: true })
    .toBuffer(),
);
process.stdout.write('Icônes et image de partage générées dans public/.\n');
