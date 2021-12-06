/* eslint-disable functional/no-loop-statement */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable functional/immutable-data */
/* eslint-disable functional/prefer-readonly-type */
import fs from 'fs';
import intersection from 'lodash.intersection';
import { stringify } from 'querystring';
import { uniq } from 'lodash';

const parseInput = (): any[] =>
  fs.readFileSync('input7.txt').toString().split('\n');

interface Content {
  type: string;
  amount: number;
}

const fixS = (color: string) =>
  color.substr(-1) !== 's' ? `${color}s` : color;

const getRules = () => {
  const input = parseInput();
  return input.reduce((acc, line) => {
    const [all, bag, contents] = line.match(/^([a-z ]+) contain ([^.]+)\.$/);
    if (contents === 'no other bags') {
      acc[bag] = null;
    } else {
      acc[bag] = contents.split(', ').map((b) => {
        const [all, amount, type] = b.match(/^([0-9]+) ([a-z ]+)$/);
        return <Content>{ type: fixS(type), amount: parseInt(amount) };
      });
    }
    return acc;
  }, {});
};

// const findColors = (path: string[], data, searchColor: string) => {
//   if (data[searchColor] === null) {
//     return path;
//   }
// };

// const run = () => {
//   const rules = getRules();
//   const parents = {};
//   for (const [color, r] of Object.entries(rules)) {
//     if (r !== null) {
//       (<Content[]>r).forEach((contents) => {
//         console.log(contents.type);
//         if (!parents[contents.type]) {
//           parents[contents.type] = [];
//         }
//         if (!parents[contents.type].includes(color)) {
//           parents[contents.type].push(color);
//         }
//       });
//     }
//   }
//   return parents;
// };

// const pathContains = (
//   searchColor: string,
//   currentColor: string,
//   path: string[],
//   data
// ) => {
//   if (data[currentColor] === null) {
//     if (currentColor === searchColor) {
//       return path;
//     } else {
//       return [];
//     }
//   } else {
//   }
// };

const rules = getRules();
const children = {};
// const getChildren = (type: string): string[] => {
//   if (children[type]) {
//     return children[type];
//   }
//   if (rules[type] === null) {
//     return [];
//   }
//   console.log(type);
//   const directChildren = rules[type].map((x) => x.type);
//   return uniq(
//     directChildren.concat(...directChildren.map((c) => getChildren(c)))
//   );
// };

const makeUnique = (data): Content[] => {
  const newData = {};
  data.forEach((d) => {
    if (!newData[d.type]) {
      newData[d.type] = 0;
    }
    newData[d.type] = newData[d.type] + d.amount;
  });
  return Object.keys(newData).map((k) => ({ type: k, amount: newData[k] }));
};

const getChildren2 = (type: string): Content[] => {
  if (children[type]) {
    return children[type];
  }
  if (rules[type] === null) {
    return [];
  }
  //console.log(type);
  const directChildren = rules[type];
  //console.log(directChildren);
  directChildren.forEach((cs) => {
    cs.sub = getChildren2(cs.type);
  });
  return directChildren;
};

// const run = (search: string) => {
//   const rules = getRules();
//   const children = {};
//   for (const [color, r] of Object.entries(rules)) {
//     children[color] = getChildren(color);
//   }
//   console.log(children);
//   console.log(
//     Object.keys(children).filter((c) => children[c].includes(search)).length
//   );
// };

const count = (data) => {
  if (data.length === 0) {
    return 0;
  }
  return data
    .map((d) => d.amount + d.amount * count(d.sub))
    .reduce((acc, i) => acc + i, 0);
};

const run2 = (search: string) => {
  const rules = getRules();
  const children = getChildren2(search);
  console.log(children);
  console.log(count(children));
};

run2('shiny gold bags');
