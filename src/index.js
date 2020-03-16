import getParsedData from './parsers';
import { readFile, getFileExtension } from './utils';
import { buildAST } from './buildAST';
import render from './render';

export default (path1, path2, format) => {
  const rawDataFromFile1 = readFile(path1, 'utf-8');
  const rawDataFromFile2 = readFile(path2, 'utf-8');

  const parsedFromFile1 = getParsedData(rawDataFromFile1, getFileExtension(path1));
  const parsedFromFile2 = getParsedData(rawDataFromFile2, getFileExtension(path2));

  const ast = buildAST(parsedFromFile1, parsedFromFile2);
  return render(ast, format);
};
