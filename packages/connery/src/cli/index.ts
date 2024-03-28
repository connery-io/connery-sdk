#!/usr/bin/env node

import { Command } from 'commander';
import init from './init/index.js';
import addAction from './add-action/index.js';

const program = new Command();

// prettier-ignore
program.name('connery')
  .description('Connery CLI')
  .helpOption('-h, --help', 'Display help for command');

// prettier-ignore
const devCommand = new Command('dev')
  .description('Commands for plugin and action development')
  .helpOption('-h, --help', 'Display help for command');

// prettier-ignore
devCommand
  .command('init')
  .description('Initialize a new plugin repository and create all necessary files')
  .action(init)
  .helpOption('-h, --help', 'Display help for command');

// prettier-ignore
devCommand
  .command('add-action')
  .description('Add a new action to the plugin')
  .addHelpText('after', `\nThe plugin must be initialized before running this command.`)
  .action(addAction)
  .helpOption('-h, --help', 'Display help for command');

program.addCommand(devCommand);
program.parse();

export default program;
