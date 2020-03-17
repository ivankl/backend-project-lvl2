import path from 'path';
import genDiff from '../src';
import { readFile } from '../src/utils';

const getFixturePath = (pathToFile) => path.join(__dirname, '..', `__fixtures__${path.sep}`, pathToFile);
const getPathsToTestFiles = (extensions) => (extensions
  .reduce((acc, extension) => [...acc,
    {
      config1: `__fixtures__${path.sep}before.${extension}`,
      config2: getFixturePath(`after.${extension}`),
      expectedNested: getFixturePath(`expected/diffNested-${extension}.txt`),
      expectedPlain: getFixturePath(`expected/diffPlain-${extension}.txt`),
      expectedJSON: getFixturePath(`expected/diffJSON-${extension}.txt`),
      format: extension,
    }], []));

const fileExtensions = ['json', 'yml', 'ini'];
const pathsToTestFiles = getPathsToTestFiles(fileExtensions);

describe.each(pathsToTestFiles)('Testing nested format diff between files', (obj) => {
  it(`Is ${obj.format} files' diff displayed properly`, () => {
    const actualResult = genDiff(obj.config1, obj.config2, 'nested');
    const expectedResult = readFile(obj.expectedNested);
    expect(actualResult).toBe(expectedResult);
  });
});

describe.each(pathsToTestFiles)('Testing plain format diff between files', (obj) => {
  it(`Is ${obj.format} files' diff displayed properly`, () => {
    const actualResult = genDiff(obj.config1, obj.config2, 'plain');
    const expectedResult = readFile(obj.expectedPlain);
    expect(actualResult).toBe(expectedResult);
  });
});

describe.each(pathsToTestFiles)('Testing json format diff between files', (obj) => {
  it(`Is ${obj.format} files' diff displayed properly`, () => {
    const actualResult = genDiff(obj.config1, obj.config2, 'json');
    const expectedResult = readFile(obj.expectedJSON).trim();
    expect(actualResult).toBe(expectedResult);
  });
});
