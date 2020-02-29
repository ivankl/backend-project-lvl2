import fs from 'fs';
import _ from 'lodash';
import path from 'path';

export const resolveFilePath = (filepath) => {
  if (path.isAbsolute(filepath)) {
    return filepath;
  }
  return path.resolve(filepath);
};

export const getParsedData = (filepath) => {
  const rawData = fs.readFileSync(resolveFilePath(filepath));
  return JSON.parse(rawData);
};

export const compareObjects = (object1, object2) => {
  const keysOfObject1 = Object.keys(object1);
  const uniqueKeysOfObject2 = Object.keys(object2).filter((item) => !keysOfObject1.includes(item));
  const allUsedKeys = keysOfObject1.concat(uniqueKeysOfObject2);
  const result = allUsedKeys.reduce((acc, item) => {
    if (_.has(object2, item)) {
      if (object2[item] === object1[item]) {
        return `${acc}${item}: ${object1[item]}\n`;
      }
      if (!(_.has(object1, item))) {
        return `${acc}+ ${item}: ${object2[item]}\n`;
      }
      return `${acc}+ ${item}: ${object2[item]}\n- ${item}: ${object1[item]}\n`;
    }
    return `${acc}- ${item}: ${object1[item]}\n`;
  }, '');
  console.log(result);
  return result;
};

export const genJSONDiff = (path1, path2) => {
  const objectFromFile1 = getParsedData(path1);
  const objectFromFile2 = getParsedData(path2);
  return compareObjects(objectFromFile1, objectFromFile2);
};
