import _ from 'lodash';

const addTabulation = (depth) => {
  const tabulation = 4;
  const adjustmentForChangedItems = 2;
  return ' '.repeat(depth * tabulation - adjustmentForChangedItems);
};


const сonvertObjectToString = (object, depth) => {
  const keys = Object.keys(object);
  const convertedToString = keys.reduce((acc, key) => {
    if (_.isObject(object[key]) && !_.isArray(object[key])) {
      return `${acc}${addTabulation(depth + 1)}  ${key}: ${сonvertObjectToString(object[key], depth + 1)}`;
    }
    return `${acc}${addTabulation(depth + 1)}  ${key}: ${object[key]}\n`;
  }, '{\n');
  return `${convertedToString}${addTabulation(depth)}  }\n`;
};

const convertArrayToString = (array) => {
  const elementsAsString = array.reduce((acc, element) => {
    if (_.isArray(element)) {
      return `${acc}, ${convertArrayToString(element)}`;
    }
    return `${acc}, ${element}`;
  }, '');
  const result = `[${elementsAsString.substr(1)}]`;
  return result;
};

const renderValue = (value, depth) => {
  if (_.isArray(value)) {
    return `${convertArrayToString(value)}\n`;
  }
  if (!(_.isArray(value)) && _.isObject(value)) {
    return сonvertObjectToString(value, depth);
  }
  return `${value}\n`;
};


const renderTypeDispatch = {
  unchanged: (item, depth) => `  ${item.key}: ${renderValue(item.value, depth)}`,
  removed: (item, depth) => `- ${item.key}: ${renderValue(item.value, depth)}`,
  added: (item, depth) => `+ ${item.key}: ${renderValue(item.value, depth)}`,
  modified: (item, depth) => `+ ${item.key}: ${renderValue(item.newValue, depth)}${addTabulation(depth)}- ${item.key}: ${renderValue(item.oldValue, depth)}`,
};

export const renderNested = (ast, depth = 1) => {
  const adjustedDepthForBrackets = depth - 0.5;
  const result = ast.reduce((acc, node) => {
    if (node.type === 'nested') {
      return `${acc}${addTabulation(depth)}  ${node.key}: ${renderNested(node.children, depth + 1)}`;
    }
    return `${acc}${addTabulation(depth)}${renderTypeDispatch[node.type](node, depth)}`;
  }, '{\n');
  return `${result}${addTabulation(adjustedDepthForBrackets)}}\n`;
};

export default renderNested;
