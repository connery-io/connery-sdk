import { SHA256 } from 'crypto-js';

export function generatePluginHashId(pluginKey: string): string {
  const hash = SHA256(pluginKey).toString();
  // CP means "Connery Plugin"
  return 'CP' + hash.substring(0, 30).toUpperCase();
}

export function generateActionHashId(pluginKey: string, actionKey: string): string {
  const hash = SHA256(`${pluginKey}:${actionKey}`).toString();
  // CA means "Connery Action"
  return 'CA' + hash.substring(0, 30).toUpperCase();
}
