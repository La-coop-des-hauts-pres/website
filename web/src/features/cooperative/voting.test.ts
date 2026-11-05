import { weightedOutcome } from './voting';

describe('weightedOutcome', () => {
  it('counts one college unanimously in favour as the whole result', () => {
    const outcome = weightedOutcome([{ weight: 40, inFavour: 3, against: 0 }]);
    expect(outcome.inFavourShare).toBe(1);
    expect(outcome.isQualifiedMajority).toBe(true);
  });

  it('weights each college by its share, whatever its number of voters', () => {
    const outcome = weightedOutcome([
      { weight: 40, inFavour: 1, against: 0 },
      { weight: 60, inFavour: 0, against: 100 },
    ]);
    expect(outcome.inFavourShare).toBeCloseTo(0.4);
    expect(outcome.isSimpleMajority).toBe(false);
  });

  it('carries the votes of a college pro rata to those who voted for or against', () => {
    const outcome = weightedOutcome([
      { weight: 50, inFavour: 1, against: 1 },
      { weight: 50, inFavour: 3, against: 1 },
    ]);
    expect(outcome.inFavourShare).toBeCloseTo(0.5 * 0.5 + 0.5 * 0.75);
  });

  it('ignores a college where nobody voted', () => {
    const outcome = weightedOutcome([
      { weight: 40, inFavour: 2, against: 0 },
      { weight: 60, inFavour: 0, against: 0 },
    ]);
    expect(outcome.countedColleges).toBe(1);
    expect(outcome.inFavourShare).toBe(1);
  });

  it('needs two thirds for a qualified majority, not a simple one', () => {
    const outcome = weightedOutcome([
      { weight: 50, inFavour: 3, against: 2 },
      { weight: 50, inFavour: 3, against: 2 },
    ]);
    expect(outcome.isSimpleMajority).toBe(true);
    expect(outcome.isQualifiedMajority).toBe(false);
  });

  it('flags when fewer than three colleges voted', () => {
    expect(weightedOutcome([{ weight: 100, inFavour: 1, against: 0 }]).hasPonderationMinimum).toBe(
      false,
    );
  });

  it('is empty when nobody voted', () => {
    expect(weightedOutcome([]).inFavourShare).toBe(0);
  });
});
