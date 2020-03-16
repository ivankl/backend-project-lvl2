import path from 'path';
import fs from 'fs';
import genDiff from '../src';
import { constructFilePath } from '../src/utils';

const getFixturePath = (filename) => path.join(__dirname, '..', `__fixtures__${path.sep}`, filename);
const getPathsToTestFiles = (extensions, fixturesPath) => (extensions
  .reduce((acc, extension) => [...acc,
    {
      config1: getFixturePath(`before.${extension}`, fixturesPath),
      config2: getFixturePath(`after.${extension}`, fixturesPath),
      expectedNested: getFixturePath('diffNested.txt', fixturesPath),
      expectedPlain: getFixturePath('diffPlain.txt', fixturesPath),
      expectedJSON: getFixturePath('diffJSON.txt', fixturesPath),
      format: extension,
    }], []));

const nestedFixturesFolder = 'nested';
const nestedFiles = ['json', 'yml', 'ini'];
const testFiles = getPathsToTestFiles(nestedFiles, nestedFixturesFolder);

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

describe.each(testFiles)('Testing nested format diff between files', (obj) => {
  it(`Is ${obj.format} files' diff displayed properly`, () => {
    console.log(obj.config1, obj.config2);
    const actualResult = genDiff(obj.config1, obj.config2, 'nested');
    const expectedResult = fs.readFileSync(obj.expectedNested, 'utf-8');
    expect(actualResult).toBe(expectedResult);
  });
});

describe.each(testFiles)('Testing plain format diff between files', (obj) => {
  it(`Is ${obj.format} files' diff displayed properly`, () => {
    const actualResult = genDiff(obj.config1, obj.config2, 'plain');
    const expectedResult = fs.readFileSync(obj.expectedPlain, 'utf-8');
    expect(actualResult).toBe(expectedResult);
  });
});

describe.each(testFiles)('Testing plain format diff between files', (obj) => {
  it(`Is ${obj.format} files' diff displayed properly`, () => {
    const actualResult = genDiff(obj.config1, obj.config2, 'json');
    const expectedResult = fs.readFileSync(obj.expectedJSON, 'utf-8');
    expect(actualResult).toBe(expectedResult);
  });
});
