/* eslint-disable @typescript-eslint/no-unused-vars */
import fs from 'fs';

type Password = {
  readonly policyChar: string;
  readonly policyMin: number;
  readonly policyMax: number;
  readonly password: string;
};

// const isBetween = (count: number, policy: Password): boolean =>
//   count >= policy.policyMin && count <= policy.policyMax;

// const isValid1 = (password: Password): boolean =>
//   isBetween(
//     password.password
//       .split('')
//       .reduce((total, c) => total + (c === password.policyChar ? 1 : 0), 0),
//     password
//   );

const OccursExactlyOnce = (policy: Password): boolean =>
  (policy.password[policy.policyMin - 1] === policy.policyChar) !==
  (policy.password[policy.policyMax - 1] === policy.policyChar);

// const isValid2 = (password: Password): boolean =>
//   isBetween(
//     password.password
//       .split('')
//       .reduce((total, c) => total + (c === password.policyChar ? 1 : 0), 0),
//     password
//   );

const day2 = (passwords: readonly Password[]) =>
  passwords.reduce((acc, p) => acc + (OccursExactlyOnce(p) ? 1 : 0), 0);

const numbersFromInput: readonly Password[] = fs
  .readFileSync('input2.txt')
  .toString()
  .split('\n')
  .map((line) => {
    const matches = line.match(/^([0-9]+)-([0-9]+) ([a-z]): ([a-z]+)$/i);
    return {
      policyMin: parseInt(matches[1]),
      policyMax: parseInt(matches[2]),
      policyChar: matches[3],
      password: matches[4],
    };
  });

const result1 = day2(numbersFromInput);
console.log(result1);
console.log();
