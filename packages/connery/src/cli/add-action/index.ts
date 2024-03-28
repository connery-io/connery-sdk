import { logEmptyLine } from '../shared.js';
import { addAction } from './generator.js';
import { collectUserInput, showErrorMessage, showSuccessMessage } from './utils.js';

export default async function (): Promise<void> {
  try {
    const answers = await collectUserInput();
    await addAction(answers);

    logEmptyLine();
    showSuccessMessage();
  } catch (error: any) {
    logEmptyLine();
    showErrorMessage(error.message);
  }
}
