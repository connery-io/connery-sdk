#!/usr/bin/env node

import { Command } from "commander";
import build from "./build";

const program = new Command();

program
  .name("connery")
  .description("CLI tool for connector development");
program.command("build").description("build connector").action(build);
program.parse();
