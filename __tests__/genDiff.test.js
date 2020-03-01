import path from 'path';
import fs from 'fs';
import { resolveFilePath, getParsedData, genJSONDiff } from '../src/genDiff';

const object = {
  name: 'backend-project-lvl2',
  version: '0.0.1',
  description: 'Second project for Hexlet',
  main: 'dist/index.js',
};

const fixturesPath = '__fixtures__';

const constructFullPath = (filename) => `${path.resolve(`${__dirname}`, `../${fixturesPath}`)}/${filename}`;


test('Can a file with relative path be parsed', () => {
  const pathResult = resolveFilePath(`${fixturesPath}/before.json`);
  const expectedPath = constructFullPath('before.json');
  expect(pathResult).toEqual(expectedPath);
  const object1 = getParsedData(pathResult);
  expect(object1).toHaveProperty('name');
  expect(object1).toMatchObject(object);
});

test('Can a file with absolute path be parsed', () => {
  const pathResult = resolveFilePath(`${path.resolve(`${__dirname}`, '..')}/${fixturesPath}/before.json`);
  const expectedPath = constructFullPath('before.json');
  expect(pathResult).toEqual(expectedPath);
  const object1 = getParsedData(pathResult);
  expect(object1).toHaveProperty('name');
  expect(object1).toMatchObject(object);
});

test('Compare objects', () => {
  const fullPathToFile1 = constructFullPath('before.json');
  const fullPathToFile2 = constructFullPath('after.json');
  const fullPathToResult = constructFullPath('diff.txt');
  const expectedResult = fs.readFileSync(fullPathToResult, 'utf-8');
  const compareResult = genJSONDiff(fullPathToFile1, fullPathToFile2);
  expect(compareResult).toEqual(expectedResult);
});
