interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const exerciseCalculator = (data: number[], goal: number):Result => {
  const days = data.length
  const trainingDays = data.filter(num => num !== 0).length
  const hoursTotal = data.reduce((prev,cur) => prev + cur, 0)
  const average = hoursTotal / days
  const success = average >= goal
  let rating:number
  let ratingDescription:string
  if (goal / 2 > average) {
    rating = 1
    ratingDescription = 'pretty bad'
  } else if (goal / 2 <= average && average < goal) {
    rating = 2
    ratingDescription = 'not bad but could be better'
  } else {
    rating = 3
    ratingDescription = 'good job'
  }
  return {
    periodLength: days,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: goal,
    average
  }
}

console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 2))