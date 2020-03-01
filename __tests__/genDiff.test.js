import path from 'path';
import fs from 'fs';
import { resolveFilePath, getParsedData, compareObjects } from '../src/genDiff';

const object = {
  name: 'backend-project-lvl2',
  version: '0.0.1',
  description: 'Second project for Hexlet',
  main: 'dist/index.js',
};

const fixturesPath = '__fixtures__';

const constructFullPath = (filename) => {
  console.log(`${path.resolve(`${__dirname}`, '..')}`);
  return `${path.resolve(`${__dirname}`, `../${fixturesPath}`)}/${filename}`;
};


test('Can a file with relative path be parsed', () => {
  const pathResult = resolveFilePath('__fixtures__/before.json');
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
  const pathResult1 = resolveFilePath('__fixtures__/before.json');
  const pathResult2 = resolveFilePath('__fixtures__/after.json');
  const fullPathToBefore = constructFullPath('before.json');
  const fullPathToAfter = constructFullPath('after.json');
  const fullPathToResult = constructFullPath('diff.txt');
  expect(pathResult1).toEqual(fullPathToBefore);
  expect(pathResult2).toEqual(fullPathToAfter);
  const object1 = getParsedData(pathResult1);
  const object2 = getParsedData(pathResult2);
  const expectedResult = fs.readFileSync(fullPathToResult, 'utf-8');
  const compareResult = compareObjects(object1, object2);
  expect(compareResult).toEqual(expectedResult);
});
