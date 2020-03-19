import _ from 'lodash';
import { areValuesEqual, areBothItemsNested } from './utils';

const buildNode = (object1, object2, key, fn) => {
  if (areBothItemsNested(object1[key], object2[key])) {
    return { key, type: 'nested', children: fn(object1[key], object2[key]) };
  }
  if (areValuesEqual(object1[key], object2[key])) {
    return { key, type: 'unchanged', value: object1[key] };
  }
  if (!(_.has(object1, key))) {
    return { key, type: 'added', value: object2[key] };
  }
  if (!(_.has(object2, key))) {
    return { key, type: 'removed', value: object1[key] };
  }
  return {
    key,
    type: 'modified',
    oldValue: object1[key],
    newValue: object2[key],
  };
};

export const buildAST = (object1, object2) => {
  const allUsedKeys = _.union(Object.keys(object1), Object.keys(object2));
  return allUsedKeys.map((key) => buildNode(object1, object2, key, buildAST));
};

export default buildAST;
