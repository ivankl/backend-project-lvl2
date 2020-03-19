import fs from 'fs';
import path from 'path';
import getParsedData from './parsers';
import { buildAST } from './buildAST';
import render from './formatters';

const readFile = (filepath) => {
  const pathToFile = path.resolve(filepath);
  return fs.readFileSync(pathToFile, 'utf-8');
};

export const getFileExtension = (filepath) => path.extname(filepath).slice(1);

export default (path1, path2, format) => {
  const rawDataFromFile1 = readFile(path1);
  const rawDataFromFile2 = readFile(path2);

  const parsedFromFile1 = getParsedData(rawDataFromFile1, getFileExtension(path1));
  const parsedFromFile2 = getParsedData(rawDataFromFile2, getFileExtension(path2));

  const ast = buildAST(parsedFromFile1, parsedFromFile2);
  return render(ast, format);
};
