#!/usr/bin/env node

import { Command } from 'commander';
import build from './build';
import init from './init';
import addAction from './add-action';
import validate from './validate';
import runAction from './run-action';

const program = new Command();

program.name('connery').description('CLI tool for Connery connector development');
program.command('init').description('initialize a new Connery connector').action(init);
program.command('add-action').description('add a new action into the connector').action(addAction);
program
  .command('run-action [actionKey]')
  .option(
    '--configuration-parameters <configurationParameters>',
    'configuration parameters in stringified JSON format',
    '{}',
  )
  .option('--input-parameters <inputParameters>', 'input parameters in stringified JSON format', '{}')
  .description('run an action from the connector')
  .action(runAction);
program
  .command('validate')
  .description('validate connector definition in ./index.js and linked files')
  .action(validate);
program.command('build').description('build connector and its dependencies').action(build);
program.parse();
