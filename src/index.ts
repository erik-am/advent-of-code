/* eslint-disable functional/no-throw-statement */
/* eslint-disable functional/no-let */
/* eslint-disable functional/no-loop-statement */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable functional/immutable-data */
/* eslint-disable functional/prefer-readonly-type */
import fs from 'fs';
import intersection from 'lodash.intersection';
import { stringify } from 'querystring';
require('lodash.multipermutations');
let _ = require('lodash');

const applyBitmask = (mask: string, value: number): number => {
  const originalBinary = value.toString(2).padStart(mask.length, '0');
  const bits = [];
  for (let i = 0; i < mask.length; i++) {
    const maskbit = mask.charAt(i);
    if (maskbit === 'X') {
      bits[i] = originalBinary.charAt(i);
    } else {
      bits[i] = maskbit;
    }
  }
  return parseInt(bits.join(''), 2);
};

const applyBitmaskToIndex = (mask: string, index: number): number[] => {
  const indexes = [];
  const originalBinary = index.toString(2).padStart(mask.length, '0');
  const bits = [];
  let floaters = 0;
  for (let i = 0; i < mask.length; i++) {
    const maskbit = mask.charAt(i);
    if (maskbit === '0') {
      bits[i] = originalBinary.charAt(i);
    } else if (maskbit === '1') {
      bits[i] = '1';
    } else {
      // X
      bits[i] = maskbit;
      floaters++;
    }
  }
  _.multipermutations(['0', '1'], floaters).forEach((p) => {
    let i = 0;
    const newBits = [...bits];
    for (let j = 0; j < newBits.length; j++) {
      if (newBits[j] === 'X') {
        newBits[j] = p[i];
        i++;
      }
    }
    //console.log(`${newBits.join('')} = ${parseInt(newBits.join(''), 2)}`);
    indexes.push(parseInt(newBits.join(''), 2));
  });
  console.log(`${indexes.length} indices`);
  return indexes;
};

const run1 = () => {
  let mask = '';
  const mem = [];
  fs.readFileSync('input14.txt')
    .toString()
    .split('\n')
    .forEach((line, li) => {
      console.log(li);
      const maskMatch = line.match(/^mask = ([X01]+)$/);
      if (maskMatch) {
        mask = maskMatch[1];
      } else {
        const matches = line.match(/^mem\[(\d+)\] = (\d+)$/);
        const index = parseInt(matches[1]);
        const value = parseInt(matches[2]);
        applyBitmaskToIndex(mask, index).forEach((i) => {
          mem[i] = value;
        });
      }
    });

  console.log(mem.filter((x) => !!x).reduce((acc, v) => acc + v, 0));
  //console.log(mem);
};

run1();

// wrong 4603112714
