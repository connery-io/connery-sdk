#!/usr/bin/env node

import { Command } from "commander";
import build from "./build";
import init from "./init";
import addAction from "./add-action";

const program = new Command();

program.name("connery").description("CLI tool for connector development");
program.command("build").description("build connector").action(build);
program
  .command("init")
  .description("initialize connector repository")
  .action(init);
program
  .command("add-action")
  .description("add new action to the connector")
  .action(addAction);
program.parse();
