import chalk from 'chalk';

export function styleQuestion(question: string, description: string) {
  const styleQuestion = chalk.reset.hex('#362490').bold(question);
  const styleDescription = chalk.reset.hex('#eeeeee')(description);
  return `${styleQuestion} ${styleDescription}`;
}

export function styleAnswer(answer: string) {
  return chalk.hex('#362490').bold(answer);
}

export function logInfo(message: string) {
  const logMessage = chalk.reset.hex('#000000')(message);
  console.log(logMessage);
}

export function logSuccess(message: string) {
  const logMessage = '✅ ' + chalk.reset.hex('#00ff00').bold(message);
  console.log(logMessage);
}

export function logError(message: string) {
  const logMessage = '🔴 ' + chalk.reset.hex('#ff0000').bold(message);
  console.log(logMessage);
}

export function logErrorBody(message: string) {
  const logMessage = chalk.reset.hex('#ff0000')(message);
  console.log(logMessage);
}
