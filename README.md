# Open-source connector ecosystem for AI and No-code

[![Release](https://img.shields.io/github/v/release/connery-io/connery?color=74C649&label=Release)](https://github.com/connery-io/connery/releases)
[![License](https://img.shields.io/github/license/connery-io/connery?color=74C649&label=License)](https://github.com/connery-io/connery/blob/main/LICENSE)
[![Open in GitHub Codespaces](https://img.shields.io/badge/Open%20in%20GitHub%20Codespaces-black?logo=github)](https://github.com/codespaces/new/connery-io/connery?quickstart=1)
[![Open in Dev Containers](https://img.shields.io/badge/Open%20in%20Dev%20Container-blue?logo=visualstudiocode)](https://vscode.dev/redirect?url=vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=https://github.com/connery-io/connery)

<br/>
<img alt="Connery overview diagram" src="https://raw.githubusercontent.com/connery-io/connery/main/apps/docs/static/img/repo/connery-overview-diagram.svg">

## 🤔 What is this?

**Connery is a middleware between APIs and platforms.
It lets you take any API and turn it into a standardized connector with built-in security and access controls. Once that's done, you can use this connector across different platforms.**

There are many platforms around that allow you to connect different services together and build automation workflows.
For example, No-code platforms like Zapier and Make.
Also, many AI-powered platforms are gaining momentum on the market — for instance, ChatGPT with its plugins,
AI-powered chatbots, and agents.

All of them must be connected to third-party services to provide integration and automation capabilities to the end users.
API is not enough for that nowadays, as it should always be wrapped into the native app following
the requirements of each platform. This also brings many new challenges around security, access management, and more.

This is where Connery comes into play using three concepts:

**1. Connectors**

The connector is a piece of configuration and JavaScript code that wraps any API
and helps standardize it for any platform.

You might already be familiar with the concept of a connector.
This idea has different names across various platforms:

- **App** in Make, Zapier, and Slack;
- **Plugin** in ChatGPT;
- **Tool** in LangChain.

**2. Runner**

The runner is an open-source application that knows how to run connectors and provide a standardized API as an output.
Also, it offers many important features to ensure the security of your connectors,
like Authentication and Authorization, Access Management, Secret Management, Audit Logs,
but also the features that make your connectors more powerful, like Natural Language Actions with LLM support, Manual Approval, and many more.

**3. Clients**

The client is a native application on every platform that consumes the API provided
by the runner and lets the end users use connectors without technical knowledge.

## ✅ Example

Let's consider a real example from one of our customers.

**Problem**

The customer aimed to scale their application on AWS in response to various business conditions and events.
Additionally, they wanted the flexibility to manually scale the application as needed.
Importantly, the scaling process should be user-friendly enough for team members who are experts
in the business domain but not familiar with AWS or the technical aspects managed by the engineering team.

**Solution**

The customer created a connector with two actions that allow to scale up and down the compute resources of the app in AWS.
The connector uses AWS SDK for JavaScript to communicate with AWS.
After creating the connector, the customer configured a runner and installed the connector onto it.
This setup enabled the customer to use the connector from multiple platforms using clients and supporting a range of use cases:

| Client                                                         | Use case                                                                                                                                                                |
| -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Make App](https://docs.connery.io/docs/native-clients/make)   | Automation scenario for smart scaling based on the input from other services connected to Make — for example, Google Sheets with the related data.                      |
| [Make App](https://docs.connery.io/docs/native-clients/make)   | Automation scenario for scheduled scaling based on the time of the day and day of the week.                                                                             |
| [Slack App](https://docs.connery.io/docs/native-clients/slack) | Manual scaling directly from Slack channel using natural language.                                                                                                      |
| Apple Shortcut                                                 | There was even the case when the customer scaled the app on the go from their Apple Watch with Siri using preconfigured Apple Shortcuts connected by API to the runner. |

The most beautiful thing is that once the connector is implemented by the developer and hosted on the runner,
non-technical people can easily use it from any platform that covers their needs.

For many cases, you don't even need developers, as Connery brings many community-driven connectors and clients -
check the Ecosystem section below to learn more.

## 🌟 Support us and stay up-to-date

Please **give the repository a star** to support the project and stay up-to-date with the latest news.

<a href="https://github.com/connery-io/connery">
   <img src="https://raw.githubusercontent.com/connery-io/connery/main/apps/docs/static/img/repo/give-us-a-star.png" alt="Give the repository a star" width="300">
</a>

## 🚀 Quickstart

Check out the [Quickstart](https://docs.connery.io/docs/quick-start/) guide to get started with Connery.

## 🌳 Ecosystem

We aim to build a community-driven ecosystem of open-source connectors and clients around Connery.
So everyone can contribute to the shared marketplace and benefit from it.

Our vision is to build a marketplace where you can find open-source connectors and clients for any use case.

Below are manually curated lists of connectors and clients available for Connery.

- [Connectors](https://docs.connery.io/docs/connectors)
- [Native Clients](https://docs.connery.io/docs/native-clients/)
- [Community Clients](https://docs.connery.io/docs/community-clients)

To add your connector or client to the lists, see our [contributing guide](/CONTRIBUTING.md).

## Features

| Feature                           | Description                                                                                                                                                    |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Security                          |                                                                                                                                                                |
| Access Management                 |                                                                                                                                                                |
| Secret Management                 |                                                                                                                                                                |
| Natural Language Actions          | Runner uses LLMs to understand natural language requests from users, classify the intent, identify action and the input parameters and finally run the action. |
| AI Readiness                      | Ready for AI Agents and Chatbots                                                                                                                               |
| Action Manual Approval            | To let the human make the final decision on the action execution. It is especially helpful if AI Agents or Chatbots run the actions.                           |
| Open-source Connector Marketplace |                                                                                                                                                                |
| Multi Platform Connectors         |                                                                                                                                                                |

Find more information about features in the [Features and roadmap](https://docs.connery.io/docs/introduction/features) page in the documentation.

## 📖 Documentation

Check out the [Connery Documentation](https://docs.connery.io) to learn more.

## 💬 Feedback & Support

Connery is still in beta, so not everything will be perfect yet. Please let us know of any suggestions, ideas, or bugs you encounter, and we will use your feedback to improve our upcoming releases.

You can reach us via the following channels:

- [Discussions](https://github.com/connery-io/connery/discussions) - for feedback, questions, and discussions.
- [Issues](https://github.com/connery-io/connery/issues) - for bug reports and feature requests.
- [Twitter](https://twitter.com/connery_io) - for updates and announcements.

## 👨‍💻 Contributing

We are extremely open to contributions, whether it be in the form of a new feature, improved infrastructure, or better documentation.

For detailed information on how to contribute, see our [contributing guide](/CONTRIBUTING.md).
