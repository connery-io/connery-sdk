import { initRepository } from './generator.js';
import { collectUserInput, removeFile, showErrorMessage, showSuccessMessage } from './utils.js';

export default async function () {
  try {
    const userInput = await collectUserInput();

    // Remove README.md, .gitignore and LICENSE files which may be created by GitHub
    // TODO: Replace this with a better solution as this can remove files which are created by the user
    await removeFile(`${process.cwd()}/README.md`);
    await removeFile(`${process.cwd()}/.gitignore`);
    await removeFile(`${process.cwd()}/LICENSE`);

    await initRepository(userInput);

    showSuccessMessage();
  } catch (error: any) {
    showErrorMessage(error.message);
    throw error;
  }
}
