import path from 'path';
import _ from 'lodash';

export const constructFilePath = (filepath) => {
  if (path.isAbsolute(filepath)) {
    return filepath;
  }
  return path.resolve(filepath);
};

export const getFileExtension = (filepath) => path.extname(filepath).slice(1);

const areBothItemsArrays = (item1, item2) => _.isArray(item1) && _.isArray(item2);
const areBothItemsObjects = (item1, item2) => _.isObject(item1) && _.isObject(item2);
export const areBothItemsNested = (item1, item2) => !(areBothItemsArrays(item1, item2))
  && areBothItemsObjects(item1, item2);

export const areValuesEqual = (item1, item2) => _.isEqual(item1, item2);

export const addSpaces = (number) => ' '.repeat(number * 4 - 2);
