import { input } from '@inquirer/prompts';
import { initRepository } from './templates-generator';
import { logError, logErrorBody, logSuccess, styleAnswer, styleQuestion } from './shared';

export default async function () {
  try {
    const answers = {
      connectorTitle: await input({
        message: styleQuestion('What is the connector title?', '(e.g.: My test connector)'),
        transformer: styleAnswer,
        validate: (value: string) => {
          if (value.length > 0) {
            return true;
          }
          return 'Please enter the connector title';
        },
      }),
      authorName: await input({
        message: styleQuestion('What is your full name?', '(for license and maintainer fields)'),
        transformer: styleAnswer,
        validate: (value: string) => {
          if (value.length > 0) {
            return true;
          }
          return 'Please enter your full name';
        },
      }),
      authorEmail: await input({
        message: styleQuestion('What is your email address?', '(for license and maintainer fields)'),
        transformer: styleAnswer,
        validate: (value: string) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const isValidEmail = emailRegex.test(value);

          if (!value) {
            return 'Please enter your email address';
          }

          if (!isValidEmail) {
            return 'Please enter a valid email address';
          }

          return true;
        },
      }),
    };

    initRepository({
      connector: {
        key: answers.connectorTitle.replace(/\s+/g, '-').toLowerCase(),
        title: answers.connectorTitle,
        description: `${answers.connectorTitle} connector for Connery`,
      },
      author: {
        name: answers.authorName,
        email: answers.authorEmail,
      },
      year: new Date().getFullYear(),
    });

    logSuccess('Connector repository is successfully initialized');
  } catch (error: any) {
    logError('Error occurred while initializing connector repository');
    logErrorBody(error.message);
    return;
  }
}
