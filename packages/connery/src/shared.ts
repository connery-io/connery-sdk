import chalk from 'chalk';

const successColor = '#00ff00';
const errorColor = '#ff0000';
const questionColor = '#362490';

export function styleQuestion(question: string, description?: string) {
  const styleQuestion = chalk.reset.hex(questionColor).bold(question);
  const styleDescription = chalk.reset.hex('#eeeeee')(description);
  return styleDescription ? `${styleQuestion} ${styleDescription}` : `${styleQuestion}`;
}

export function styleAnswer(answer: string) {
  return chalk.hex(questionColor)(answer);
}

export function styleError(message: string) {
  return chalk.reset.hex(errorColor)(message);
}

export function logInfo(message: string) {
  const logMessage = chalk.reset.hex('#000000')(message);
  console.log(logMessage);
}

export function logSuccess(message: string) {
  const logMessage = '✅ ' + chalk.reset.hex(successColor).bold(message);
  console.log(logMessage);
}

export function logError(message: string) {
  const logMessage = '🔴 ' + chalk.reset.hex(errorColor).bold(message);
  console.log(logMessage);
}

export function logErrorBody(message: string) {
  const logMessage = chalk.reset.hex(errorColor)(message);
  console.log(logMessage);
}
