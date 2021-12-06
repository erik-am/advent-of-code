/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable functional/immutable-data */
/* eslint-disable functional/prefer-readonly-type */
import fs from 'fs';

const numbersFromInput = (): any[] =>
  fs
    .readFileSync('input4.txt')
    .toString()
    .split('\n\n')
    .map((p) => {
      const passport = {};
      p.match(/([a-z]+):([^\s]+)/gi).forEach((pair) => {
        const match = pair.match(/([a-z]+):([^\s]+)/i);
        passport[match[1]] = match[2];
      });
      //console.log(passport);
      return passport;
    });

const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

const isValidByr = (byr: string): boolean => {
  const nr = parseInt(byr);
  return nr >= 1920 && nr <= 2002;
};
const isValidIyr = (iyr: string): boolean => {
  const nr = parseInt(iyr);
  return nr >= 2010 && nr <= 2020;
};
const isValidEyr = (eyr: string): boolean => {
  const nr = parseInt(eyr);
  return nr >= 2020 && nr <= 2030;
};
const isValidHeight = (hgt: string): boolean => {
  const matches = hgt.match(/^([0-9]+)(cm|in)$/);
  if (matches && matches[2] == 'cm') {
    const cm = parseInt(matches[1]);
    return cm >= 150 && cm <= 193;
  } else if (matches && matches[2] == 'in') {
    const inch = parseInt(matches[1]);
    return inch >= 59 && inch <= 76;
  }
  return false;
};
const isValidHcl = (hcl: string): boolean => !!hcl.match(/^#[0-9a-f]{6}$/i);

const isValidEcl = (ecl: string): boolean =>
  ecl === 'amb' ||
  ecl === 'blu' ||
  ecl === 'brn' ||
  ecl === 'gry' ||
  ecl === 'grn' ||
  ecl === 'hzl' ||
  ecl === 'oth';

const isValidPid = (pid: string): boolean => !!pid.match(/^[0-9]{9}$/);

const isValid = (passport: any): boolean =>
  requiredFields.every((f) => !!passport[f]) &&
  isValidByr(passport.byr) &&
  isValidIyr(passport.iyr) &&
  isValidEyr(passport.eyr) &&
  isValidHeight(passport.hgt) &&
  isValidHcl(passport.hcl) &&
  isValidEcl(passport.ecl) &&
  isValidPid(passport.pid);

const passports = numbersFromInput();
console.log(passports.filter((p) => isValid(p)).length);
//console.log(result1 * result2 * result3 * result4 * result5);
