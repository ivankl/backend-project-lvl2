import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const getFixturePath = (pathToFile) => path.join(__dirname, '..', '__fixtures__', pathToFile);

const fileExtensions = ['json', 'yml', 'ini'];
const outputFormats = ['nested', 'plain', 'json'];

describe.each(fileExtensions)('Testing nested, plain and json formatted diff between files', (extension) => {
  it.each(outputFormats)(`Is ${extension} files diff displayed properly properly`, (format) => {
    const config1 = `__fixtures__${path.sep}before.${extension}`;
    const config2 = getFixturePath(`after.${extension}`);

    const pathToExpectedResult = getFixturePath(`expected${path.sep}diff-${format}.txt`);

    const actualResult = genDiff(config1, config2, format);
    const expectedResult = fs.readFileSync(pathToExpectedResult, 'utf-8');
    expect(actualResult).toBe(expectedResult);
  });
});
