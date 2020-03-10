import _ from 'lodash';
import arrayToString from './arrayRenderer';
import objectToString from './objectRenderer';

export default (value, depth) => {
  if (_.isArray(value)) {
    return `${arrayToString(value)}\n`;
  }
  if (!(_.isArray(value)) && _.isObject(value)) {
    return objectToString(value, depth);
  }
  return `${value}\n`;
};
