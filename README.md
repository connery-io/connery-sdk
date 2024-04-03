<div align="center">

# The open-source SDK for<br>AI plugins and actions development

[![Release](https://img.shields.io/github/v/release/connery-io/connery?color=74C649&label=Release)](https://github.com/connery-io/connery/releases)
[![License](https://img.shields.io/github/license/connery-io/connery?color=74C649&label=License)](https://github.com/connery-io/connery/blob/main/LICENSE)

</div>

## 🤔 What is Connery SDK?

Connery SDK is an NPM package that includes both an SDK and a CLI, designed for the development
of [plugins](https://sdk.connery.io/docs/introduction/core-concepts#plugin)
and [actions](https://sdk.connery.io/docs/introduction/core-concepts#action).

The CLI automates many things in the development process.
Meanwhile, the SDK offers a JavaScript API for defining plugins and actions and packaging them
into a [plugin server](https://sdk.connery.io/docs/introduction/core-concepts#plugin-server) with a standardized REST API generated from the metadata.
The plugin server handles authorization, input validation, and logging.
So you can focus on the logic of your actions.

The standardized API enables various [clients](https://sdk.connery.io/docs/introduction/core-concepts#client) to interact
with actions in a unified way, regardless of the underlying implementation.

An action consists of JavaSctipt code that defines its logic and metadata that describes its input and output.
The action can communicate with external APIs, databases, or other services.

👉 _Example: [Send email](https://github.com/connery-io/gmail/blob/main/src/actions/sendEmail.ts)
is an action in the [connery-io/gmail](https://github.com/connery-io/gmail) plugin._

<div align="center">
  <img width="550px" alt="Connery diagram" src="./apps/docs/static/img/repo/connery-sdk2.png">
</div>

## 🚀 Quickstart

Initialize a new plugin with a sample action:

```bash
npx connery@latest dev init
```

Install the dependencies:

```bash
npm install
```

Run the plugin server:

```bash
npm start
```

Open the plugin in the browser: [localhost:4201](http://localhost:4201).

👉 _Check out the [full quickstart guide](https://sdk.connery.io/docs/quickstart/) to learn more._

## ✅ Example 1: Send email from an OpenAI GPT

<img alt="Send email from an OpenAI GPT" src="./apps/docs/static/img/repo/send-email-from-a-custom-gpt-using-connery-actions.gif">

👉 _Learn more: [OpenAI GPT client](https://sdk.connery.io/docs/clients/openai/gpt)._

## ✅ Example 2: Summarize a webpage and send it by email from OpenGPTs

<img alt="Summarize a webpage and send it by email from OpenGPTs" src="./apps/docs/static/img/repo/summarize-a-webpage-and-send-it-by-email-from-opengpts.gif">

👉 _Learn more: [LangChain OpenGPTs client](https://sdk.connery.io/docs/clients/langchain/opengpts)._

## ✅ Example 3: Scale back-end service on AWS from Slack

<img alt="Scheduled scaling of Back End service on AWS Fargate from Slack using Connery" src="./apps/docs/static/img/repo/scheduled-scaling-of-back-end-service-on-aws-fargate-from-slack-using-connery.gif">

👉 _Learn more: [Slack client](https://sdk.connery.io/docs/clients/slack)._

## 🌟 Support us and stay up-to-date

Please **give the repository a star** to support the project and stay up-to-date with the latest news.

<img src="./apps/docs/static/img/repo/give-us-a-star.png" alt="Give the repository a star" width="300">

## 💡 Use cases

- [Actions in GPTs](https://sdk.connery.io/docs/use-cases/actions-in-gpts/)
- [Actions in AI agents and apps](https://sdk.connery.io/docs/use-cases/actions-in-ai-agents-and-apps/)
- [Actions in AI wearables](https://sdk.connery.io/docs/use-cases/actions-in-ai-wearables/)
- [Actions in team collaboration tools](https://sdk.connery.io/docs/use-cases/actions-in-team-collaboration-tools/)
- [Custom actions in No-Code tools](https://sdk.connery.io/docs/use-cases/custom-actions-in-no-code-tools/)
- [Actions in CI/CD pipelines](https://sdk.connery.io/docs/use-cases/actions-in-ci-cd-pipelines)

## 🌳 Ecosystem

We aim to build a community-driven ecosystem of open-source plugins and clients.
So, anyone can benefit from the shared knowledge and resources to accelerate innovation.

Below are manually curated lists of open-source plugins built with Connery SDK and clients for interacting with them:

- [Plugins](https://sdk.connery.io/docs/plugins/)
- [Clients](https://sdk.connery.io/docs/clients/)

## 📖 Documentation

Check out the [documentation](https://sdk.connery.io) to learn more.

## 💬 Feedback & Support

Connery is still in early beta, so not everything is perfect yet. Please let us know of any suggestions, ideas, or bugs you encounter, and we will use your feedback to improve our upcoming releases.

You can reach us via the following channels:

- [Discussions](https://github.com/connery-io/connery/discussions) - for feedback, questions, and discussions.
- [Issues](https://github.com/connery-io/connery/issues) - for bug reports and feature requests.
- [Twitter](https://twitter.com/connery_io) - for updates and announcements.

## 🗄️ Repository structure

This is a monorepo that contains the following components:

| Name                | Path                 | Description                                                                                                                            |
| ------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| SDK&nbsp;&&nbsp;CLI | `./packages/connery` | The [`connery`](https://www.npmjs.com/package/connery) package that contains both the SDK and CLI for plugins and actions development. |
| Docs                | `./apps/docs`        | The [documentation](https://sdk.connery.io/) website.                                                                                  |

## 👨‍💻 Contributing

We are open to contributions, whether it be in the form of a new feature, improved infrastructure, or better documentation.

For detailed information on how to contribute, see our [contributing guide](/CONTRIBUTING.md).
