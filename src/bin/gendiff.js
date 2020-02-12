#!/usr/bin/env node
import commander from 'commander';

commander.version('0.0.1');
commander.description('Compares two configuration files and shows a difference.');
commander.parse(process.argv);
