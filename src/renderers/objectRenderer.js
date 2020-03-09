import _ from 'lodash';
import { addSpaces } from '../utils';

const objectToString = (object, depth) => {
  console.log(object);
  const valuesToString = Object.keys(object).reduce((acc, key) => {
    if (_.isObject(object[key])) {
      return objectToString(object[key], depth + 2);
    }
    return `${acc}${addSpaces(depth + 4)}${key}: ${object[key]}\n`;
  }, '');
  const result = `{\n${valuesToString}${addSpaces(depth + 2)}}`;
  return result;
};

export default objectToString;
