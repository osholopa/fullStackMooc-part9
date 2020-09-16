type Result = string;

const calculateBmi = (height: number, weight: number): Result => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  switch (true) {
    case bmi < 15:
      return 'Very severely underweight';
    case bmi >= 15 && bmi <= 16:
      return 'Severely underweight';
    case 16 <= bmi && bmi <= 18.5:
      return 'Underweight';
    case 18.5 <= bmi && bmi <= 25:
      return 'Normal (healthy weight)';
    default:
      return 'Overweight';
  }
};

const height = Number(process.argv[2]);
const weight = Number(process.argv[3]);

if (isNaN(height) || isNaN(weight) || height < 0 || weight < 0) {
  throw new Error(
    'Invalid parameters. height and weight must be positive integers.'
  );
}

console.log(calculateBmi(height, weight));
