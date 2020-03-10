import path from 'path';
import fs from 'fs';
import genDiff from '../src';
import { constructFilePath } from '../src/utils';

const getFixturePath = (filename, fixtureType) => path.join(__dirname, '..', `__fixtures__${path.sep}${fixtureType}`, filename);
const generatePaths = (extensions, fixturesPath) => (extensions.reduce((acc, extension) => [...acc,
  {
    before: getFixturePath(`before.${extension}`, fixturesPath),
    after: getFixturePath(`after.${extension}`, fixturesPath),
    expected: getFixturePath('diff.txt', fixturesPath),
    format: extension,
  }], []));

const flatFixturesFolder = 'flat';
const nestedFixturesFolder = 'nested';
const nestedFiles = ['json', 'yml'];
const flatFiles = ['ini'];

const testFiles = generatePaths(flatFiles, flatFixturesFolder)
  .concat(generatePaths(nestedFiles, nestedFixturesFolder));

describe('Are different path types parsed correctly', () => {
  it('Is absolute path parsed correctly', () => {
    const pathToFile = constructFilePath(getFixturePath('before.json', 'flat'));
    expect(pathToFile).toBe(getFixturePath('before.json', 'flat'));
  });
  it('Is relative path parsed correctly', () => {
    const pathToFile = path.join(`__fixtures__${path.sep}flat${path.sep}before.json`);
    expect(constructFilePath(pathToFile)).toBe(getFixturePath('before.json', 'flat'));
  });
});

describe.each(testFiles)('Testing diff between files', (obj) => {
  it(`Is ${obj.format} files' diff displayed properly`, () => {
    const actualResult = genDiff(obj.before, obj.after);
    const expectedResult = fs.readFileSync(obj.expected, 'utf-8');
    expect(actualResult).toBe(expectedResult);
  });
});
