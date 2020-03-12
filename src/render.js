import { nestedRender } from './formatters/nested/nestedRender';
import { plainRender } from './formatters/plain/plainRender';

const outputFormatDispatch = {
  nested: (ast) => nestedRender(ast),
  plain: (ast) => plainRender(ast),
};

export const render = (ast, format) => outputFormatDispatch[format](ast);

export default render;
