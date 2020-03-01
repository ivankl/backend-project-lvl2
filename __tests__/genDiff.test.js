import path from 'path';
import fs from 'fs';
import { resolveFilePath, genJSONDiff } from '../src/genDiff';

const fixturesPath = '__fixtures__';

const constructFullPath = (filename) => `${path.resolve(`${__dirname}`, `../${fixturesPath}`)}/${filename}`;

describe('Testing diff between JSON files', () => {
  it('Can relative path be recognized', () => {
    const pathResult = resolveFilePath(`${fixturesPath}/before.json`);
    const expectedPath = constructFullPath('before.json');
    expect(pathResult).toEqual(expectedPath);
  });

  it('Can absolute path be recognized', () => {
    const pathResult = resolveFilePath(`${path.resolve(`${__dirname}`, '..')}/${fixturesPath}/before.json`);
    const expectedPath = constructFullPath('before.json');
    expect(pathResult).toEqual(expectedPath);
  });

  it('Are objects compared properly', () => {
    const fullPathToFile1 = constructFullPath('before.json');
    const fullPathToFile2 = constructFullPath('after.json');
    const fullPathToResult = constructFullPath('diff.txt');
    const expectedResult = fs.readFileSync(fullPathToResult, 'utf-8');
    const compareResult = genJSONDiff(fullPathToFile1, fullPathToFile2);
    expect(compareResult).toEqual(expectedResult);
  });
});
