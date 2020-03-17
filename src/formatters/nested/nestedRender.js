import renderValue from './valueRenderer';
import { addTabulation } from '../../utils';

const renderTypeDispatch = {
  unchanged: (item, depth) => `  ${item.key}: ${renderValue(item.value, depth)}`,
  removed: (item, depth) => `- ${item.key}: ${renderValue(item.value, depth)}`,
  added: (item, depth) => `+ ${item.key}: ${renderValue(item.value, depth)}`,
  modified: (item, depth) => `+ ${item.key}: ${renderValue(item.newValue, depth)}${addTabulation(depth)}- ${item.key}: ${renderValue(item.oldValue, depth)}`,
};

export const renderNested = (ast, depth = 1) => {
  const adjustedDepthForBrackets = depth - 0.5;
  const result = ast.reduce((acc, node) => {
    if (node.type === 'nested') {
      return `${acc}${addTabulation(depth)}  ${node.key}: ${renderNested(node.children, depth + 1)}`;
    }
    return `${acc}${addTabulation(depth)}${renderTypeDispatch[node.type](node, depth)}`;
  }, '{\n');
  return `${result}${addTabulation(adjustedDepthForBrackets)}}\n`;
};

export default renderNested;
