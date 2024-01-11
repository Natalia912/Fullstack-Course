export const calculateBmi = (height: number, weight: number): string => {
  if ((!isNaN(Number(height))) && (!isNaN(Number(weight)))) {
    const result = weight / height / height * 10000;
    if (result < 18.5) {
      return 'underweight';
    } else if(result >= 18.5 && result <= 24.9) return 'Normal (healthy weight)';
    else if(result >= 25 && result <= 29.9) return 'overweight';
    else if(result >= 30) return 'obese';
    else return 'Something went wrong';
  }
  else return 'Incorrect values';
};
const a: number = Number(process.argv[2]);
const b: number = Number(process.argv[3]);
console.log(calculateBmi(a, b));