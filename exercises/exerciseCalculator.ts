interface Summary {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  dailyExercises: Array<number>,
  target: number
): Summary => {
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

const cmdParams = process.argv;
const exercises = [];

for (let i = 3; i < cmdParams.length; i++) {
  if (isNaN(Number(cmdParams[i]))) {
    throw new Error(`Provided value was not a number: ${cmdParams[i]}`);
  }
  exercises.push(Number(cmdParams[i]));
}
const target = Number(cmdParams[2]);

if (isNaN(target)) {
  throw new Error(`Invalid target '${cmdParams[2]}'. Target must be a number`);
}

console.log(calculateExercises(exercises, target));
