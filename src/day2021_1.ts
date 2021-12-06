/* eslint-disable @typescript-eslint/no-unused-vars */
import fs from 'fs';

const numbersFromInput: readonly number[] = fs
  .readFileSync('input2021_1.txt')
  .toString()
  .split('\n')
  .map((n) => parseInt(n));

const day1 = (numbers: readonly number[]) =>
  numbers.reduce(
    (acc, curr, i) => (i > 0 && curr > numbers[i - 1] ? acc + 1 : acc),
    0
  );

const sum = (numbers: readonly number[]) =>
  numbers.reduce((acc, x) => acc + x, 0);

const day1b = (numbers: readonly number[]) =>
  numbers
    .map((nr, i, allNumbers) =>
      i + 2 < allNumbers.length
        ? [nr, allNumbers[i + 1], allNumbers[i + 2]]
        : null
    )
    .filter((x) => x !== null)
    .reduce(
      (acc, curr, i, group) =>
        i > 0 && sum(curr) > sum(group[i - 1]) ? acc + 1 : acc,
      0
    );

const result1 = day1b(numbersFromInput);
console.log(result1);
console.log();
