import path from 'path';
import fs from 'fs';
import genJSONDiff from '../src/genDiff';
import { constructFilePath } from '../src/utils';
import parser from '../src/parsers';


const fixturesPath = '__fixtures__';
const makeFullPath = (filename) => `${path.resolve(`${__dirname}`, `..${path.sep}${fixturesPath}`)}${path.sep}${filename}`;
const pathToExpectedResultFile = makeFullPath('diff.txt');


const testObject = {
  name: 'backend-project-lvl2',
  version: '0.0.1',
  description: 'Second project for Hexlet',
  main: 'dist/index.js',
  lowLevel: 'test',
};

const JSONTestFiles = {
  before: makeFullPath('before.json'),
  after: makeFullPath('after.json'),
  format: 'json',
};

const YMLTestFiles = {
  before: makeFullPath('before.yml'),
  after: makeFullPath('after.yml'),
  format: 'yml',
};

const YAMLTestFiles = {
  before: makeFullPath('before.yaml'),
  after: makeFullPath('after.yaml'),
  format: 'yaml',
};

const iniTestFiles = {
  before: makeFullPath('before.ini'),
  after: makeFullPath('after.ini'),
  format: 'ini',
};

const generateActualResult = (obj) => genJSONDiff(obj.before, obj.after);

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

describe.each([JSONTestFiles, YMLTestFiles, YAMLTestFiles, iniTestFiles])('Testing if different file formats can be parsed', (obj) => {
  it(`Is ${obj.format} file parsed correctly`, () => {
    const parsedObject = parser(fs.readFileSync(obj.before, 'utf-8'), obj.format);
    expect(parsedObject).toMatchObject(testObject);
  });
});

describe.each([JSONTestFiles, YMLTestFiles, YAMLTestFiles, iniTestFiles])('Testing diff between files', (obj) => {
  it(`Is ${obj.format} files' diff displayed properly`, () => {
    const actualResult = generateActualResult(obj);
    expect(actualResult).toEqual(fs.readFileSync(pathToExpectedResultFile, 'utf-8'));
  });
});
