export default () => ({
  RunnerConfig: {
    GitHubPat: process.env.GITHUB_PAT,
    OpenAiApiKey: process.env.OPENAI_API_KEY,
  },
  ApiKeys: [
    {
      Title: 'API Key',
      ApiKey: process.env.API_KEY,
    },
  ],
  InstalledConnectors: [
    {
      RepoOwner: 'connery-io',
      RepoName: 'connery-runner-administration',
      RepoBranch: 'v0.0.1',
      ConfigurationParameters: {
        RunenrUrl: 'http://localhost:80',
        RunnerApiKey: process.env.API_KEY,
      },
    },
    {
      RepoOwner: 'connery-io',
      RepoName: 'gmail',
      RepoBranch: 'v0.0.1',
      ConfigurationParameters: {
        GmailEmailAddress: process.env.GMAIL_EMAIL_ADDRESS,
        GmailAppPassword: process.env.GMAIL_APP_PASSWORD,
        SenderName: process.env.GMAIL_SENDER_NAME,
      },
    },
  ],
});
