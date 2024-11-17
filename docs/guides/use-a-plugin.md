---
description: >-
  Learn how to start a plugin server in the development environment and use it
  from Connery in Slack.
icon: arrow-progress
---

# Use a plugin

If you landed on this page, we assume you already know which plugin you want to start using.

If not, you can either [create a new plugin](create-a-plugin.md) or choose one from the list of available [open-source plugins](../get-started/open-source-plugins.md) that offer the actions you need.

Then, continue with the following steps.

## 1. Set up development environment[​](https://sdk.connery.io/docs/quickstart/use-plugin#1-create-or-find-the-plugin) <a href="#id-1-create-or-find-the-plugin" id="id-1-create-or-find-the-plugin"></a>

{% include "../.gitbook/includes/set-up-development-environment.md" %}

## 2. Install dependencies[​](https://sdk.connery.io/docs/quickstart/use-plugin#2-install-dependencies) <a href="#id-2-install-dependencies" id="id-2-install-dependencies"></a>

{% include "../.gitbook/includes/install-dependencies.md" %}

## 3. Configure the plugin server[​](https://sdk.connery.io/docs/quickstart/use-plugin#3-configure-the-plugin-server) <a href="#id-3-configure-the-plugin-server" id="id-3-configure-the-plugin-server"></a>

Copy the `.env.example` file to `.env` and update the environment variables with your values.

```
cp .env.example .env
```

Check the [plugin server configuration](../advanced/plugin-server.md#configuration) to learn more about the available environment variables.

## 4. Start the plugin server[​](https://sdk.connery.io/docs/quickstart/use-plugin#4-start-the-plugin-server) <a href="#id-4-start-the-plugin-server" id="id-4-start-the-plugin-server"></a>

{% include "../.gitbook/includes/start-the-plugin-server.md" %}

## 5. Expose the plugin server to the Internet[​](https://sdk.connery.io/docs/quickstart/use-plugin#5-expose-the-plugin-server-to-the-internet) <a href="#id-5-expose-the-plugin-server-to-the-internet" id="id-5-expose-the-plugin-server-to-the-internet"></a>

If you are running the plugin server on GitHub Codespaces, share the port `4201` by following GitHub’s official [guide on sharing ports](https://docs.github.com/en/codespaces/developing-in-a-codespace/forwarding-ports-in-your-codespace#sharing-a-port).

If you are running the plugin server on your local machine, you can use ngrok to expose the port `4201` of the plugin server, making it accessible from the Internet. The following command will generate a public URL that you can use to access the plugin server from the Internet.

```
ngrok http 4201
```

## 6. Create a custom plugin on the Connery Platform <a href="#id-6-configure-the-client" id="id-6-configure-the-client"></a>

...

## 7. Create an action in the Connery Platform

...

## 8. Run the action from Slack

...
