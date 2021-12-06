/* eslint-disable functional/immutable-data */
/* eslint-disable functional/no-loop-statement */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable functional/no-let */
/* eslint-disable functional/no-throw-statement */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable functional/prefer-readonly-type */
import fs from 'fs';

type Seating = {
  row: number;
  column: number;
  ID: number;
  code: string;
};

const decodeRow = (code: string, lb: number, hb: number): number => {
  if (code.length === 0) {
    throw new Error('Invalid code');
  }
  const char = code[0];

  let newLb = lb;
  let newHb = hb;
  const diff = Math.floor((hb - lb) / 2);
  if (char === 'F') {
    newHb = lb + diff;
  } else if (char === 'B') {
    newLb = hb - diff;
  } else {
    throw new Error(`Invalid char ${char}`);
  }
  //console.log(`${char} ${newLb}-${newHb}`);

  if (code.length === 1) {
    if (newLb !== newHb) {
      throw new Error("Didn't find row");
    }
    return newLb;
  }
  return decodeRow(code.substr(1), newLb, newHb);
};

const decodeColumn = (code: string, lb: number, hb: number): number => {
  if (code.length === 0) {
    throw new Error('Invalid code');
  }
  const char = code[0];

  let newLb = lb;
  let newHb = hb;
  const diff = Math.floor((hb - lb) / 2);
  if (char === 'L') {
    newHb = lb + diff;
  } else if (char === 'R') {
    newLb = hb - diff;
  } else {
    throw new Error(`Invalid char ${char}`);
  }
  //console.log(`${char} ${newLb}-${newHb}`);

  if (code.length === 1) {
    if (newLb !== newHb) {
      throw new Error("Didn't find column");
    }
    return newLb;
  }
  return decodeColumn(code.substr(1), newLb, newHb);
};

const numbersFromInput = (): Seating[] =>
  fs
    .readFileSync('input5.txt')
    .toString()
    .split('\n')
    .map((code) => {
      const row = decodeRow(code.substr(0, 7), 0, 127);
      const column = decodeColumn(code.substr(7), 0, 7);
      return {
        row,
        column,
        ID: row * 8 + column,
        code,
      };
    });

const getSeatingsGrid = (seatings: Seating[]): Seating[][] => {
  const grid = [];
  for (let i = 0; i <= 127; i++) {
    grid[i] = [];
    for (let j = 0; j <= 7; j++) {
      grid[i][j] = null;
    }
  }
  seatings.forEach((s) => {
    grid[s.row][s.column] = s;
  });

  return grid;
};

const seatings = numbersFromInput();
seatings.forEach((s) => {
  console.log(`${s.code}: row ${s.row}, column ${s.column}, seat ID ${s.ID}`);
});

const grid = getSeatingsGrid(seatings);
const allSeatIds = seatings.map((s) => s.ID);
grid.forEach((rows, r) =>
  rows.forEach((s, c) => {
    if (!s && r !== 0 && r !== 127) {
      console.log(`Missing ${r} ${c}`);
      const seatId = r * 8 + c;
      if (allSeatIds.includes(seatId - 1) && allSeatIds.includes(seatId + 1)) {
        console.log(`FOUND SEAT! ${seatId}`);
      }
    }
  })
);
