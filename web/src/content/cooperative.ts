export type Objective = { readonly title: string; readonly text: string };
export type Category = { readonly name: string; readonly text: string };
export type Value = { readonly name: string };

export type VotingCollege = {
  readonly id: string;
  readonly nom: string;
  readonly poids: number;
  readonly description: string;
};

export const purpose =
  'Coopérer entre producteurs et consommateurs autour de produits bio, cultivés de préférence sur le site des Hauts-Prés à Val-de-Reuil.';

export const socialUtility =
  'Donner aux habitants du territoire un accès à une alimentation de qualité et de proximité, et valoriser l’offre bio locale.';

export const objectives: readonly Objective[] = [
  {
    title: 'Une alimentation bio et de proximité',
    text: 'Commercialiser des produits certifiés bio, issus en priorité du site des Hauts-Prés ou, à défaut, de producteurs locaux.',
  },
  {
    title: 'Une juste rémunération des producteurs',
    text: 'Des produits accessibles aux consommateurs, tout en rémunérant justement celles et ceux qui les produisent.',
  },
  {
    title: 'Du lien et de l’éducation',
    text: 'Créer du lien entre producteurs et consommateurs, promouvoir l’agriculture bio locale, sensibiliser et éduquer à l’agriculture biologique.',
  },
  {
    title: 'Des moyens mis en commun',
    text: 'Mutualiser des moyens humains et matériels entre les membres de la coopérative.',
  },
];

export const values: readonly Value[] = [
  { name: 'La personne avant le capital' },
  { name: 'La démocratie' },
  { name: 'La solidarité' },
  { name: 'L’intérêt collectif' },
  { name: 'L’ancrage dans le territoire' },
];

export const categories: readonly Category[] = [
  {
    name: 'Salariés et producteurs',
    text: 'Celles et ceux qui produisent et distribuent, dont les producteurs du site des Hauts-Prés.',
  },
  { name: 'Fournisseurs', text: 'Les producteurs bio situés hors du site des Hauts-Prés.' },
  { name: 'Bénéficiaires', text: 'Les clients du magasin et les bénéficiaires des activités.' },
  {
    name: 'Collectivités, institutions et partenaires',
    text: 'Les structures publiques ou privées qui soutiennent les activités.',
  },
  { name: 'Amis de la bio', text: 'Toute personne ou structure qui soutient le projet.' },
];

export const votingColleges: readonly VotingCollege[] = [
  {
    id: 'salaries-producteurs',
    nom: 'Salariés / Producteurs',
    poids: 40,
    description:
      'Celles et ceux qui produisent et distribuent les biens et services de la coopérative, dont les producteurs des Hauts-Prés.',
  },
  {
    id: 'fournisseurs',
    nom: 'Fournisseurs',
    poids: 12,
    description: 'Les producteurs de produits bio qui ne viennent pas des Hauts-Prés.',
  },
  {
    id: 'beneficiaires',
    nom: 'Bénéficiaires',
    poids: 28,
    description: 'Les clients du magasin et les bénéficiaires des activités de la coopérative.',
  },
  {
    id: 'collectivites',
    nom: 'Collectivités, institutions et partenaires',
    poids: 10,
    description: 'Les personnes morales qui soutiennent les activités de la coopérative.',
  },
  {
    id: 'amis-de-la-bio',
    nom: 'Amis de la bio',
    poids: 10,
    description: 'Toute personne ou structure qui soutient le projet.',
  },
];

export const votingPrinciples: readonly string[] = [
  'Chaque sociétaire a une seule voix, quel que soit le nombre de parts qu’il détient.',
  'Les voix sont d’abord comptées au sein de chaque collège, puis pondérées par le poids du collège.',
  'Aucun collège ne peut dominer seul : la loi impose un poids compris entre 10 % et 50 %.',
];

export const governancePrinciples: readonly string[] = [
  'Les sociétaires décident ensemble en assemblée générale, selon la règle « une personne, une voix » pondérée par collèges.',
  'Le Directoire, nommé par l’assemblée générale, dirige et administre la coopérative de façon collégiale.',
  'Le président du Directoire n’a ni pouvoir de direction plus étendu ni voix prépondérante.',
  'Une révision coopérative régulière vérifie que la coopérative respecte les principes coopératifs.',
];

export const limitedProfit: readonly string[] = [
  'Aucun intérêt n’est versé sur les parts sociales.',
  'Les excédents sont affectés aux réserves de la coopérative.',
  'Ces réserves sont impartageables : elles ne sont jamais distribuées aux sociétaires.',
  'L’adhésion est libre et ouverte, validée par l’assemblée générale ; la responsabilité de chaque sociétaire est limitée à ses parts.',
];

export const totalWeight = (colleges: readonly VotingCollege[]): number =>
  colleges.reduce((sum, college) => sum + college.poids, 0);
