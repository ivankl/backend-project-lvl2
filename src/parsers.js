import yaml from 'js-yaml';
import ini from 'ini';

const dataFormatDispatch = {
  yml: yaml.safeLoad,
  json: JSON.parse,
  ini: ini.parse,
};

export default (rawData, format) => dataFormatDispatch[format](rawData);
