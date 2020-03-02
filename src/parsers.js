import yaml from 'js-yaml';

const mapping = {
  yaml: (rawData) => yaml.safeLoad(rawData),
  yml: (rawData) => yaml.safeLoad(rawData),
  json: (rawData) => JSON.parse(rawData),
};

export default (rawData, format) => mapping[format](rawData);
