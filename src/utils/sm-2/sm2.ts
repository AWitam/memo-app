
export interface SM2Params {
  previousInterval: number;
  previousEaseFactor: number;
  repetitions: number;
  quality: number;
}

export const sm2 = ({previousInterval, previousEaseFactor, repetitions, quality}: SM2Params) => {
  let interval: number;
  let easeFactor: number;

  console.log(quality, repetitions, previousInterval, previousEaseFactor)

  if (quality >= 3) {
    switch (repetitions) {
      case 0:
        interval = 1;
        break;
      case 1:
        interval = 6;
        break;
      default:
        interval = Math.round((previousInterval * previousEaseFactor))
    }

    repetitions++;
    easeFactor = previousEaseFactor +
        (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  } else {
    repetitions = 0;
    interval = 1;
    easeFactor = previousEaseFactor;
  }

  if (easeFactor < 1.3) {
    easeFactor = 1.3;
  }

  return {repetitions, easeFactor, interval}
}