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

const generateFullPathToProperty = (parentPath, newElement) => {
  if (parentPath !== '') {
    return `${parentPath}.${newElement}`;
  }
  return `${parentPath}${newElement}`;
};

export const renderPlain = (ast, parent = '') => {
  const renderTypeDispatch = {
    nested: (item, fullPath) => renderPlain(item.children, fullPath),
    unchanged: () => null,
    removed: (item, fullPath) => `Property '${fullPath}' was deleted`,
    added: (item, fullPath) => `Property '${fullPath}' was added with value: ${renderValue(item.value)}`,
    modified: (item, fullPath) => `Property '${fullPath}' was changed from ${renderValue(item.oldValue)} to ${renderValue(item.newValue)}`,
  };
  const result = ast.reduce((acc, item) => {
    const value = renderTypeDispatch[item.type](item, generateFullPathToProperty(parent, item.key));
    if (value !== null) {
      acc.push(value);
    }
    return acc;
  }, []);
  return result.join('\n');
};

export default renderPlain;
