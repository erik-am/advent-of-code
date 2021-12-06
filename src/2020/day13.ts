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

type Input = {
  time: number;
  buses: number[];
};

const parseInput = (): Input => {
  const lines = fs.readFileSync('input13.txt').toString().split('\n');
  const time = parseInt(lines[0]);
  const buses = lines[1]
    .split(',')
    .filter((x) => x !== 'x')
    .map((x) => parseInt(x));

  return { time, buses };
};

const input = parseInput();
console.log(input);

const gcd = (num1, num2) => {
  //Loop till both numbers are not equal
  while (num1 != num2) {
    //check if num1 > num2
    if (num1 > num2) {
      //Subtract num2 from num1
      num1 = num1 - num2;
    } else {
      //Subtract num1 from num2
      num2 = num2 - num1;
    }
  }

  return num2;
};
const lcm = (n1, n2) => {
  //Find the gcd first
  let gcdAnswer = gcd(n1, n2);

  //then calculate the lcm
  return (n1 * n2) / gcdAnswer;
};

const run1 = () => {
  const offsets = input.buses.map((t) => t - (input.time % t));
  console.log(offsets);
  const min = Math.min(...offsets);
  const id = input.buses[offsets.findIndex((x) => x === min)];
  console.log(id);
  // console.log(waitTime);
  return id * min;
};
// wrong 102506

const search = (buses: string[], t: number): boolean => {
  let offset = 0;
  while (offset < buses.length) {
    if (buses[offset] !== 'x') {
      if ((t + offset) % parseInt(buses[offset]) !== 0) {
        console.log(`NIET OK ${offset} - ${buses[offset]}`);
        return false;
      }
      console.log(`OK ${offset} - ${buses[offset]}`);
    }
    offset++;
  }
  return true;
};

const run2 = () => {
  const lines = fs.readFileSync('input13.txt').toString().split('\n');
  const buses = lines[1].split(',');

  const offset = 13013101;
  let t = offset - 23;
  let isOkay = false;
  while (!isOkay) {
    console.log(`t=${t}`);
    isOkay = search(buses, t);
    if (isOkay) {
      console.log(`SUCCCESS ${t}`);
    }
    isOkay = true;
    t += offset;
  }
};

console.log(run1());
console.log('------');

const checkInput = () => {
  const lines = fs.readFileSync('input13.txt').toString().split('\n');
  lines[1].split(',').forEach((b, i) => {
    console.log(`${i}: ${b}`);
  });
};
checkInput();
//run2();
// in the input there are multiple patterns of least common multiples that you can calculate…
console.log(lcm(lcm(41, lcm(37, 373)) - 54, 23));
run2();

// t = 37 - 17
// t+37 = 373 - 17

// t = veelvoud1 - 23
// t = veelvoud2 - 37 - 17
