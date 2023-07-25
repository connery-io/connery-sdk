import { input, select } from '@inquirer/prompts';
import { addAction } from './templates-generator';
import { logError, logErrorBody, logSuccess, styleAnswer, styleError, styleQuestion } from './shared';

export default async function (): Promise<void> {
  try {
    const answers = {
      actionTitle: await input({
        message: styleQuestion('What is the new action title?', '(e.g.: My test action)?'),
        transformer: styleAnswer,
        validate: (value: string) => {
          if (value.trim() === '') {
            return styleError('Please enter the action title');
          }
          return true;
        },
      }),
      actionDescription: await input({
        message: styleQuestion('What is the new action description?', '(optional)'),
        transformer: styleAnswer,
      }),
      actionType: await select({
        message: styleQuestion('Select the action type'),
        choices: [
          { name: 'Create', value: 'create' },
          { name: 'Read', value: 'read' },
          { name: 'Update', value: 'update' },
          { name: 'Delete', value: 'delete' },
        ],
      }),
    };

    addAction({
      key: toPascalCase(answers.actionTitle.trim()),
      title: answers.actionTitle.trim(),
      description: answers.actionDescription.trim(),
      type: answers.actionType.trim(),
    });

    logSuccess('Action is successfully added');
  } catch (error: any) {
    logError('Error occurred while adding action');
    logErrorBody(error.message);
    return;
  }
}

function toPascalCase(str: string) {
  return str
    .replace(/[^a-zA-Z\s]/g, '') // Remove all non-alphabetic characters
    .split(' ') // Split the string into an array of words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word and make the rest lowercase
    .join(''); // Join the words back into a single string without spaces
}
