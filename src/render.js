import { renderNested } from './formatters/nested/nestedRender';
import { renderPlain } from './formatters/plain/plainRender';
import renderJSON from './formatters/json/jsonRenderer';

const outputFormatDispatch = {
  nested: (ast) => renderNested(ast),
  plain: (ast) => renderPlain(ast),
  json: (ast) => renderJSON(ast),
};

export default (ast, format) => outputFormatDispatch[format](ast);
