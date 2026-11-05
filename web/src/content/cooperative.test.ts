import {
  categories,
  limitedProfit,
  objectives,
  totalWeight,
  votingColleges,
  votingPrinciples,
} from './cooperative';

describe('cooperative content', () => {
  it('weights the voting colleges to a hundred percent', () => {
    expect(totalWeight(votingColleges)).toBe(100);
  });

  it('keeps every college between the legal bounds of 10 % and 50 %', () => {
    for (const college of votingColleges) {
      expect(college.poids).toBeGreaterThanOrEqual(10);
      expect(college.poids).toBeLessThanOrEqual(50);
    }
  });

  it('has one category per voting college', () => {
    expect(categories).toHaveLength(votingColleges.length);
  });

  it('states objectives, voting principles and the limited-profit rule', () => {
    expect(objectives.length).toBeGreaterThan(0);
    expect(votingPrinciples.length).toBeGreaterThan(0);
    expect(limitedProfit.length).toBeGreaterThan(0);
  });

  it('does not name private individuals or legal identifiers', () => {
    const everything = JSON.stringify({ objectives, categories, votingColleges, limitedProfit });
    expect(everything).not.toMatch(/fondateur|RCS|SIRET/i);
  });
});
