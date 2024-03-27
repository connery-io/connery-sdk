export default `# {{plugin.title}}

{{plugin.description}}

## Repository structure

| Path                            | Description                                                                                                                                 |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| [./src/index.ts](/src/index.ts) | The entry point for the plugin. It contains the plugin definition and references to all the actions.                                        |
| [./src/actions/](/src/actions/) | Contains all the actions this plugin defines. Every action is represented by a separate file with the action definition and implementation. |

## Connery

This repository is a plugin for [Connery](https://connery.io).

Connery is an open-source plugin ecosystem for AI and No-Code.

Learn more about Connery:

- [Documentation](https://docs.connery.io)
- [Source code](https://github.com/connery-io/connery)
- [How to start using this plugin with Connery?](https://docs.connery.io/docs/runner/quick-start/)

## Support

If you have any questions or need help with this plugin, please create an issue in this repository.
`;
