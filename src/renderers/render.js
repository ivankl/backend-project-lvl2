import valueRender from './valueRenderer';
import { addSpaces } from '../utils';

const renderTypeDispatch = {
  unchanged: (item) => `  ${item.key}: ${valueRender(item.value, item.depth)}`,
  removed: (item) => `- ${item.key}: ${valueRender(item.value, item.depth)}`,
  added: (item) => `+ ${item.key}: ${valueRender(item.value, item.depth)}`,
  modified: (item) => `+ ${item.key}: ${valueRender(item.newValue, item.depth)}${addSpaces(item.depth)}- ${item.key}: ${valueRender(item.oldValue, item.depth)}`,
};

export const render = (ast) => {
  const adjustDepthForBrackets = ast[0].depth - 0.5;
  const result = ast.reduce((acc, item) => {
    if (item.type === 'nested') {
      return `${acc}${addSpaces(item.depth)}  ${item.key}: ${render(item.value)}`;
    }
    return `${acc}${addSpaces(item.depth)}${renderTypeDispatch[item.type](item)}`;
  }, '{\n');
  return `${result}${addSpaces(adjustDepthForBrackets)}}\n`;
};

export default render;
