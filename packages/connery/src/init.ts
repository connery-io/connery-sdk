import { input } from '@inquirer/prompts';
import { initRepository } from './templates-generator';

export default async function () {
  try {
    const answers = {
      connectorTitle: await input({
        message: 'What is the connector title? (e.g.: My test connector)?',
        validate: (value: string) => {
          if (value.length > 0) {
            return true;
          }
          return 'Please enter the connector title';
        },
      }),
      connectorDescription: await input({
        message: 'What is the connector description? (optional)',
      }),
      authorName: await input({
        message: 'What is your full name?',
        validate: (value: string) => {
          if (value.length > 0) {
            return true;
          }
          return 'Please enter your full name';
        },
      }),
      authorEmail: await input({
        message: 'What is your email address?',
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
        description: answers.connectorDescription,
      },
      author: {
        name: answers.authorName,
        email: answers.authorEmail,
      },
      year: new Date().getFullYear(),
    });

    console.log('✅ Connector repository is successfully initialized');
  } catch (error: any) {
    console.log('🔴 Error occurred while initializing connector repository');
    console.log(error.message);
    return;
  }
}
