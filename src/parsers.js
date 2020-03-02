import yaml from 'js-yaml';
import ini from 'ini';

const mapping = {
  yaml: (rawData) => yaml.safeLoad(rawData),
  yml: (rawData) => yaml.safeLoad(rawData),
  json: (rawData) => JSON.parse(rawData),
  ini: (rawData) => ini.parse(rawData),
};

export default (rawData, format) => mapping[format](rawData);
