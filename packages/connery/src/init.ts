import { input } from '@inquirer/prompts';
import { initRepository } from './templates-generator';
import { logError, logErrorBody, logSuccess, styleAnswer, styleError, styleQuestion } from './shared';

export default async function () {
  try {
    const answers = {
      connectorTitle: await input({
        message: styleQuestion('What is the connector title?', '(e.g.: My test connector)'),
        transformer: styleAnswer,
        validate: (value: string) => {
          if (value.trim() === '') {
            return styleError('Please enter the connector title');
          }
          return true;
        },
      }),
      authorName: await input({
        message: styleQuestion('What is your full name?', '(for license and maintainer fields)'),
        transformer: styleAnswer,
        validate: (value: string) => {
          if (value.trim() === '') {
            return styleError('Please enter your full name');
          }
          return true;
        },
      }),
      authorEmail: await input({
        message: styleQuestion('What is your email address?', '(for license and maintainer fields)'),
        transformer: styleAnswer,
        validate: (value: string) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const isValidEmail = emailRegex.test(value);

          if (value.trim() === '') {
            return styleError('Please enter your email address');
          }

          if (!isValidEmail) {
            return styleError('Please enter a valid email address');
          }

          return true;
        },
      }),
    };

    initRepository({
      connector: {
        key: answers.connectorTitle.trim().replace(/\s+/g, '-').toLowerCase(),
        title: answers.connectorTitle.trim(),
        description: `${answers.connectorTitle.trim()} connector for Connery`,
      },
      author: {
        name: answers.authorName.trim(),
        email: answers.authorEmail.trim(),
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
