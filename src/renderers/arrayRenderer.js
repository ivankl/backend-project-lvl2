import _ from 'lodash';

const arrayToString = (array) => {
  const arrayElementsToString = array.reduce((acc, element) => {
    if (_.isArray(element)) {
      return `${acc}, ${arrayToString(element)}`;
    }
    return `${acc}, ${element}`;
  }, '');
  const result = `[${arrayElementsToString.substr(1)}]`;
  return result;
};

export default arrayToString;
