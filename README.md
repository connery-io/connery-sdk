# Open-source connector ecosystem for AI and No-Code

[![Open in GitHub Codespaces](https://img.shields.io/badge/Open%20in%20GitHub%20Codespaces-black?logo=github)](https://github.com/codespaces/new/connery-io/connery?quickstart=1)
[![Open in Dev Containers](https://img.shields.io/badge/Open%20in%20Dev%20Container-blue?logo=visualstudiocode)](https://vscode.dev/redirect?url=vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=https://github.com/connery-io/connery)

## 🤔 What is this?

**Connery is a middle layer between APIs and platforms.
It allows wrapping any API into a connector written in JavaScript, standardizing it,
and then using the connector from any platform.**

There are many platforms around that allow you to connect different services together and build automation workflows.
For example, no-code platforms like Zapier and Make.
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

- App in Make, Zapier, and Slack;
- Plugin in ChatGPT;
- Tool in LangChain.

**2. Runner**

The runner is an open-source application that knows how to run connectors and provide a standardized API as an output.
Also, it offers many important features to ensure the security of your connectors,
like Authentication and Authorization, Access Management, Secret Management, Audit Logs,
but also the features that make your connectors more powerful, like Natural Language Actions with LLM support, Manual Approval, and many more.

**3. Clients**

The client is a native application on every platform that consumes the API provided
by the runner and lets the end users use connectors without technical knowledge.

## ✅ Real example

Let's consider a real example from our customer.

**Problem**

One of our customers needed to scale their application on AWS based on several
business factors and events and be able to scale it manually when required.
The scaling must be managed by non-technical people who know a business domain
but don't know anything about AWS and the application infrastructure governed by the engineering team.

**Solution**

The customer created a connector with two actions that allow to scale up and down the compute resources of the app in AWS.
The connector uses AWS SDK for JavaScript to communicate with AWS.
Then, the customer set up the runner and installed the connector on it.
It enabled the customer to use the connector from Make scenarios and Slack chatbot, implementing the following use cases:

1. Make scenario for smart scaling based on the input from other services connected to Make.
2. Make scenario for scheduled scaling based on the time of the day and day of the week.
3. Manual scaling directly from Slack channel using natural language.
4. There was even the case when the customer scaled the app on the go from their Apple Watch
   with Siri using preconfigured Apple Shortcuts connected by API to the runner.

The most beautiful thing is that once the connector is implemented by the developer and hosted on the runner,
non-technical people can easily use it from any platform that covers their needs.

And for many things, you don't even need developers, as many connectors are already available - check the [Ecosystem](#-ecosystem) section below.

## ⭐ Support us and stay up-to-date

Please give the repository a star to support the project and stay up-to-date with the latest news.

<a href="https://github.com/connery-io/connery">
   <img src="/apps/docs/static/img/repo/give-us-a-star.png" alt="Give the repository a star" width="300">
</a>

## 🚀 Quickstart

Check out the [Quickstart](https://docs.connery.io/docs/quick-start/) guide to get started with Connery.

## 🌳 Ecosystem

TODO

Below are manually curated lists of connectors and clients available for Connery.

- [Connectors](https://docs.connery.io/docs/connectors)
- [Native Clients](https://docs.connery.io/docs/native-clients/)
- [Community Clients](https://docs.connery.io/docs/community-clients)

If you have a connector or client you would like to add, please open a PR
to update the [docs](https://github.com/connery-io/connery/tree/main/apps/docs/docs) app in this repository.

## 📖 Documentation

Check out the [Connery Documentation](https://docs.connery.io) to learn more.

## 💬 Feedback & Support

Connery is still in beta, so not everything will be perfect yet. Please let us know of any suggestions, ideas, or bugs you encounter, and we will use your feedback to improve our upcoming releases.

You can reach us via the following channels:

- [Discussions](https://github.com/connery-io/connery/discussions) - for feedback, questions, and discussions.
- [Issues](https://github.com/connery-io/connery/issues) - for bug reports and feature requests.
- [Twitter](https://twitter.com/connery_io) - for updates and announcements.
