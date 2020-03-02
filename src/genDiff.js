import _ from 'lodash';
import fs from 'fs';
import getParsedData from './parsers';
import { constructFilePath, getFileExtension } from './utils';

const getAllKeyes = (object1, object2) => {
  const keysOfObject1 = Object.keys(object1);
  const newKeysInObject2 = Object.keys(object2).filter((item) => !keysOfObject1.includes(item));
  return keysOfObject1.concat(newKeysInObject2);
};

const getDiffForCurrentKey = (object1, object2, item) => {
  if (_.has(object2, item)) {
    if (object2[item] === object1[item]) {
      return `${item}: ${object1[item]}\n`;
    }
    if (!(_.has(object1, item))) {
      return `+ ${item}: ${object2[item]}\n`;
    }
    return `+ ${item}: ${object2[item]}\n- ${item}: ${object1[item]}\n`;
  }
  return `- ${item}: ${object1[item]}\n`;
};

const compareObjects = (object1, object2) => {
  const allUsedKeys = getAllKeyes(object1, object2);
  const result = allUsedKeys.reduce((acc, key) => `${acc}${getDiffForCurrentKey(object1, object2, key)}`, '');
  return result;
};

export default (path1, path2) => {
  const rawDataFromFile1 = fs.readFileSync(constructFilePath(path1), 'utf-8');
  const rawDataFromFile2 = fs.readFileSync(constructFilePath(path2), 'utf-8');
  const objectFromFile1 = getParsedData(rawDataFromFile1, getFileExtension(path1));
  const objectFromFile2 = getParsedData(rawDataFromFile2, getFileExtension(path2));
  return compareObjects(objectFromFile1, objectFromFile2);
};
