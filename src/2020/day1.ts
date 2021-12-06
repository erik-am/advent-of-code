// /* eslint-disable functional/no-let */
// /* eslint-disable functional/no-loop-statement */
// import fs from 'fs';

// const day1 = (numbers: readonly number[]): number => {
//   for (let i = 0; i < numbers.length; i++) {
//     for (let j = i; j < numbers.length; j++) {
//       if (numbers[i] + numbers[j] === 2020) {
//         console.log(numbers[i]);
//         console.log(numbers[j]);
//         return numbers[i] * numbers[j];
//       }
//     }
//   }
//   return -1;
// };

// const day1b = (numbers: readonly number[]): number => {
//   for (let i = 0; i < numbers.length; i++) {
//     for (let j = i; j < numbers.length; j++) {
//       for (let k = j; k < numbers.length; k++) {
//         if (numbers[i] + numbers[j] + numbers[k] === 2020) {
//           console.log(numbers[i]);
//           console.log(numbers[j]);
//           console.log(numbers[k]);
//           return numbers[i] * numbers[j] * numbers[k];
//         }
//       }
//     }
//   }
//   return -1;
// };

// // const day1Functional = (numbers: readonly number[]): readonly number[] => {
// //   const answer = numbers
// //     .map(
// //       (nr1) =>
// //         nr1 *
// //         numbers.reduce((acc2, nr2) => {
// //           //console.log(acc2);
// //           //console.log(nr2);
// //           return acc2 + (nr1 + nr2 === 2020 ? nr2 : 0);
// //         }, 0)
// //     )
// //     .filter((nr) => nr !== 0);
// //   return answer;
// // };

// const numbersFromInput: readonly number[] = fs
//   .readFileSync('input.txt')
//   .toString()
//   .split('\n')
//   .map((nr) => parseInt(nr));

// console.log('Procedural');
// const result1 = day1(numbersFromInput);
// console.log(result1);
// console.log();

// console.log('part 2');
// const result2 = day1b(numbersFromInput);
// console.log(result2);
