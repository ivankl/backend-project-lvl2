import path from 'path';
import _ from 'lodash';

export const constructFilePath = (filepath) => {
  if (path.isAbsolute(filepath)) {
    return filepath;
  }
  return path.resolve(filepath);
};

export const getFileExtension = (filepath) => path.extname(filepath).slice(1);

export const areBothItemsArrays = (item1, item2) => _.isArray(item1) && _.isArray(item2);
export const areBothItemsObjects = (item1, item2) => _.isObject(item1) && _.isObject(item2);

const checkIfArraysAreEqual = (array1, array2) => {
  if (array1.length !== array2.length) {
    return false;
  }
  for (let i = 0; i < array1.length; i += 1) {
    if (areBothItemsArrays(array1[i], array2[i])) {
      if (!checkIfArraysAreEqual(array1[i], array2[i])) {
        return false;
      }
    } else if (array1[i] !== array2[i]) {
      return false;
    }
  }
  return true;
};

export const areValuesEqual = (item1, item2) => {
  if (areBothItemsArrays(item1, item2)) {
    return checkIfArraysAreEqual(item1, item2);
  }
  return (item1 === item2);
};

export const addSpaces = (number) => ' '.repeat(number * 4 - 2);
