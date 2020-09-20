import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const weight = Number(req.query.weight);
    const height = Number(req.query.height);
    const bmi = calculateBmi(height, weight);
    const response = { weight, height, bmi };
    res.send(response);
  } catch (error) {
    if (error instanceof Error) {
      const response = { error: error.message };
      res.status(400).send(response);
    }
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
