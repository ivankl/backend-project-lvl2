import _ from 'lodash';

const renderValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const renderTypeDispatch = {
  unchanged: () => '',
  removed: (item, fullPath) => `Property '${fullPath}' was deleted\n`,
  added: (item, fullPath) => `Property '${fullPath}' was added with value: ${renderValue(item.value)}\n`,
  modified: (item, fullPath) => `Property '${fullPath}' was changed from ${renderValue(item.oldValue)} to ${renderValue(item.newValue)}\n`,
};

const generateFullPathToProperty = (parentPath, newElement) => {
  if (parentPath !== '') {
    return `${parentPath}.${newElement}`;
  }
  return `${parentPath}${newElement}`;
};

export const renderPlain = (ast, parent = '') => {
  const result = ast.reduce((acc, item) => {
    if (item.type === 'nested') {
      return `${acc}${renderPlain(item.children, generateFullPathToProperty(parent, item.key))}`;
    }
    return `${acc}${renderTypeDispatch[item.type](item, generateFullPathToProperty(parent, item.key))}`;
  }, '');
  return `${result}`;
};

export default renderPlain;
