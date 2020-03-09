import commander from 'commander';
import genDiff from '.';

export default () => {
  commander.version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<firstConfig> <secondConfig>')
    .action((config1, config2) => console.log(genDiff(config1, config2)))
    .option('-f, --format [type]', 'output format')
    .parse(process.argv);
};
