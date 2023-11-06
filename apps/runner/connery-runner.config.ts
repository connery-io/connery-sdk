// ###### NOTE ######
// The ENV variables used in this configuration file are pulled
// from the .env file in the root of the repository. For example,
// the process.env.CONNERY_RUNNER_API_KEY is pulled
// from the CONNERY_RUNNER_API_KEY variable in the.env file.
// The .env file is not committed to the repository for security reasons.
// ##################

export default () => ({
  RunnerConfig: {
    // GitHub Personal Access Token is used to access plugins in private repositories.
    // The user associated with the PAT must have access to the private repositories.
    // It's optional if you don't use private plugins.
    GitHubPat: process.env.GITHUB_PAT,

    // OpenAI API Key is used for the Natural Language Actions feature.
    // It's optional if you don't use the feature.
    OpenAiApiKey: process.env.OPENAI_API_KEY,
  },

  // We recommend using a separate API key for each client.
  ApiKeys: [
    {
      // This is a default API key.
      // Runner uses this key to protect the API.
      // Use it in the clients to configure connection to the runner.
      //
      // This key is also used for the internal purposes of the runner.
      // For example, by the pre-installed connery-io/connery-runner-administration plugin (see below).
      Title: 'Connery Runner API Key',
      ApiKey: process.env.CONNERY_RUNNER_API_KEY,
    },
  ],

  // List of plugins installed on the runner.
  InstalledPlugins: [
    {
      // This is a pre-installed plugin for runner administration.
      Key: 'connery-io/connery-runner-administration@main',
      ConfigurationParameters: {
        runnerUrl: 'http://localhost:4201',
        runnerApiKey: process.env.CONNERY_RUNNER_API_KEY, // This API key is used by the plugin to access the runner's API.
      },
    },
  ],
});
