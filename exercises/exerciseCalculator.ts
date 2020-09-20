interface Summary {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  dailyExercises: Array<number>,
  target: number
): Summary => {
  if (!dailyExercises || !target || dailyExercises.length === 0) {
    throw new Error('parameters missing');
  }
  for (let i = 0; i < dailyExercises.length; i++) {
    if (isNaN(Number(dailyExercises[i]))) {
      throw new Error('malformatted parameters');
    }
  }
  if (isNaN(Number(target))) {
    throw new Error('malformatted parameters');
  }

  const reducer = (accumulator: number, currentValue: number) =>
    accumulator + currentValue;
  const average = dailyExercises.reduce(reducer, 0) / dailyExercises.length;
  const percentage = average / target;

  let rating = 0;
  let ratingDescription = '';
  switch (true) {
    case percentage >= 1:
      rating = 3;
      ratingDescription = 'good job! keep on going.';
      break;
    case 0.5 <= percentage && percentage < 1:
      rating = 2;
      ratingDescription = 'not too bad but could be better';
      break;
    default:
      rating = 1;
      ratingDescription = 'could be better';
  }

  return {
    periodLength: dailyExercises.length,
    trainingDays: dailyExercises.filter((e) => e > 0).length,
    success: percentage >= 1 ? true : false,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average,
  };
};
