import { describe, expect, it } from 'vitest';
import { createI18n } from '../../src/domain/i18n/i18n.service.js';

describe('i18n service', () => {
  it('inicia en ES por defecto', () => {
    const i = createI18n('es');
    expect(i.getLang()).toBe('es');
    expect(i.t('menu.products')).toBeTruthy();
  });
  it('cambia idioma y notifica', () => {
    const i = createI18n('es');
    let notified = 0;
    const unsub = i.subscribe(() => notified++);
    i.setLang('en');
    expect(i.getLang()).toBe('en');
    expect(notified).toBe(1);
    unsub();
  });
});
