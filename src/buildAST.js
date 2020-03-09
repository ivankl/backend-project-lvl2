import _ from 'lodash';
import { areValuesEqual, areBothItemsArrays, areBothItemsObjects } from './utils';

const getAllKeyes = (object1, object2) => _.union(Object.keys(object1), Object.keys(object2));

export const buildAST = (object1, object2) => {
  const allUsedKeys = getAllKeyes(object1, object2);
  const result = allUsedKeys.reduce((acc, item) => {
    if (!(areBothItemsArrays(object1[item], object2[item]))) {
      if (areBothItemsObjects(object1[item], object2[item])) {
        return [...acc, { key: item, type: 'children', value: buildAST(object1[item], object2[item]) }];
      }
    }
    if (areValuesEqual(object1[item], object2[item])) {
      return [...acc, { key: item, type: 'unchanged', value: object1[item] }];
    }
    if (!(_.has(object1, item)) && _.has(object2, item)) {
      return [...acc, { key: item, type: 'added', value: object2[item] }];
    }
    if (!(_.has(object2, item)) && _.has(object1, item)) {
      return [...acc, { key: item, type: 'removed', value: object1[item] }];
    }
    return [...acc, {
      key: item,
      type: 'modified',
      oldValue: object1[item],
      newValue: object2[item],
    }];
  }, []);
  console.log(result);
  return result;
};

export default buildAST;