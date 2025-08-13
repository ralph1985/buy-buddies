import { beforeEach, describe, expect, it } from 'vitest';
import { loadLang, saveLang } from '../../src/infrastructure/storage/localLanguage.repository.js';

describe('localLanguage.repository', () => {
  beforeEach(() => localStorage.clear());
  it('retorna es si no hay valor', () => {
    expect(loadLang()).toBe('es');
  });
  it('persiste y lee el idioma', () => {
    saveLang('en');
    expect(loadLang()).toBe('en');
  });
});
