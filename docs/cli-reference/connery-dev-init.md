---
description: Create all the necessary files and folders to start developing a new plugin.
icon: rectangle-terminal
---

# connery dev init

Run this command at the root of your project. You will be asked a few questions to configure the plugin, and then the CLI will create all the necessary files and configurations.

```
npx connery@latest dev init
```

The newly initialized plugin is fully functional. Its entry point is the `./src/index.ts` file, which contains the plugin definition.&#x20;

Also, you can find the sample action defined in the `./src/actions/sampleAction.ts` file. The sample action sums up two numbers and returns the result. It is a good starting point for exploring and experimenting with the plugin. Remove the sample action when you don't need it anymore.

The command also creates a `.env` file with the default [configuration](../advanced/plugin-server.md#configuration) for the plugin server.
