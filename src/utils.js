import path from 'path';
import fs from 'fs';

export const constructFilePath = (filepath) => {
  if (path.isAbsolute(filepath)) {
    return filepath;
  }
  return path.resolve(filepath);
};

export const getRawData = (filepath) => fs.readFileSync(filepath);
