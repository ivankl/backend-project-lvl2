import _ from 'lodash';

const addTabulation = (depth) => {
  const tabulationStep = 2;
  return ' '.repeat(depth * tabulationStep);
};


const сonvertObjectToString = (object, depth) => {
  const keys = Object.keys(object);
  const eachValueToString = keys.map((key) => {
    if (_.isObject(object[key]) && !_.isArray(object[key])) {
      return `${addTabulation(depth + 2)}${key}: ${сonvertObjectToString(object[key], depth + 2)}`;
    }
    return `${addTabulation(depth + 2)}${key}: ${object[key]}`;
  });
  const convertedToString = eachValueToString.join('\n');
  return `{\n${convertedToString}\n${addTabulation(depth)}}`;
};

const convertArrayToString = (array) => {
  const eachElementAsString = array.map((element) => {
    if (_.isArray(element)) {
      return convertArrayToString(element);
    }
    return element;
  });
  const convertedToString = eachElementAsString.join(', ');
  return `[${convertedToString}]`;
};

const renderValue = (value, depth) => {
  if (_.isArray(value)) {
    return convertArrayToString(value);
  }
  if (!(_.isArray(value)) && _.isObject(value)) {
    return сonvertObjectToString(value, depth);
  }
  return value;
};


export const renderNested = (ast, tabulation = 0) => {
  const renderTypeDispatch = {
    nested: (item, depth) => `${addTabulation(depth + 2)}${item.key}: ${renderNested(item.children, depth + 2)}`,
    unchanged: (item, depth) => `${addTabulation(depth + 2)}${item.key}: ${renderValue(item.value, depth + 2)}`,
    removed: (item, depth) => `${addTabulation(depth + 1)}- ${item.key}: ${renderValue(item.value, depth + 2)}`,
    added: (item, depth) => `${addTabulation(depth + 1)}+ ${item.key}: ${renderValue(item.value, depth + 2)}`,
    modified: (item, depth) => `${addTabulation(depth + 1)}+ ${item.key}: ${renderValue(item.newValue, depth + 2)}\n${addTabulation(depth + 1)}- ${item.key}: ${renderValue(item.oldValue, depth + 2)}`,
  };
  const eachNodeAsString = ast.map((node) => renderTypeDispatch[node.type](node, tabulation));
  const result = eachNodeAsString.join('\n');
  return `{\n${result}\n${addTabulation(tabulation)}}`;
};

export default renderNested;
