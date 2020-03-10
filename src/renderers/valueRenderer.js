import arrayToString from './arrayRenderer';
import objectToString from './objectRenderer';

export default (value, depth) => {
  if (value instanceof Array && value instanceof Object) {
    return `${arrayToString(value)}\n`;
  }
  if (!(value instanceof Array) && value instanceof Object) {
    return objectToString(value, depth);
  }
  return `${value}\n`;
};
