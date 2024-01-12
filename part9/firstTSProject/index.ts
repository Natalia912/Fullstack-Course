import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { exerciseCalculator } from "./exerciseCalculator";
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  let response;
  if (!isNaN(height) && !isNaN(weight)) {
    response = calculateBmi(height, weight);
     res.send({
      weight,
      height,
      message: response
    });
  }
  else {
    res.send({error: 'malformatted parameters'});
  }
 
});

app.get('/exercises', (req, res) => {
  if (!req.query.daily_exercises || !req.query.target) {
     res.send({error: 'parameters missing'});
  }
  if(typeof req.query.daily_exercises === 'string') {
    let exercisesString = req.query.daily_exercises;
    if ( req.query.daily_exercises.startsWith('[')) {
      exercisesString = exercisesString.slice(1);
    }
    if (req.query.daily_exercises.endsWith(']')) {
      exercisesString = exercisesString.slice(0, exercisesString.length - 1);
    }
    const exercises = exercisesString.split(',').map(item => Number(item));
    if (exercises.find(item => isNaN(item))) {
      res.send({error: 'malformatted parameters'});
    } else {
      const target = Number(req.query.target);
      if (Array.isArray(exercises) && !isNaN(target)) {
        const response = exerciseCalculator(exercises, target);
        if (typeof response === 'object') {
        res.json(response);
        } else {
          res.send({error: response});
        }
      }
      else {
        res.send({error: 'malformatted parameters'});
      }
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});