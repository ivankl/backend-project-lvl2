import _ from 'lodash';
import { resolveFilePath, getParsedData, compareObjects } from '../src/genDiff';

const object = {
  name: 'backend-project-lvl2',
  version: '0.0.1',
  description: 'Second project for Hexlet',
  main: 'dist/index.js',
};

test('Can a file with relative path be parsed', () => {
  const path = resolveFilePath('test_files/before.json');
  expect(path).toBe(`${process.cwd()}/test_files/before.json`);
  const object1 = getParsedData(path);
  expect(object1).toHaveProperty('name');
  expect(object1).toMatchObject(object);
});

test('Can a file with absolute path be parsed', () => {
  const path = resolveFilePath('/Users/ivan/before.json');
  expect(path).toBe('/Users/ivan/before.json');
  const object1 = getParsedData(path);
  expect(object1).toHaveProperty('name');
  expect(object1).toMatchObject(object);
});

test('Compare objects', () => {
  const path1 = resolveFilePath('test_files/before.json');
  const path2 = resolveFilePath('test_files/after.json');
  expect(path1).toBe(`${process.cwd()}/test_files/before.json`);
  expect(path2).toBe(`${process.cwd()}/test_files/after.json`);
  const object1 = getParsedData(path1);
  const object2 = getParsedData(path2);
  const expectedResult = '+ name: backend-project-lvl2+changes\n- name: backend-project-lvl2\nversion: 0.0.1\n- description: Second project for Hexlet\nmain: dist/index.js\n- low-level: test\n+ test-field: Present in after.json\n';
  const compareResult = compareObjects(object1, object2);
  expect(compareResult).toBe(expectedResult);
});
