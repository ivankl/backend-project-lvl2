import yaml from 'js-yaml';

export default (rawData) => yaml.safeLoad(rawData);
