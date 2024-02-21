import { generateActionHashId, generatePluginHashId } from '../id-utils';

describe('generatePluginHashId()', () => {
  it('generates correct HashId for given input', () => {
    const hashId = generatePluginHashId('connery-io/connery-runner-administration@main');
    expect(hashId).toBe('CPA71B593AD9761837C1CE4B0B9BDE99');
  });

  it('generates HashId of correct length of 32 characters', () => {
    const shortHashId = generatePluginHashId('p1');
    const longHashId = generatePluginHashId(
      'connery-io/connery-runner-administration@main123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890',
    );
    expect(shortHashId).toHaveLength(32);
    expect(longHashId).toHaveLength(32);
  });

  it('is idempotent', () => {
    const pluginKey = 'plugin1';
    const hashId1 = generatePluginHashId(pluginKey);
    const hashId2 = generatePluginHashId(pluginKey);
    expect(hashId1).toBe(hashId2);
  });

  it('generates unique HashIds for different inputs', () => {
    const hashId1 = generatePluginHashId('plugin1');
    const hashId2 = generatePluginHashId('plugin2');
    expect(hashId1).not.toBe(hashId2);
  });

  it('generates HashIds that start with "CP"', () => {
    const hashId = generatePluginHashId('plugin1');
    expect(hashId).toMatch(/^CP/);
  });
});

describe('generateActionHashId()', () => {
  it('generates correct HashId for given inputs', () => {
    const hashId = generateActionHashId('connery-io/connery-runner-administration@main', 'refreshPluginCache');
    expect(hashId).toBe('CAF979E6D2FF4C8B946EEBAFCB3BA475');
  });

  it('generates HashId of correct length of 32 characters', () => {
    const shortHashId = generateActionHashId('p1', 'a1');
    const longHashId = generateActionHashId(
      'connery-io/connery-runner-administration@main123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890',
      'refreshPluginCache',
    );
    expect(shortHashId).toHaveLength(32);
    expect(longHashId).toHaveLength(32);
  });

  it('is idempotent', () => {
    const pluginKey = 'plugin1';
    const actionKey = 'action1';
    const hashId1 = generateActionHashId(pluginKey, actionKey);
    const hashId2 = generateActionHashId(pluginKey, actionKey);
    expect(hashId1).toBe(hashId2);
  });

  it('generates unique HashIds for different inputs', () => {
    const hashId1 = generateActionHashId('plugin1', 'action1');
    const hashId2 = generateActionHashId('plugin1', 'action2');
    expect(hashId1).not.toBe(hashId2);
  });

  it('generates HashIds that start with "CA"', () => {
    const hashId = generateActionHashId('plugin1', 'action1');
    expect(hashId).toMatch(/^CA/);
  });
});
