/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable functional/immutable-data */
/* eslint-disable functional/prefer-readonly-type */
import fs from 'fs';
import intersection from 'lodash.intersection';

const parseInput = (): any[] =>
  fs
    .readFileSync('input6.txt')
    .toString()
    .split('\n\n')
    .map((group) =>
      intersection(...group.split('\n').map((line) => line.split('')))
    );

const input = parseInput();

console.log(input.reduce((acc, x) => acc + x.length, 0));
