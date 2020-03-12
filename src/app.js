import programm from 'commander';
import genDiff from '.';

const outputFormats = ['nested', 'plain'];

const formatValidation = (type) => {
  if (outputFormats.includes(type)) {
    return type;
  }
  console.log('invalid format, showing nested format by default');
  return 'nested';
};

export default () => {
  programm.version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<firstConfig> <secondConfig>')
    .option('-f, --format [type]', 'output format', formatValidation, 'nested')
    .action((config1, config2) => console.log(genDiff(config1, config2, programm.format)))
    .parse(process.argv);
};
