import * as crypto from 'crypto';

export function generatePluginHashId(pluginKey: string): string {
  const hash = crypto.createHash('sha256');
  hash.update(pluginKey);
  // CP means "Connery Plugin"
  return 'CP' + hash.digest('hex').substring(0, 30).toUpperCase();
}

export function generateActionHashId(pluginKey: string, actionKey: string): string {
  const hash = crypto.createHash('sha256');
  hash.update(`${pluginKey}:${actionKey}`);
  // CA means "Connery Action"
  return 'CA' + hash.digest('hex').substring(0, 30).toUpperCase();
}