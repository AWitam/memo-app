export const calcQuality = (numberOfTerms: number, score: number) => {
  const percent = (score / numberOfTerms) * 100;
  switch (true) {
    case percent >= 0 && percent <= 16.6:
      return 0;
    case percent < 33.3:
      return 1;
    case percent < 50:
      return 2;
    case percent < 66.6:
      return 3;
    case percent < 83.3:
      return 4;
    case percent <= 100:
      return 5;
    default:
      return 0;
  }
};