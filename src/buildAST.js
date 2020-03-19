import _ from 'lodash';

const areBothItemsArrays = (item1, item2) => _.isArray(item1) && _.isArray(item2);

const areBothItemsObjects = (item1, item2) => _.isObject(item1) && _.isObject(item2);

export const areBothItemsNested = (item1, item2) => !(areBothItemsArrays(item1, item2))
  && areBothItemsObjects(item1, item2);

const buildNode = (object1, object2, key, fn) => {
  if (areBothItemsNested(object1[key], object2[key])) {
    return { key, type: 'nested', children: fn(object1[key], object2[key]) };
  }
  if (_.isEqual(object1[key], object2[key])) {
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
