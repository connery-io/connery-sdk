export default () => ({
  RunnerConfig: {
    // GitHub Personal Access Token is used to access connectors in private repositories.
    // The user associated with the PAT must have access to the private repositories.
    // It's optional if you don't use private connectors.
    GitHubPat: process.env.GITHUB_PAT,

    // OpenAI API Key is used for the Natural Language Actions feature.
    // It's optional if you don't use the feature.
    OpenAiApiKey: process.env.OPENAI_API_KEY,
  },

  // We recommend using a separate API key for each client.
  ApiKeys: [
    {
      // This API key is used for internal purposes of the runner.
      // For example by the connery-io/connery-runner-administration connector.
      Title: 'Connery Runner API Key',
      ApiKey: process.env.CONNERY_RUNNER_API_KEY,
    },
  ],

  // List of connectors installed on the runner.
  InstalledConnectors: [
    {
      // Use this connector for runner administration.
      Key: 'connery-io/connery-runner-administration@main',
      ConfigurationParameters: {
        RunenrUrl: 'http://localhost:80',
        RunnerApiKey: process.env.CONNERY_RUNNER_API_KEY, // This API key is used by the connector to access the runner's API.
      },
    },
  ],
});
