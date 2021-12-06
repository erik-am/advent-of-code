/* eslint-disable @typescript-eslint/no-unused-vars */
import fs, { accessSync } from 'fs';

type Instruction = {
  direction: string;
  value: number;
};

type Coordinate = {
  horizontal: number;
  depth: number;
};

const instructionsFromInput: readonly Instruction[] = fs
  .readFileSync('input2021_2.txt')
  .toString()
  .split('\n')
  .map((line) => {
    const parts = line.split(' ');
    return { direction: parts[0], value: parseInt(parts[1]) };
  });

const startPositionA: Coordinate = { horizontal: 0, depth: 0 };

const navigateA = (instructions: readonly Instruction[]) =>
  instructions.reduce((acc, curr) => {
    if (curr.direction === 'forward') {
      return { horizontal: acc.horizontal + curr.value, depth: acc.depth };
    } else if (curr.direction === 'down') {
      return { horizontal: acc.horizontal, depth: acc.depth + curr.value };
    } else if (curr.direction === 'up') {
      return { horizontal: acc.horizontal, depth: acc.depth - curr.value };
    } else {
      throw new Error('Unexpected direction');
    }
  }, startPositionA);

type CoordinateB = {
  horizontal: number;
  depth: number;
  aim: number;
};

const startPositionB: CoordinateB = { horizontal: 0, depth: 0, aim: 0 };

const navigateB = (instructions: readonly Instruction[]) =>
  instructions.reduce((acc, curr) => {
    if (curr.direction === 'forward') {
      return {
        horizontal: acc.horizontal + curr.value,
        depth: acc.depth + acc.aim * curr.value,
        aim: acc.aim,
      };
    } else if (curr.direction === 'down') {
      return {
        horizontal: acc.horizontal,
        depth: acc.depth,
        aim: acc.aim + curr.value,
      };
    } else if (curr.direction === 'up') {
      return {
        horizontal: acc.horizontal,
        depth: acc.depth,
        aim: acc.aim - curr.value,
      };
    } else {
      throw new Error('Unexpected direction');
    }
  }, startPositionB);

const final = navigateB(instructionsFromInput);
console.log(final.horizontal * final.depth);
console.log();
