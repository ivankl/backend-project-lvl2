import renderValue from './valueRenderer';
import { addSpaces } from '../../utils';

const renderTypeDispatch = {
  unchanged: (item, depth) => `  ${item.key}: ${renderValue(item.value, depth)}`,
  removed: (item, depth) => `- ${item.key}: ${renderValue(item.value, depth)}`,
  added: (item, depth) => `+ ${item.key}: ${renderValue(item.value, depth)}`,
  modified: (item, depth) => `+ ${item.key}: ${renderValue(item.newValue, depth)}${addSpaces(depth)}- ${item.key}: ${renderValue(item.oldValue, depth)}`,
};

export const renderNested = (ast, depth = 1) => {
  const adjustedDepthForBrackets = depth - 0.5;
  const result = ast.reduce((acc, item) => {
    if (item.type === 'nested') {
      return `${acc}${addSpaces(depth)}  ${item.key}: ${renderNested(item.children, depth + 1)}`;
    }
    return `${acc}${addSpaces(depth)}${renderTypeDispatch[item.type](item, depth)}`;
  }, '{\n');
  return `${result}${addSpaces(adjustedDepthForBrackets)}}\n`;
};

export default renderNested;
