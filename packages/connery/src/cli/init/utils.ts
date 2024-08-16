import { input } from '@inquirer/prompts';
import { logEmptyLine, logError, logErrorBody, logSuccess, styleAnswer, styleError, styleQuestion } from '../shared.js';
import { InitRepositoryParameters } from './types.js';

export async function collectUserInput(): Promise<InitRepositoryParameters> {
  logEmptyLine();

  const answers = {
    pluginName: await input({
      message: styleQuestion('What is the plugin name?', '(e.g.: Gmail)'),
      transformer: styleAnswer,
      validate: (value: string) => {
        if (value.trim() === '') {
          return styleError('Please enter the plugin name');
        }
        return true;
      },
    }),
    pluginDescription: await input({
      message: styleQuestion(
        'What is the plugin description?',
        '(e.g.: A plugin that contains actions to work with Gmail.)',
      ),
      transformer: styleAnswer,
      validate: (value: string) => {
        if (value.trim() === '') {
          return styleError('Please enter the plugin description');
        }
        return true;
      },
    }),
  };

  return {
    plugin: {
      name: answers.pluginName.trim(),
      description: answers.pluginDescription.trim() || `Plugin built using Connery SDK.`,
    },
    year: new Date().getFullYear(),
  };
}

export async function removeFile(filePath: string): Promise<void> {
  const fs = await import('fs');
  return new Promise((resolve) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        // ignore error if file doesn't exist
        resolve();
      } else {
        resolve();
      }
    });
  });
}

export function showSuccessMessage(): void {
  logSuccess('Plugin repository is successfully initialized');
  logEmptyLine();
}

export function showErrorMessage(error: string): void {
  logError('Error occurred while initializing plugin repository');
  logErrorBody(error);
}
