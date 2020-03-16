import _ from 'lodash';
import { addSpaces } from '../../utils';

const сonvertObjectToString = (object, depth) => {
  const valuesToString = Object.keys(object).reduce((acc, key) => {
    if (_.isObject(object[key]) && !_.isArray(object[key])) {
      return `${acc}${addSpaces(depth + 1)}  ${key}: ${сonvertObjectToString(object[key], depth + 1)}`;
    }
    return `${acc}${addSpaces(depth + 1)}  ${key}: ${object[key]}\n`;
  }, '{\n');
  return `${valuesToString}${addSpaces(depth)}  }\n`;
};

const convertArrayToString = (array) => {
  const arrayElementsToString = array.reduce((acc, element) => {
    if (_.isArray(element)) {
      return `${acc}, ${convertArrayToString(element)}`;
    }
    return `${acc}, ${element}`;
  }, '');
  const result = `[${arrayElementsToString.substr(1)}]`;
  return result;
};

export default (value, depth) => {
  if (_.isArray(value)) {
    return `${convertArrayToString(value)}\n`;
  }
  if (!(_.isArray(value)) && _.isObject(value)) {
    return сonvertObjectToString(value, depth);
  }
  return `${value}\n`;
};