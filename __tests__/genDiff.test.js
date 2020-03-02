import path from 'path';
import fs from 'fs';
import genJSONDiff from '../src/genDiff';
import { constructFilePath } from '../src/utils';
import parser from '../src/parsers';


const fixturesPath = '__fixtures__';
const object = {
  name: 'backend-project-lvl2',
  version: '0.0.1',
  description: 'Second project for Hexlet',
  main: 'dist/index.js',
};

const constructFullPath = (filename) => `${path.resolve(`${__dirname}`, `../${fixturesPath}`)}/${filename}`;

describe('Testing if different paths types can be read', () => {
  it('Can relative path be recognized', () => {
    const pathResult = constructFilePath(`${fixturesPath}/before.json`);
    const expectedPath = constructFullPath('before.json');
    expect(pathResult).toEqual(expectedPath);
  });

  it('Can absolute path be recognized', () => {
    const pathResult = constructFilePath(`${path.resolve(`${__dirname}`, '..')}/${fixturesPath}/before.json`);
    const expectedPath = constructFullPath('before.json');
    expect(pathResult).toEqual(expectedPath);
  });
});

describe('Are different config files formats parsed correctly', () => {
  it('is JSON file parsed correctly', () => {
    const fullPathTestFile = constructFullPath('parsingTest.json');
    const parsedObject = parser(fs.readFileSync(fullPathTestFile), 'json');
    expect(parsedObject).toMatchObject(object);
  });

  it('is YML file parsed correctly', () => {
    const fullPathTestFile = constructFullPath('parsingTest.yml');
    const parsedObject1 = parser(fs.readFileSync(fullPathTestFile), 'yml');
    const parsedObject2 = parser(fs.readFileSync(fullPathTestFile), 'yaml');
    expect(parsedObject1).toMatchObject(object);
    expect(parsedObject2).toMatchObject(object);
  });
});

describe('Testing diff between JSON files', () => {
  it('Are files compared properly #1', () => {
    const fullPathToFile1 = constructFullPath('before.json');
    const fullPathToFile2 = constructFullPath('after.json');
    const fullPathToResult = constructFullPath('diffJSON.txt');
    const expectedResult = fs.readFileSync(fullPathToResult, 'utf-8');
    const compareResult = genJSONDiff(fullPathToFile1, fullPathToFile2);
    expect(compareResult).toEqual(expectedResult);
  });

  it('Are files compared properly #2', () => {
    const fullPathToFile1 = constructFullPath('before.yml');
    const fullPathToFile2 = constructFullPath('after.yml');
    const fullPathToResult = constructFullPath('diffYML.txt');
    const expectedResult = fs.readFileSync(fullPathToResult, 'utf-8');
    const compareResult = genJSONDiff(fullPathToFile1, fullPathToFile2);
    expect(compareResult).toEqual(expectedResult);
  });
});
