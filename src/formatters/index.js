import { renderNested } from './nestedRender';
import { renderPlain } from './plainRender';

const outputFormatDispatch = {
  nested: renderNested,
  plain: renderPlain,
  json: JSON.stringify,
};

export default (ast, format) => outputFormatDispatch[format](ast);
