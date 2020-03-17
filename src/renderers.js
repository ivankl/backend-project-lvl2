import { renderNested } from './formatters/nested/nestedRender';
import { renderPlain } from './formatters/plain/plainRender';
import renderJSON from './formatters/json/jsonRenderer';

const outputFormatDispatch = {
  nested: renderNested,
  plain: renderPlain,
  json: renderJSON,
};

export default (ast, format) => outputFormatDispatch[format](ast);
