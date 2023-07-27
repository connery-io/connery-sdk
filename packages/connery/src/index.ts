#!/usr/bin/env node

import { Command } from 'commander';
import build from './build';
import init from './init';
import addAction from './add-action';
import validate from './validate';

const program = new Command();

program.name('connery').description('CLI tool for Connery connector development');
program.command('init').description('initialize a new Connery connector').action(init);
program.command('add-action').description('add a new action into the connector').action(addAction);
program
  .command('validate')
  .description('validate connector definition in ./index.js and linked files')
  .action(validate);
program.command('build').description('build connector and its dependencies').action(build);
program.parse();
