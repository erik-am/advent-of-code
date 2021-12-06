/* eslint-disable @typescript-eslint/no-unused-vars */
import fs from 'fs';
import * as _ from 'lodash-transpose';

type BingoSetup = {
  numbers: number[];
  boards: Board[];
};

class Board {
  rows: number[][];

  constructor(rows: number[][]) {
    this.rows = rows;
  }

  play(number: number): boolean {
    this.markNumbers(number);
    return this.hasBingo();
  }

  markNumbers(number: number) {
    const MARKED = null;
    this.rows.forEach((row, rowIndex) =>
      row.forEach((cell, columnIndex) => {
        if (cell === number) {
          this.rows[rowIndex][columnIndex] = MARKED;
        }
      })
    );
  }

  hasBingo() {
    const MARKED = null;
    const hasEmptyRowOrColumn = (numbers: number[][]) =>
      numbers.some((row): boolean => row.every((x) => x === MARKED));
    return (
      hasEmptyRowOrColumn(this.rows) ||
      hasEmptyRowOrColumn(_.transpose(this.rows))
    );
  }

  getScore() {
    return this.rows.reduce(
      (acc, row) =>
        acc + row.reduce((acc, cell) => (cell ? acc + cell : acc), 0),
      0
    );
  }
}

const parseSetup = (): BingoSetup => {
  const parts = fs.readFileSync('input2021_4.txt').toString().split('\n\n');
  const numbers = parts
    .shift()
    .split(',')
    .map((x) => parseInt(x));

  const boards = parts.map(
    (x) =>
      new Board(
        x.split('\n').map((y) => y.match(/[0-9]+/g).map((z) => parseInt(z)))
      )
  );
  return { boards, numbers };
};

const playBingoA = (setup: BingoSetup): number => {
  const { boards, numbers } = setup;
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < boards.length; j++) {
      const hasWon = boards[j].play(numbers[i]);
      if (hasWon) {
        return boards[j].getScore() * numbers[i];
      }
    }
  }
  return -1; // nobody won
};

const playBingoB = (setup: BingoSetup): number => {
  const { boards, numbers } = setup;
  let boardsLeft = boards.length;
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < boards.length; j++) {
      if (boards[j] !== null) {
        // if it's still in the race
        const hasWon = boards[j].play(numbers[i]);
        if (hasWon) {
          boardsLeft--;
          if (boardsLeft === 0) {
            return boards[j].getScore() * numbers[i];
          }
          boards[j] = null;
        }
      }
    }
  }
  return -1; // nobody won
};

const setup = parseSetup();
console.log(playBingoA(setup));
console.log(playBingoB(setup));
