import path from 'path';
import fs from 'fs';
import genDiff from '../src';
import { constructFilePath } from '../src/utils';

const getFixturePath = (pathToFile) => path.join(__dirname, '..', `__fixtures__${path.sep}`, pathToFile);
const getPathsToTestFiles = (extensions) => (extensions
  .reduce((acc, extension) => [...acc,
    {
      config1: getFixturePath(`before.${extension}`),
      config2: getFixturePath(`after.${extension}`),
      expectedNested: getFixturePath(`expected${path.sep}diffNested-${extension}.txt`),
      expectedPlain: getFixturePath(`expected${path.sep}diffPlain-${extension}.txt`),
      expectedJSON: getFixturePath(`expected${path.sep}diffJSON-${extension}.txt`),
      format: extension,
    }], []));

const fileExtensions = ['json', 'yml', 'ini'];
const testFiles = getPathsToTestFiles(fileExtensions);

describe('Are different path types parsed correctly', () => {
  it('Is absolute path parsed correctly', () => {
    const pathToFile = constructFilePath(getFixturePath('before.json'));
    expect(pathToFile).toBe(getFixturePath('before.json'));
  });
  it('Is relative path parsed correctly', () => {
    const pathToFile = path.join(`__fixtures__${path.sep}before.json`);
    expect(constructFilePath(pathToFile)).toBe(getFixturePath('before.json'));
  });
});

describe.each(testFiles)('Testing nested format diff between files', (obj) => {
  it(`Is ${obj.format} files' diff displayed properly`, () => {
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

describe.each(testFiles)('Testing json format diff between files', (obj) => {
  it(`Is ${obj.format} files' diff displayed properly`, () => {
    const actualResult = genDiff(obj.config1, obj.config2, 'json');
    const expectedResult = fs.readFileSync(obj.expectedJSON, 'utf-8').trim();
    expect(actualResult).toBe(expectedResult);
  });
});
