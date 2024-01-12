export interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

export const exerciseCalculator = (data: number[], goal: number):Result | string => {
  if (data.some((el:number) => typeof el !== 'number' || isNaN(Number(el)))) {
    return 'Incorrect values';
  }
  if (typeof goal !== 'number' || isNaN(goal)) {
    return 'Incorrect value of the goal';
  }
  const days = data.length;
  const trainingDays = data.filter(num => num !== 0).length;
  const hoursTotal = data.reduce((prev,cur) => prev + cur, 0);
  const average = hoursTotal / days;
  const success = average >= goal;
  let rating:number;
  let ratingDescription:string;
  if (goal / 2 > average) {
    rating = 1;
    ratingDescription = 'pretty bad';
  } else if (goal / 2 <= average && average < goal) {
    rating = 2;
    ratingDescription = 'not bad but could be better';
  } else {
    rating = 3;
    ratingDescription = 'good job';
  }
  return {
    periodLength: days,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: goal,
    average
  };
};

const goal: number = Number(process.argv[2]);
const days: string[] = process.argv.slice(3);

try {
  const daysNum = days.map((el:string) => Number(el));
  console.log(exerciseCalculator(daysNum, goal));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}