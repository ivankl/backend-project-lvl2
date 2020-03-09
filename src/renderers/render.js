import valueRender from './valueRenderer';
import { addSpaces } from '../utils';

const typeDispatch = {
  unchanged: (item, depth) => `  ${item.key}: ${valueRender(item.value, depth)}\n`,
  removed: (item, depth) => `- ${item.key}: ${valueRender(item.value, depth)}\n`,
  added: (item, depth) => `+ ${item.key}: ${valueRender(item.value, depth)}\n`,
  modified: (item, depth) => `+ ${item.key}: ${valueRender(item.newValue, depth)}\n${addSpaces(depth)}- ${item.key}: ${valueRender(item.oldValue, depth)}\n`,
};

export const render = (ast, depth = 0) => {
  const result = ast.reduce((acc, item) => {
    if (item.type === 'children') {
      return `${acc}${addSpaces(depth)}${item.key}: ${render(item.value, depth + 2)}`;
    }
    return `${acc}${addSpaces(depth)}${typeDispatch[item.type](item, depth)}`;
  }, '{\n');
  return `${result}}\n`;
};

export default render;
