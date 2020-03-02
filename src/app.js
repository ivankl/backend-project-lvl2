import commander from 'commander';
import genDiff from '.';

export default () => {
  let config1Path;
  let config2Path;
  commander.version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<firstConfig> <secondConfig>')
    .action((config1, config2) => {
      config1Path = config1;
      config2Path = config2;
    })
    .option('-f, --format [type]', 'output format')
    .parse(process.argv);

  console.log(genDiff(config1Path, config2Path));
};
