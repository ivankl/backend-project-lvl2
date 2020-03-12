import _ from 'lodash';
import { addSpaces } from '../../utils';

const objectToString = (object, depth) => {
  const valuesToString = Object.keys(object).reduce((acc, key) => {
    if (_.isObject(object[key]) && !_.isArray(object[key])) {
      return `${acc}${addSpaces(depth + 1)}  ${key}: ${objectToString(object[key], depth + 1)}`;
    }
    return `${acc}${addSpaces(depth + 1)}  ${key}: ${object[key]}\n`;
  }, '{\n');
  return `${valuesToString}${addSpaces(depth)}  }\n`;
};

const arrayToString = (array) => {
  const arrayElementsToString = array.reduce((acc, element) => {
    if (_.isArray(element)) {
      return `${acc}, ${arrayToString(element)}`;
    }
    return `${acc}, ${element}`;
  }, '');
  const result = `[${arrayElementsToString.substr(1)}]`;
  return result;
};

export default (value, depth) => {
  if (_.isArray(value)) {
    return `${arrayToString(value)}\n`;
  }
  if (!(_.isArray(value)) && _.isObject(value)) {
    return objectToString(value, depth);
  }
  return `${value}\n`;
};
