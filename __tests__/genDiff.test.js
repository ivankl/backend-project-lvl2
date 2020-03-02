import path from 'path';
import fs from 'fs';
import genJSONDiff from '../src/genDiff';
import { constructFilePath } from '../src/utils';
import parser from '../src/parsers';


const fixturesPath = '__fixtures__';
const makeFullPath = (filename) => `${path.resolve(`${__dirname}`, `..${path.sep}${fixturesPath}`)}${path.sep}${filename}`;

const testObject = {
  name: 'backend-project-lvl2',
  version: '0.0.1',
  description: 'Second project for Hexlet',
  main: 'dist/index.js',
  lowLevel: 'test',
};

const generateResults = (obj) => genJSONDiff(obj.before, obj.after);

const JSONTestFiles = {
  before: makeFullPath('before.json'),
  after: makeFullPath('after.json'),
  diff: makeFullPath('diffJSON.txt'),
};

const YMLTestFiles = {
  before: makeFullPath('before.yml'),
  after: makeFullPath('after.yml'),
  diff: makeFullPath('diffYML.txt'),
};

describe('Are different path types read correctly', () => {
  it('Can relative path be recognized', () => {
    const actualPath = constructFilePath(`${fixturesPath}${path.sep}before.json`);
    const expectedPath = JSONTestFiles.before;
    expect(actualPath).toEqual(expectedPath);
  });

  it('Can absolute path be recognized', () => {
    const actualPath = constructFilePath(`${path.resolve(`${__dirname}`, '..')}${path.sep}${fixturesPath}${path.sep}before.json`);
    const expectedPath = JSONTestFiles.before;
    expect(actualPath).toEqual(expectedPath);
  });
});

describe('Are different config files formats parsed correctly', () => {
  it('is JSON file parsed correctly', () => {
    const parsedObject = parser(fs.readFileSync(JSONTestFiles.before), 'json');
    expect(parsedObject).toMatchObject(testObject);
  });

  it('is YML file parsed correctly', () => {
    const parsedObject1 = parser(fs.readFileSync(YMLTestFiles.before), 'yml');
    const parsedObject2 = parser(fs.readFileSync(YMLTestFiles.before), 'yaml');
    expect(parsedObject1).toMatchObject(testObject);
    expect(parsedObject2).toMatchObject(testObject);
  });
});

describe('Testing diff between files', () => {
  const generateActualResult = (obj) => genJSONDiff(obj.before, obj.after);

  it('Is JSON files diff displayed properly #1', () => {
    expect(generateActualResult(JSONTestFiles)).toEqual(fs.readFileSync(JSONTestFiles.diff, 'utf-8'));
  });

  it('Is YML files diff displayed properly', () => {
    expect(generateActualResult(YMLTestFiles)).toEqual(fs.readFileSync(YMLTestFiles.diff, 'utf-8'));
  });
});
