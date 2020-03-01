import _ from 'lodash';
import { resolveFilePath, getParsedData, compareObjects } from '../src/genDiff';

const object = {
  name: 'backend-project-lvl2',
  version: '0.0.1',
  description: 'Second project for Hexlet',
  main: 'dist/index.js',
};

test('Can a file with relative path be parsed', () => {
  const path = resolveFilePath('__fixtures__/before.json');
  expect(path).toBe(`${process.cwd()}/__fixtures__/before.json`);
  const object1 = getParsedData(path);
  expect(object1).toHaveProperty('name');
  expect(object1).toMatchObject(object);
});

test('Compare objects', () => {
  const path1 = resolveFilePath('__fixtures__/before.json');
  const path2 = resolveFilePath('__fixtures__/after.json');
  expect(path1).toBe(`${process.cwd()}/__fixtures__/before.json`);
  expect(path2).toBe(`${process.cwd()}/__fixtures__/after.json`);
  const object1 = getParsedData(path1);
  const object2 = getParsedData(path2);
  const expectedResult = '+ name: backend-project-lvl2+changes\n- name: backend-project-lvl2\nversion: 0.0.1\n- description: Second project for Hexlet\nmain: dist/index.js\n- low-level: test\n+ test-field: Present in after.json\n';
  const compareResult = compareObjects(object1, object2);
  expect(compareResult).toBe(expectedResult);
});
