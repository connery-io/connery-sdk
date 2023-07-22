# Open source connector ecosystem for AI

## Demo

(Video)

## What is this?

### Vision & Mission

### Three main components

(Image: Connectors --> Runner --> Clients)

**Connector with actions**. *Connector* is a set of simple *actions* that a user can delegate to AI. For example "Send email" action in "Gmail" connector. Every connector is a separate open source GitHub reposotory using similar approach to GitHub Actions. Connectors have different names - plugins in ChatGPT, tools in LangChain, apps/integrations in Zapier. 

(Link: to sample connector repository - send GMAIL)

**Runner** is a personal server to host and run actions. Every company or individual configures their own isolated runner with a unique connector set and configuration.

**Clients**. End users apply clients to automate their work in different ways. They are executing actions exposed by the runner based on the access configuration. For example, our Slack App for executing less frequent and manual actions. Or LangChain Tool for exposing actions to agents for frequent, fully automated tasks. There are many other clients and use cases possible.

### What can this help with?

## Quick start

- Clone repository
- Configure ENV variables for the runner
- Start runner with preconfigured connectors
- Call API to run action OR use one of the Clients

## Connectors

Available connectors 
(list an a separate page)

Develop connector 
(separate page)

## Runner
Setting up your personal runner
(separate page)

## Clients

- LangChain Tool
    - (comming soon)
- Slack App
    - (installation link)
    - (Demo video)
- Make App
    - (installation link)
    - (Demo video)

## Roadmap

- LangChain Tool client
- Runner management UI
- OAuth support in connectors
- User Access Management
- Action manual approval
- Audit logs
- Subscriptions

## Community

- Join us on Discord
- Join us on Twitter
