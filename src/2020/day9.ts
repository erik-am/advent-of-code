/* eslint-disable functional/no-throw-statement */
/* eslint-disable functional/no-let */
/* eslint-disable functional/no-loop-statement */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable functional/immutable-data */
/* eslint-disable functional/prefer-readonly-type */
import fs from 'fs';
import intersection from 'lodash.intersection';
import { stringify } from 'querystring';
import { uniq } from 'lodash';

const parseInput = (): number[] =>
  fs
    .readFileSync('input9.txt')
    .toString()
    .split('\n')
    .map((x) => parseInt(x));

const input = parseInput();

const isValidLine = (
  input: number[],
  preambleLength: number,
  i: number
): boolean => {
  for (let j = i - preambleLength; j < i; j++) {
    for (let k = i - preambleLength; k < i; k++) {
      if (input[j] !== input[k] && input[i] === input[j] + input[k]) {
        return true;
      }
    }
  }
  return false;
};

const run = (input: number[], preambleLength: number): number => {
  for (let i = preambleLength; i < input.length; i++) {
    if (!isValidLine(input, preambleLength, i)) {
      console.log(input[i]);
      return input[i];
    }
  }
  return null;
};

const run2 = (input: number[], sum: number): number[] => {
  for (let i = 0; i < input.length; i++) {
    const set = [];
    let acc = 0;
    let j = i;
    while (acc < sum && j < input.length) {
      set.push(input[j]);
      acc += input[j];
      if (acc === sum && set.length >= 2) {
        return set;
      }
      j++;
    }
  }
  return [];
};

const part1 = run(input, 25);

const set = run2(input, part1);

console.log(set.reduce((acc, i) => acc + i, 0));

console.log(Math.min(...set) + Math.max(...set));
