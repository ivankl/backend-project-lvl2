import valueRender from './valueRenderer';

const renderTypeDispatch = {
  unchanged: () => '',
  removed: (item, fullPath) => `Property '${fullPath}' was deleted\n`,
  added: (item, fullPath) => `Property '${fullPath}' was added with value: ${valueRender(item.value)}\n`,
  modified: (item, fullPath) => `Property '${fullPath}' was changed from ${valueRender(item.oldValue)} to ${valueRender(item.newValue)}\n`,
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
      return `${acc}${renderPlain(item.children, `${generateFullPathToProperty(parent, item.key)}`)}`;
    }
    return `${acc}${renderTypeDispatch[item.type](item, `${generateFullPathToProperty(parent, item.key)}`)}`;
  }, '');
  return `${result}`;
};

export default renderPlain;
