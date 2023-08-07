import chalk from 'chalk';

const successColor = '#00ff00';
const errorColor = '#ff0000';
const questionColor = '#362490';
const infoColor = '#000000';
const additionalDataColor = 'eeeeee';

export function styleQuestion(question: string, description?: string) {
  const styleQuestion = chalk.reset.hex(questionColor).bold(question);

  if (description) {
    const styleDescription = chalk.reset.hex(additionalDataColor)(description);
    return `${styleQuestion} ${styleDescription}`;
  } else {
    return `${styleQuestion}`;
  }
}

export function styleAnswer(answer: string) {
  return chalk.hex(questionColor)(answer);
}

export function styleError(message: string) {
  return chalk.reset.hex(errorColor)(message);
}

export function logTitle(message: string) {
  const logMessage = chalk.reset.hex(infoColor).bold(message);
  addEmptyLine();
  console.log(`${logMessage}`);
  addEmptyLine();
}

export function logInfo(message: string) {
  const logMessage = chalk.reset.hex(infoColor)(message);
  console.log(logMessage);
}

export function logSuccess(message: string) {
  const logMessage = chalk.reset.hex(successColor).bold(message);
  addEmptyLine();
  console.log(`✅ ${logMessage}`);
  addEmptyLine();
}

export function logError(message: string) {
  const logMessage = chalk.reset.hex(errorColor).bold(message);
  addEmptyLine();
  console.log(`🔴 ${logMessage}`);
  addEmptyLine();
}

export function logErrorBody(message: string) {
  const logMessage = chalk.reset.hex(errorColor)(message);
  console.log(logMessage);
}

export function addEmptyLine() {
  console.log('');
}
