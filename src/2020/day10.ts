/* eslint-disable functional/no-throw-statement */
/* eslint-disable functional/no-let */
/* eslint-disable functional/no-loop-statement */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable functional/immutable-data */
/* eslint-disable functional/prefer-readonly-type */
import fs from 'fs';
import intersection from 'lodash.intersection';
import { stringify } from 'querystring';
import { sortBy } from 'lodash';

const parseInput = (): number[] =>
  fs
    .readFileSync('input10.txt')
    .toString()
    .split('\n')
    .map((x) => parseInt(x));

const input = parseInput();

const sortedInput: number[] = sortBy(input).reverse();

const run1 = () => {
  let acc = 0;
  const differences = [];
  while (sortedInput.length > 0) {
    const next = sortedInput.pop();
    const diff = next - acc;
    if (diff > 3) {
      console.log(`acc=${acc}, next=${next}, diff=${diff}`);
      throw new Error('Illegal');
    }
    acc = next;
    differences.push(diff);
  }
  differences.push(3);
  console.log(`OUTPUT=${3 + acc}`);
  console.log(differences);
  console.log(`${differences.filter((x) => x === 0).length}x 0`);
  console.log(`${differences.filter((x) => x === 1).length}x 1`);
  console.log(`${differences.filter((x) => x === 2).length}x 2`);
  console.log(`${differences.filter((x) => x === 3).length}x 3`);
  console.log(
    differences.filter((x) => x === 1).length *
      differences.filter((x) => x === 3).length
  );
};

const validFrom = {};

const knownPaths = {};

const findPaths = (from: number, to: number, input: number[]) => {
  const validPaths = [];
  console.log(`Checking out from ${from} with ${input}`);

  if (input.length === 0) {
    return [];
  }

  if (to - 3 < from) {
    knownPaths[from] = validPaths;
    return validPaths;
  }

  if (knownPaths[from]) return knownPaths[from];

  for (let i = 0; i < 4; i++) {
    const next = input[i];
    if (!next) return validPaths;
    if (to - next <= 3) {
      validPaths.push([next, ...findPaths(next, to, input.slice(i + 1))]);
    } else {
      let paths = findPaths(next, to, input.slice(i + 1));
      if (paths.length > 0) {
        validPaths.push(paths);
      }
    }
  }
  knownPaths[from] = validPaths;
  return validPaths;
};

const run2 = () => {
  const paths = findPaths(7, 22, [10, 11, 12, 15, 16, 19]);
  console.log(paths);
};

run1();
console.log('------');
run2();
