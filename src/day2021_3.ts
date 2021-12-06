/* eslint-disable @typescript-eslint/no-unused-vars */
import { OPENSSL_VERSION_NUMBER } from 'constants';
import fs from 'fs';
import * as _ from 'lodash-transpose';

const numbersFromInput: readonly string[] = fs
  .readFileSync('input2021_3.txt')
  .toString()
  .split('\n');

const day1a = (numbers: readonly string[]): number => {
  const bitsCount = _.transpose(numbers.map((n) => n.split('')))
    .map((n) => n.join(''))
    .map(getBitsCount);
  const gamma = bitsCount.map((b) => b.mcb).join('');
  console.log(gamma);
  const epsilon = bitsCount.map((b) => b.lcb).join('');
  return parseInt(gamma, 2) * parseInt(epsilon, 2);
};

type BitsCount = {
  lcb: string;
  mcb: string;
};

const getBitsCount = (bits: string): BitsCount =>
  (bits.match(/1/g) || []).length >= Math.ceil(bits.length / 2)
    ? { mcb: '1', lcb: '0' }
    : { mcb: '0', lcb: '1' };

const oxygenSearch = (column: string): string => getBitsCount(column).mcb;
const co2Search = (column: string): string => getBitsCount(column).lcb;

const doRecursive = (
  columnIndex: number,
  numbers: readonly string[],
  algorithm: (column: string) => string
) => {
  const column = numbers.map((n) => n[columnIndex]).join('');
  const searchBit = algorithm(column);
  const filteredNumbers = numbers.filter((n) => n[columnIndex] === searchBit);
  if (filteredNumbers.length === 1) {
    return filteredNumbers[0];
  } else {
    return doRecursive(columnIndex + 1, filteredNumbers, algorithm);
  }
};

const day1b = (numbers: readonly string[]): number => {
  const oxygen = doRecursive(0, numbers, oxygenSearch);
  const co2 = doRecursive(0, numbers, co2Search);
  
  return parseInt(oxygen, 2) * parseInt(co2, 2);
};

console.log(day1b(numbersFromInput));
console.log();
