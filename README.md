# Connery - Plugin infrastructure for AI

[![Release](https://img.shields.io/github/v/release/connery-io/connery?color=74C649&label=Release)](https://github.com/connery-io/connery/releases)
[![License](https://img.shields.io/github/license/connery-io/connery?color=74C649&label=License)](https://github.com/connery-io/connery/blob/main/LICENSE)
[![Open in GitHub Codespaces](https://img.shields.io/badge/Open%20in%20GitHub%20Codespaces-black?logo=github)](https://github.com/codespaces/new/connery-io/connery?quickstart=1)
[![Open in Dev Containers](https://img.shields.io/badge/Open%20in%20Dev%20Container-blue?logo=visualstudiocode)](https://vscode.dev/redirect?url=vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=https://github.com/connery-io/connery)

## 🤔 What is this?

**With Connery, you can create plugins and use them across many platforms.
Connery will handle the rest: isolated runtime, authorization, secret management, access management,
audit logs, and other [vital features](#-features).**

Many AI platforms are gaining momentum on the market — for instance, OpenAI GPTs,
LangChain, AI-powered chatbots, agents and wearable devices.

To fully leverage the capabilities of these platforms, it's essential to connect them with the real world:
SaaS applications, APIs, databases, and so on.

While APIs provide a fundamental bridge for connectivity,
they alone aren't sufficient to connect the real world to the AI platforms.
The AI platforms require a new type of infrastructure capable of handling plugin-related challenges,
such as authorization, secret management, access management, and other vital features, ensuring robust security and control.

This is where Connery comes into play.

## ⚙️ How does it work?

<img alt="Connery diagram" src="./apps/docs/static/img/repo/connery-diagram1.png">

Connery consists of four main components that tightly work together:

**Action** - Think of an action as a basic task, something like a function with input and output parameters designed to do one specific thing.
For example, "Send email" is an action in the ["Gmail"](https://github.com/connery-io/gmail) _plugin_.

**Plugin** - This is a collection of related actions grouped together because they serve a similar purpose.
Each plugin is represented by a GitHub repository with TypeScript code of a specific structure.
Plugin must be installed on a _runner_ before its actions can be used.

**Runner** - This is the heart of Connery, an open-source application that knows how to handle plugins and run actions.
It's equipped with key features like authentication handling, security, and access management.
Each organization or individual configures their own isolated runner with a unique plugin set and configuration.
The runner provides a standardized API for every installed action that can be consumed by _clients_.

**Client** - A client is a specific application for each platform that uses the API provided by the runner.
It's like a translator that adapts the runner's capabilities to fit the platform's needs.
For example, an [OpenAI GPTs](https://docs.connery.io/docs/clients/native/openai/gpt) client allows you to run
Connery actions from OpenAI GPT, or a [Slack](https://docs.connery.io/docs/clients/native/slack) client
will enable you to run Connery actions directly from Slack.
Also, there are clients you can use to call actions from your own applications, such as [LangChain](https://docs.connery.io/docs/clients/native/langchain/tools) or [API](https://docs.connery.io/docs/clients/native/api) clients.

The combination of these components allows you to run actions from any platform supported by Connery. For example, you can run the same Connery action using OpenAI GPT, LangChain, Slack, and [other clients](https://docs.connery.io/docs/clients/native/).

## 💡 Use cases

- [Actions in GPTs](https://docs.connery.io/docs/use-cases/actions-in-gpts/)
- [Actions in AI agents and apps](https://docs.connery.io/docs/use-cases/actions-in-ai-agents-and-apps/)
- [Actions in AI wearables](https://docs.connery.io/docs/use-cases/actions-in-ai-wearables/)
- [Private AI-actions control center](https://docs.connery.io/docs/use-cases/private-ai-actions-control-center/)
- [Automations in Team Collaboration tools](https://docs.connery.io/docs/use-cases/automations-in-team-collaboration-tools/)
- [Custom actions in No-Code tools](https://docs.connery.io/docs/use-cases/custom-actions-in-no-code-tools/)
- [CI/CD automations](https://docs.connery.io/docs/use-cases/ci-cd-automations/)

## ✅ Example 1: Send email from a custom OpenAI GPT

<img alt="Scheduled scaling of Back End service on AWS Fargate from Slack using Connery" src="./apps/docs/static/img/repo/send-email-from-a-custom-gpt-using-connery-actions.gif">

Learn more: [Send email from a custom OpenAI GPT](https://docs.connery.io/docs/use-cases/actions-in-gpts/send-email-from-a-custom-openai-gpt).

## ✅ Example 2: Scale back-end service on AWS from Slack

<img alt="Scheduled scaling of Back End service on AWS Fargate from Slack using Connery" src="./apps/docs/static/img/repo/scheduled-scaling-of-back-end-service-on-aws-fargate-from-slack-using-connery.gif">

Learn more: [Scale back-end service on AWS from Slack](https://docs.connery.io/docs/use-cases/automations-in-team-collaboration-tools/scale-back-end-service-on-aws-from-slack).

## 🌟 Support us and stay up-to-date

Please **give the repository a star** to support the project and stay up-to-date with the latest news.

<img src="./apps/docs/static/img/repo/give-us-a-star.png" alt="Give the repository a star" width="300">

## ✨ Features

### For users and organizations

| Feature                  | Description                                                                                                                                             |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Auth                     | Authentication and authorization for users, clients, and plugins.                                                                                       |
| Connection Management    | Secure storage and management of connections to external services, such as databases, APIs, and SaaS applications.                                      |
| Configuration Management | Allows plugins configuration without changing the code.                                                                                                 |
| Secrets Management       | Secure storage and management of sensitive data, such as API keys, passwords, and tokens, and their injection into plugins and actions.                 |
| Access Management        | Flexible, role-based access controls allowing fine-tuned permissions for actions in organizations.                                                      |
| Human in the Loop        | Empower humans with the final say in executing actions by AI tools, ensuring full control over your operations.                                         |
| Audit Logs               | Detailed audit logs providing a comprehensive overview of all actions executed. See who did what and when.                                              |
| Multi-platform Plugins   | Compatibility with diverse platforms, ensuring smooth operations regardless of your tech stack.                                                         |
| Plugin Marketplace       | A rich ecosystem of open-source plugins based on GitHub infrastructure. Every plugin is a separate GitHub repository ready to be forked and customized. |
| Isolated Runtime         | Isolated runtime for each organization or individual, ensuring security and privacy.                                                                    |

### For app developers

| Feature                                | Description                                                                     |
| -------------------------------------- | ------------------------------------------------------------------------------- |
| Seamless integration into the app code |                                                                                 |
| Management UI for users                | (with the features above)                                                       |
| Monitoring                             | Monitor your plugins and actions to ensure smooth operations.                   |
| Analytics and Insights                 | Track and analyze your actions, plugins, and clients to gain valuable insights. |

### For plugin developers

| Feature                | Description                                                                                                                                                                                                                                                 |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Developer Experience   | Developers deserve to have the best experience when developing plugins. This includes documentation, tooling, and ecosystem like CLI and SDK, SDLC, community and support, and many other things that let developers focus on what matters most - building. |
| Plugin Authorization   | Plugin authorization with the third-party services.                                                                                                                                                                                                         |
| Plugin Configuration   |                                                                                                                                                                                                                                                             |
| Versioning             | Versioning of plugins and actions, ensuring smooth upgrades and rollbacks.                                                                                                                                                                                  |
| CRUD Actions           | Actions for creating, reading, updating, and deleting data in external services.                                                                                                                                                                            |
| Async Actions          | Actions that run asynchronously allow you to run long-running tasks or tasks that require human input.                                                                                                                                                      |
| Trigger Actions        | Actions that proactively trigger clients when something happens in the external service. For example, trigger an AI agent when a new email arrives.                                                                                                         |
| Multi-language Plugins | Support for plugins written in the most popular programming languages like TypeScript and Python.                                                                                                                                                           |

Please note that Connery is still in early beta, so not all features are available yet.
This list represents our vision for the future of Connery.
We're working hard to make it a reality.

The order of features does not represent the priority.

## 🌳 Ecosystem

We aim to build a community-driven ecosystem of open-source plugins and clients around Connery.
We believe that collective development accelerates innovation.

Our vision is to build a marketplace where you can find open-source plugins and clients for any use case.

Below are manually curated lists of plugins and clients available for Connery:

- [Native plugins](https://docs.connery.io/docs/plugins/native)
- [Community plugins](https://docs.connery.io/docs/plugins/community)
- [Native clients](https://docs.connery.io/docs/clients/native)
- [Community clients](https://docs.connery.io/docs/clients/community)

To add your plugin or client to the lists, see our [contributing guide](/CONTRIBUTING.md).

## 🚀 Quickstart

Check out the [Quickstart](https://docs.connery.io/docs/runner/quick-start/) guide to get started with Connery.

## 📖 Documentation

Check out the [Documentation](https://docs.connery.io) to learn more.

## 💬 Feedback & Support

Connery is still in early beta, so not everything will be perfect yet. Please let us know of any suggestions, ideas, or bugs you encounter, and we will use your feedback to improve our upcoming releases.

You can reach us via the following channels:

- [Discussions](https://github.com/connery-io/connery/discussions) - for feedback, questions, and discussions.
- [Issues](https://github.com/connery-io/connery/issues) - for bug reports and feature requests.
- [Twitter](https://twitter.com/connery_io) - for updates and announcements.

## 🗄️ Repository structure

This is a monorepo that contains the following components:

| Name   | Path                 | Description                                                                                                     |
| ------ | -------------------- | --------------------------------------------------------------------------------------------------------------- |
| Runner | `./apps/runner`      | The core of Connery that knows how to handle plugins, run actions, and provide a standardized API as an output. |
| Docs   | `./apps/docs`        | The [documentation](https://docs.connery.io/) website.                                                          |
| CLI    | `./packages/connery` | [`connery`](https://www.npmjs.com/package/connery) CLI package for plugin development.                          |
| SDK    | `./packages/sdk`     | [`@connery-io/sdk`](https://www.npmjs.com/package/@connery-io/sdk) SDK package for plugin development.          |
| Lib    | `./packages/lib`     | Shared library for the runner and the CLI.                                                                      |

## 👨‍💻 Contributing

We are extremely open to contributions, whether it be in the form of a new feature, improved infrastructure, or better documentation.

For detailed information on how to contribute, see our [contributing guide](/CONTRIBUTING.md).
