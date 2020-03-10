import _ from 'lodash';
import { addSpaces } from '../utils';

const objectToString = (object, depth) => {
  const valuesToString = Object.keys(object).reduce((acc, key) => {
    if (_.isObject(object[key])) {
      return `${acc}${addSpaces(depth + 1)}  ${key}: ${objectToString(object[key], depth + 1)}`;
    }
    return `${acc}${addSpaces(depth + 1)}  ${key}: ${object[key]}\n`;
  }, '{\n');
  return `${valuesToString}${addSpaces(depth)}  }\n`;
};

export default objectToString;
