import path from 'path';
import fs from 'fs';
import genJSONDiff from '../src/genDiff';
import { constructFilePath } from '../src/utils';
import JSONparser from '../src/parsers/JSONparser';
import YMLparser from '../src/parsers/YMLparser';

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
    const parsedObject = JSONparser(fs.readFileSync(fullPathTestFile));
    expect(parsedObject).toMatchObject(object);
  });

  it('is YML file parsed correctly', () => {
    const fullPathTestFile = constructFullPath('parsingTest.yml');
    const parsedObject = YMLparser(fs.readFileSync(fullPathTestFile));
    expect(parsedObject).toMatchObject(object);
  });
});

describe('Testing diff between JSON files', () => {
  it('Are objects compared properly #1', () => {
    const fullPathToFile1 = constructFullPath('before.json');
    const fullPathToFile2 = constructFullPath('after.json');
    const fullPathToResult = constructFullPath('diff.txt');
    const expectedResult = fs.readFileSync(fullPathToResult, 'utf-8');
    const compareResult = genJSONDiff(fullPathToFile1, fullPathToFile2);
    expect(compareResult).toEqual(expectedResult);
  });
});
