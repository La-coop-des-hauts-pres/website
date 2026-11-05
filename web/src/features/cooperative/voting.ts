export type CollegeBallot = {
  readonly weight: number;
  readonly inFavour: number;
  readonly against: number;
};

export type WeightedOutcome = {
  readonly inFavourShare: number;
  readonly againstShare: number;
  readonly countedColleges: number;
  readonly hasPonderationMinimum: boolean;
  readonly isSimpleMajority: boolean;
  readonly isQualifiedMajority: boolean;
};

const ponderationMinimumColleges = 3;

export const weightedOutcome = (ballots: readonly CollegeBallot[]): WeightedOutcome => {
  const counted = ballots.filter((ballot) => ballot.inFavour + ballot.against > 0);
  const countedWeight = counted.reduce((total, ballot) => total + ballot.weight, 0);
  const inFavourWeight = counted.reduce(
    (total, ballot) =>
      total + (ballot.weight * ballot.inFavour) / (ballot.inFavour + ballot.against),
    0,
  );
  const inFavourShare = countedWeight === 0 ? 0 : inFavourWeight / countedWeight;
  return {
    inFavourShare,
    againstShare: countedWeight === 0 ? 0 : 1 - inFavourShare,
    countedColleges: counted.length,
    hasPonderationMinimum: counted.length >= ponderationMinimumColleges,
    isSimpleMajority: inFavourShare > 0.5,
    isQualifiedMajority: inFavourShare >= 2 / 3,
  };
};
