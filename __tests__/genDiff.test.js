import path from 'path';
import fs from 'fs';
import { constructFilePath } from '../src/utils';
import parser from '../src/parsers';
import { buildAST } from '../src/buildAST';
import { render } from '../src/renderers/render';

const fixturesPath = '__fixtures__';
const makeFullPath = (filename) => `${path.resolve(`${__dirname}`, `..${path.sep}${fixturesPath}`)}${path.sep}${filename}`;
// const pathToExpectedResultFile = makeFullPath('diff.txt');


const extensions = ['json', 'yml', 'ini'];

const astTest = [
  {
    key: 'test1',
    type: 'children',
    value: [{
      key: 'child1',
      type: 'unchanged',
      value: 'childValue',
    },
    {
      key: 'child3',
      type: 'removed',
      value: 'removedValue',
    },
    {
      key: 'child2',
      type: 'added',
      value: 'addedValue',
    }],
  },
  {
    key: 'test2',
    type: 'modified',
    oldValue: 'testPrev',
    newValue: 'testNew',
  },
  {
    key: 'test3',
    type: 'modified',
    oldValue: ['test1', 'test2', 'test3'],
    newValue: ['test2', 'test1'],
  },
  {
    key: 'test4',
    type: 'modified',
    oldValue: 871231,
    newValue: 12312,
  },
  {
    key: 'test5',
    type: 'added',
    value: {
      foo: 'bar',
    },
  },
];

const pathsToTestFiles = extensions.reduce((acc, extension) => [...acc, {
  before: makeFullPath(`before.${extension}`),
  after: makeFullPath(`after.${extension}`),
  format: extension,
}], []);

describe('Are different path types read correctly', () => {
  it('Can relative path be recognized', () => {
    const actualPath = constructFilePath(`${fixturesPath}${path.sep}before.json`);
    const expectedPath = makeFullPath('before.json');
    expect(actualPath).toEqual(expectedPath);
  });

  it('Can absolute path be recognized', () => {
    const actualPath = constructFilePath(`${path.resolve(`${__dirname}`, '..')}${path.sep}${fixturesPath}${path.sep}after.json`);
    const expectedPath = makeFullPath('after.json');
    expect(actualPath).toEqual(expectedPath);
  });
});

describe('Is AST builder working correctly', () => {
  it('json file', () => {
    const parsedObject1 = parser(fs.readFileSync(constructFilePath(`${fixturesPath}${path.sep}before_test.json`), 'utf-8'), 'json');
    const parsedObject2 = parser(fs.readFileSync(constructFilePath(`${fixturesPath}${path.sep}after_test.json`), 'utf-8'), 'json');
    const ast = buildAST(parsedObject1, parsedObject2);
    const result = render(ast);
    console.log(result);
    expect(ast).toEqual(astTest);
  });
});
// describe.each(pathsToTestFiles)('Testing diff between files', (obj) => {
// it(`Is ${obj.format} files' diff displayed properly`, () => {
// const actualResult = generateActualResult(obj);
// expect(actualResult).toEqual(fs.readFileSync(pathToExpectedResultFile, 'utf-8'));
// });
// });
