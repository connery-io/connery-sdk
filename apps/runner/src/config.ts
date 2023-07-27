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
      RepoBranch: 'main',
      ConfigurationParameters: {
        RunenrUrl: 'http://localhost',
        RunnerApiKey: process.env.API_KEY,
      },
    },
    {
      RepoOwner: 'connery-io',
      RepoName: 'amazon-ses-identity-verification',
      RepoBranch: 'main',
      ConfigurationParameters: {
        AwsRegion: process.env.SES_AWS_REGION,
        AwsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
        AwsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        NotificationSnsTopic: process.env.NOTIFICATION_SNS_TOPIC,
      },
    },
  ],
});
