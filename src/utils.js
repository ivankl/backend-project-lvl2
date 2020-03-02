import path from 'path';

export const constructFilePath = (filepath) => {
  if (path.isAbsolute(filepath)) {
    return filepath;
  }
  return path.resolve(filepath);
};

export const getFileExtension = (filepath) => path.extname(filepath).slice(1);
