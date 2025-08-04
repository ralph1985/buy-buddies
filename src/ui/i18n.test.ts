import { describe, it, expect, vi, beforeEach } from 'vitest';

// this test dynamically imports the module after manipulating localStorage
// to ensure the initial language falls back to Spanish when an unsupported
// value was stored previously

describe('i18n language loading', () => {
  beforeEach(() => {
    vi.resetModules();
    localStorage.clear();
  });

  it('falls back to Spanish when stored language is invalid', async () => {
    localStorage.setItem('lang', 'de');
    const mod = await import('./i18n.js');
    expect(mod.getLang()).toBe('es');
    expect(mod.t('menu')).toBe('Menú');
  });
});
