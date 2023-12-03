// ###### NOTE ######
// The ENV variables used in this configuration file are pulled
// from the .env file in the root of the repository. For example,
// the process.env.CONNERY_RUNNER_API_KEY is pulled
// from the CONNERY_RUNNER_API_KEY variable in the.env file.
// The .env file is not committed to the repository for security reasons.
// ##################

import { Config } from ':src/shared/config/types';

const config: Config = {
  runnerConfig: {
    // GitHub Personal Access Token is used to access plugins in private repositories.
    // The user associated with the PAT must have access to the private repositories.
    // It's optional if you don't use private plugins.
    gitHubPat: process.env.GITHUB_PAT || '',

    // OpenAI API Key is used for the Natural Language Actions feature.
    // It's optional if you don't use the feature.
    openAiApiKey: process.env.OPENAI_API_KEY || '',

    // The public URL of the runner.
    // This URL is used in an OpenAPI specification for the available actions on the runner.
    // It's optional if you don't use the feature.
    // Example: https://runner.example.com
    publicUrl: process.env.CONNERY_RUNNER_PUBLIC_URL || '',
  },

  // We recommend using a separate API key for each client.
  apiKeys: [
    {
      // This is a default API key.
      // Runner uses this key to protect the API.
      // Use it in the clients to configure connection to the runner.
      //
      // This key is also used for the internal purposes of the runner.
      // For example, by the pre-installed connery-io/connery-runner-administration plugin (see below).
      title: 'Connery Runner API Key',
      apiKey: process.env.CONNERY_RUNNER_API_KEY || '',
    },
  ],

  // List of plugins installed on the runner.
  installedPlugins: [
    {
      // This is a pre-installed plugin for runner administration.
      key: 'connery-io/connery-runner-administration@main',
      configurationParameters: {
        runnerUrl: 'http://localhost:4201',
        runnerApiKey: process.env.CONNERY_RUNNER_API_KEY || '', // This API key is used by the plugin to access the runner's API.
      },
    },
  ],
};
export default () => config;
