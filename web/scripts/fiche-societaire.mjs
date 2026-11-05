import { renderSVG } from 'uqr';

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const privateDir = resolve(root, '.private');
const envFile = resolve(privateDir, 'coordonnees.env');
if (existsSync(envFile)) process.loadEnvFile(envFile);

const bankEmail = process.env.BANQUIERE_EMAIL?.trim() ?? '';
const associationEmail = process.env.ASSOCIATION_EMAIL?.trim() ?? '';
const isValid = (value) => !value || /^[^\s@<>"\\]+@[^\s@<>"\\]+\.[^\s@<>"\\]+$/.test(value);
if (!isValid(bankEmail) || !isValid(associationEmail)) {
  throw new Error('Une adresse de destination est invalide : vérifiez la configuration locale.');
}
const escapeHtml = (text) =>
  text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
const emailBlock = (email, subject, body, label, templateLabel) => {
  const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const qr = renderSVG(mailto, { border: 4, ecc: 'M' });
  const address = email
    ? `<a href="${escapeHtml(mailto)}">${escapeHtml(email)}</a>`
    : '<span class="missing">Adresse à renseigner</span>';
  const imageLabel = email
    ? `Préparer le courriel à ${label}`
    : `Aperçu du QR code ${label} : adresse manquante`;
  return {
    address,
    qr: `<div class="qr-block"><div class="qr" role="img" aria-label="${imageLabel}">${qr}</div><span class="preview">${templateLabel}</span></div>`,
  };
};
const bank = emailBlock(
  bankEmail,
  'Dossier de souscription – La Coop des Hauts-Prés',
  'Bonjour,\n\nJe souhaite m’inscrire en tant que coopérateur ou coopératrice au sein de La Coop des Hauts-Prés.\n\nNom et prénom : \nMon e-mail : \nMon numéro de téléphone : \n\nVous trouverez en pièces jointes ma carte nationale d’identité et mon justificatif de domicile.\n\nBien cordialement,',
  'la banquière',
  'Template mail banque',
);
const association = emailBlock(
  associationEmail,
  'Confirmation d’envoi du dossier – La Coop des Hauts-Prés',
  'Bonjour,\n\nJe vous confirme avoir envoyé mes documents à la banquière.\n\nNom et prénom : \n\nMerci !',
  'l’association',
  'Template mail asso',
);
const logo = readFileSync(resolve(root, 'web/public/identite/logo-des-hauts-pres.png')).toString(
  'base64',
);
const sceneImage = readFileSync(
  resolve(root, 'web/public/identite/personnages-officiels.png'),
).toString('base64');
const scene = `<img class="footer-scene" src="data:image/png;base64,${sceneImage}" alt="" />`;
const html = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, nofollow"><title>Ma checklist · La Coop des Hauts-Prés</title>
<style>
*{box-sizing:border-box}html{background:#ede7e4}body{font-family:'Chalkboard SE','Comic Sans MS',cursive;color:#35221f;margin:0;line-height:1.3}.sheet{position:relative;width:148mm;min-height:210mm;margin:8mm auto;background:#fff;padding:5mm 12mm;overflow:hidden;print-color-adjust:exact;-webkit-print-color-adjust:exact}.logo{height:33mm;background:#fff;display:flex;align-items:center;justify-content:center}.mark{width:32mm;height:32mm;background:#ef8477;mask:url("data:image/png;base64,${logo}") center/contain no-repeat;-webkit-mask:url("data:image/png;base64,${logo}") center/contain no-repeat}.little-person{position:absolute;width:13mm;height:13mm;overflow:hidden;pointer-events:none}.person-left{left:0;top:66mm;transform:scaleX(-1) rotate(-8deg)}.person-right{right:0;top:151mm;transform:rotate(8deg)}h1{font-size:19pt;color:#914338;text-align:center;margin:1mm 0}h2{font-size:11pt;color:#914338;margin:3mm 0 1.2mm}p{margin:1mm 0;font-size:8pt}.deadline{text-align:center;font-weight:bold;font-size:9pt;margin:1mm 0 4mm}.underline{position:relative;display:inline-block}.underline:after{content:'';position:absolute;left:-1mm;right:-1mm;bottom:-1mm;border-bottom:2px solid #ef897a;border-radius:50%;transform:rotate(-1deg)}.steps{list-style:none;margin:0;padding:0}.step{display:grid;grid-template-columns:minmax(0,1fr) 27mm;gap:2mm;align-items:center;margin:2mm 0}.step:first-child{grid-template-columns:1fr}.step-text{font-size:8pt;min-width:0}.step-text strong{font-size:8.5pt}.tick{display:inline-block;font-family:Arial,sans-serif;font-size:12pt;line-height:1;vertical-align:middle;margin-right:1.4mm}.subchecks{list-style:none;margin:1mm 0 1mm 3mm;padding:0}.subchecks li{margin:.5mm 0;font-size:8pt}.address{font-family:Arial,sans-serif;font-size:7.5pt;overflow-wrap:anywhere}.address a{color:inherit}.missing,.preview{color:#914338}.qr-block{text-align:center;align-self:center}.qr{width:25mm;height:25mm;margin:auto}.qr svg{display:block;width:100%;height:100%}.preview{display:block;font-family:Arial,sans-serif;font-weight:bold;font-size:6pt;letter-spacing:.08em}.note{font-family:Arial,sans-serif;font-size:6.7pt;margin:2mm 0}.finish{font-weight:bold;color:#914338;font-size:10pt;text-align:center;margin-top:3mm}.footer-scene{display:block;width:100%;height:25mm;object-fit:contain;object-position:50% 100%;margin:1mm auto 0}footer{margin-top:0;padding-top:0;font:7pt Arial,sans-serif;text-align:center}.print-button{display:block;margin:5mm auto;padding:3mm 6mm;border:0;background:#914338;color:#fff;font:11pt Arial,sans-serif;cursor:pointer}@page{size:A5;margin:5mm}@media print{html,body{background:#fff}.sheet{width:100%;min-height:0;margin:0;padding:0}.print-button{display:none}}
</style></head><body><button class="print-button" type="button" onclick="window.print()">Imprimer cette fiche</button><main class="sheet"><div class="logo"><div class="mark" role="img" aria-label="Dessin de La Coop des Hauts-Prés : la carotte et ses petits personnages"></div></div><h1>Ma checklist</h1><p class="deadline">Pour rejoindre l’aventure <span class="underline">avant le 23 novembre 2026</span></p><h2><span class="underline">Dès maintenant</span></h2><ol class="steps"><li class="step"><div class="step-text"><span class="tick">□</span><strong>Prévenir une personne du magasin</strong><p>Elle vous ajoutera à la liste des inscrits.</p></div></li><li class="step"><div class="step-text"><span class="tick">□</span><strong>Envoyer à la banquière</strong><ul class="subchecks"><li><span class="tick">□</span>Adresse e-mail</li><li><span class="tick">□</span>Numéro de téléphone</li><li><span class="tick">□</span>Carte nationale d’identité</li><li><span class="tick">□</span>Justificatif de domicile</li></ul><p class="address">À la banquière : ${bank.address}</p></div>${bank.qr}</li><li class="step"><div class="step-text"><span class="tick">□</span><strong>Confirmer l’envoi</strong><p>Prévenez une personne du magasin ou écrivez à l’association avec votre nom et prénom.</p><p class="address">À l’association : ${association.address}</p></div>${association.qr}</li></ol><p class="note">Les QR codes préparent les courriels : pensez à joindre les documents, puis à les envoyer. Pièces à confirmer au magasin.</p><h2><span class="underline">Fin novembre</span></h2><div class="step-text"><span class="tick">□</span><strong>Se retrouver pour signer les statuts</strong><p>La date de la rencontre sera communiquée prochainement.</p></div><p>La part de capital prévue est de <strong>30 €</strong> ; modalités expliquées au magasin.</p><p class="finish">Merci de faire partie de l’aventure !</p>${scene}<footer>La Coop des Hauts-Prés · 1 voie des Vendaises, Val-de-Reuil</footer></main></body></html>`;
mkdirSync(privateDir, { recursive: true });
const target = resolve(privateDir, 'fiche-societaire.html');
writeFileSync(target, html, { mode: 0o600 });
const match = html.match(/<main class="sheet">[\s\S]*?<\/main>/);
if (!match) throw new Error('Impossible de préparer les deux fiches.');
const firstSheet = match[0];
const secondSheet = firstSheet
  .replace('<main class="sheet">', '<section class="sheet">')
  .replace('</main>', '</section>');
const doubleStyles = `<style>
@page { size: A4 landscape; margin: 5mm; }
.print-area { display: grid; grid-template-columns: 1fr 1fr; gap: 5mm; position: relative; }
.print-area::after { content: ''; position: absolute; left: 50%; top: 0; bottom: 0; border-left: .2mm dashed #b8aaa8; }
@media screen { .print-area { width: 301mm; margin: 8mm auto; } .print-area .sheet { width: 148mm; margin: 0; } }
@media print { .print-area .sheet { width: auto; min-height: 0; margin: 0; padding: 0; break-inside: avoid; } }
</style>`;
const doubleHtml = html
  .replace('</head>', `${doubleStyles}</head>`)
  .replace(firstSheet, `<div class="print-area">${firstSheet}${secondSheet}</div>`);
writeFileSync(resolve(privateDir, 'fiches-a4-a-decouper.html'), doubleHtml, { mode: 0o600 });
process.stdout.write(
  bankEmail && associationEmail
    ? 'Fiche locale A5 créée avec les deux QR codes.\n'
    : 'Fiche locale A5 créée avec des QR codes de démonstration.\n',
);
