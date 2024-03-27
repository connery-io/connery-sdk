export default `# {{plugin.title}}

{{plugin.description}}

## Repository structure

This repository contains the plugin's source code.

| Path                            | Description                                                                                                                                          |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| [./src/index.ts](/src/index.ts) | **The entry point for the plugin.** It contains the plugin definition and references to all the actions.                                             |
| [./src/actions/](/src/actions/) | **This folder contains all the actions of the plugin.** Each action is represented by a separate file with the action definition and implementation. |

## Built using Connery SDK

This plugin is built using [Connery SDK](https://github.com/connery-io/connery), an open-source project for plugin development.

[Learn how to use the plugin and its actions.](https://docs.connery.io/docs/runner/quick-start/)

## Support

If you have any questions or need help with this plugin, please create an issue in this repository.
`;
