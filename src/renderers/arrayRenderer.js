import _ from 'lodash';

const arrayToString = (array) => {
  console.log(array);
  const arrayElementsToString = array.reduce((acc, element) => {
    if (_.isArray(element)) {
      return arrayToString(element);
    }
    return `${acc}, ${element}`;
  }, '');
  const result = `[${arrayElementsToString.substr(1)}]`;
  return result;
};

export default arrayToString;
