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

const getFullPropertyPath = (parentPath, newElement) => {
  if (parentPath !== '') {
    return `${parentPath}.${newElement}`;
  }
  return `${parentPath}${newElement}`;
};

const renderPlain = (ast, parent = '') => {
  const nodeDispatch = {
    nested: (item, fullPath) => renderPlain(item.children, fullPath),
    unchanged: () => null,
    removed: (item, fullPath) => `Property '${fullPath}' was deleted`,
    added: (item, fullPath) => `Property '${fullPath}' was added with value: ${renderValue(item.value)}`,
    modified: (item, fullPath) => `Property '${fullPath}' was changed from ${renderValue(item.oldValue)} to ${renderValue(item.newValue)}`,
  };
  const result = ast
    .map((node) => nodeDispatch[node.type](node, getFullPropertyPath(parent, node.key)))
    .filter((value) => value !== null);
  return result.join('\n');
};

export default renderPlain;
