/* eslint-disable functional/no-loop-statement */
/* eslint-disable functional/no-let */
/* eslint-disable functional/immutable-data */
/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import fs from 'fs';

const numbersFromInput = (): boolean[][] => {
  const grid: boolean[][] = [];
  const lines = fs.readFileSync('input3.txt').toString().split('\n');

  lines.forEach((line, i) => {
    line.split('').forEach((ch, j) => {
      if (!grid[i]) {
        grid[i] = [];
      }
      grid[i][j] = ch === '#' ? true : false;
    });
  });
  return grid;
};

// const printGrid = (grid: boolean[][]) => {
//   for (let i = 0; i < grid[0].length; i++) {
//     let output = '';
//     for (let j = 0; j < grid.length; j++) {
//       output = `${output}${grid[j][i] ? '#' : '.'}`;
//     }
//     console.log(output);
//   }
// };

const day3 = (grid: boolean[][], right: number, down: number) => {
  let count = 0;
  let totalI = 0;
  for (let j = down; j < grid.length; j = j + down) {
    totalI = totalI + right;
    console.log(`(${j}, ${totalI % grid[0].length})`);
    if (grid[j][totalI % grid[0].length] === true) {
      count++;
      //console.log('X');
    }
  }
  return count;
};

const grid = numbersFromInput();
const result1 = day3(grid, 1, 1);
const result2 = day3(grid, 3, 1);
const result3 = day3(grid, 5, 1);
const result4 = day3(grid, 7, 1);
const result5 = day3(grid, 1, 2);
console.log(result1 * result2 * result3 * result4 * result5);
