import valueRender from './valueRenderer';
import { addSpaces } from '../utils';

const renderTypeDispatch = {
  unchanged: (item, depth) => `  ${item.key}: ${valueRender(item.value, depth)}`,
  removed: (item, depth) => `- ${item.key}: ${valueRender(item.value, depth)}`,
  added: (item, depth) => `+ ${item.key}: ${valueRender(item.value, depth)}`,
  modified: (item, depth) => `+ ${item.key}: ${valueRender(item.newValue, depth)}${addSpaces(depth)}- ${item.key}: ${valueRender(item.oldValue, depth)}`,
};

export const render = (ast, depth = 1) => {
  const adjustDepthForBrackets = depth - 0.5;
  const result = ast.reduce((acc, item) => {
    if (item.type === 'nested') {
      return `${acc}${addSpaces(depth)}  ${item.key}: ${render(item.value, depth + 1)}`;
    }
    return `${acc}${addSpaces(depth)}${renderTypeDispatch[item.type](item, depth)}`;
  }, '{\n');
  return `${result}${addSpaces(adjustDepthForBrackets)}}\n`;
};

export default render;
