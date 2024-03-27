import { addAction } from './generator.js';
import { collectUserInput, showErrorMessage, showSuccessMessage } from './utils.js';

export default async function (): Promise<void> {
  try {
    const answers = await collectUserInput();
    await addAction(answers);
    showSuccessMessage();
  } catch (error: any) {
    showErrorMessage(error.message);
    throw error;
  }
}
