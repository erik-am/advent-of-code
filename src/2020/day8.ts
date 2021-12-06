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

const parseInput = (): any[] =>
  fs
    .readFileSync('input8.txt')
    .toString()
    .split('\n')
    .map((line) => {
      const matches = line.match(/^([a-z]+) ([+-][0-9]+)$$/);
      return { op: matches[1], offset: parseInt(matches[2]) };
    });

const run = (instructions: any[]) => {
  let terminated = false;
  let lineToChange = 0;
  while (!terminated && lineToChange < instructions.length) {
    const seenLines = [];
    let i = 0;
    let acc = 0;
    while (!seenLines[i] && i < instructions.length) {
      seenLines[i] = true;

      let op = instructions[i].op;

      if (lineToChange == i) {
        //console.log('---');
        //console.log(`-${instructions[i].op}`);
        if (op == 'jmp') {
          op = 'nop';
        } else if (op == 'nop') {
          op = 'jmp';
        }
        //console.log(`-${instructions[i].op}`);
      }

      if (op == 'acc') {
        acc += instructions[i].offset;
        console.log(`ACC ${instructions[i].offset}`);
        i++;
      } else if (op == 'jmp') {
        console.log(`JMP ${instructions[i].offset}`);
        i += instructions[i].offset;
      } else if (op == 'nop') {
        console.log('NOP');
        i++;
      } else {
        throw new Error('Unexpected op');
      }

      console.log(`i=${i}`);
    }
    console.log(acc);
    console.log(`Line to change ${lineToChange}`);
    if (i == instructions.length) {
      terminated = true;
      console.log('TERMINATED');
    }
    lineToChange = lineToChange + 1;
  }
};

run(parseInput());
