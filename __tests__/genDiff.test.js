import path from 'path';
import genDiff from '../src';
import { readFile } from '../src/utils';

const getFixturePath = (pathToFile) => path.join(__dirname, '..', `__fixtures__${path.sep}`, pathToFile);
const getPathsToTestFiles = (extensions) => (extensions
  .reduce((acc, extension) => [...acc,
    {
      config1: `__fixtures__${path.sep}before.${extension}`,
      config2: getFixturePath(`after.${extension}`),
      nested: getFixturePath(`expected/diffNested-${extension}.txt`),
      plain: getFixturePath(`expected/diffPlain-${extension}.txt`),
      json: getFixturePath(`expected/diffJSON-${extension}.txt`),
      extension,
    }], []));

const fileExtensions = ['json', 'yml', 'ini'];
const outputFormats = ['nested', 'plain', 'json'];
const pathsToTestFiles = getPathsToTestFiles(fileExtensions);

describe.each(pathsToTestFiles)('Testing nested, plain and json formatted diff between files', (obj) => {
  it.each(outputFormats)(`Is ${obj.extension} files diff displayed properly`, (format) => {
    const actualResult = genDiff(obj.config1, obj.config2, format);
    const expectedResult = readFile(obj[format]);
    expect(actualResult).toBe(expectedResult);
  });
});
