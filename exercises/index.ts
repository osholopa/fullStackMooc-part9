import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const weight = Number(req.query.weight);
    const height = Number(req.query.height);
    const bmi = calculateBmi(height, weight);
    const result = { weight, height, bmi };
    res.send(result);
  } catch (error) {
    if (error instanceof Error) {
      const result = { error: error.message };
      res.status(400).send(result);
    }
  }
});

app.post('/exercises', (req, res) => {
  try {
    const exercises = req.body.daily_exercises;
    const target = req.body.target;
    const result = calculateExercises(exercises, target);
    res.send(result);
  } catch (error) {
    if (error instanceof Error) {
      const result = { error: error.message };
      res.status(400).send(result);
    }
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
