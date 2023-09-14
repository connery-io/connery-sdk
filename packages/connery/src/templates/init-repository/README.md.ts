const content = `# {{connector.title}}

{{connector.description}}

## Available actions

| Action | Description |
| ------ | ----------- |
|        |             |

## Repository structure

The entry point for this connector is the \`./index.js\` file.
It contains the connector definition and references to all the actions.

The \`./actions/\` folder contains all the actions this connector defines.
Every action is represented by a separate file with the action definition and implementation.

The \`./dist/connector.js\` file is the compiled version of the connector with all the dependencies.
Connery Runner uses this file to run the connector.

## Connery

This repository is a [Connery](https://connery.io) connector.

Connery is an open-source connector ecosystem for AI and No-Code.

Learn more about Connery:

- [Documentation](https://docs.connery.io)
- [Source code](https://github.com/connery-io/connery)
- [A quick guide on how to start using this connector with Connery](https://docs.connery.io/docs/quick-start)

## Support

If you have any questions or need help with this connector, please create an issue in this repository.
`;

export default content;
