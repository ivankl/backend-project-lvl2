import _ from 'lodash';

const addTabulation = (depth) => {
  const tabulation = 4;
  const adjustmentForChangedItems = 2;
  return ' '.repeat(depth * tabulation - adjustmentForChangedItems);
};


const сonvertObjectToString = (object, depth) => {
  const keys = Object.keys(object);
  const eachValueToString = keys.map((key) => {
    if (_.isObject(object[key]) && !_.isArray(object[key])) {
      return `${addTabulation(depth + 1)}  ${key}: ${сonvertObjectToString(object[key], depth + 1)}`;
    }
    return `${addTabulation(depth + 1)}  ${key}: ${object[key]}`;
  });
  const convertedToString = eachValueToString.join('\n');
  return `{\n${convertedToString}\n${addTabulation(depth)}  }`;
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


export const renderNested = (ast, tabulation = 1) => {
  const renderTypeDispatch = {
    nested: (item, depth) => `${addTabulation(depth)}  ${item.key}: ${renderNested(item.children, depth + 1)}`,
    unchanged: (item, depth) => `${addTabulation(depth)}  ${item.key}: ${renderValue(item.value, depth)}`,
    removed: (item, depth) => `${addTabulation(depth)}- ${item.key}: ${renderValue(item.value, depth)}`,
    added: (item, depth) => `${addTabulation(depth)}+ ${item.key}: ${renderValue(item.value, depth)}`,
    modified: (item, depth) => `${addTabulation(depth)}+ ${item.key}: ${renderValue(item.newValue, depth)}\n${addTabulation(depth)}- ${item.key}: ${renderValue(item.oldValue, depth)}`,
  };
  const eachNodeAsString = ast.map((node) => renderTypeDispatch[node.type](node, tabulation));
  const adjustedTabulationForBrackets = tabulation - 0.5;
  const result = eachNodeAsString.join('\n');
  return `{\n${result}\n${addTabulation(adjustedTabulationForBrackets)}}`;
};

export default renderNested;
