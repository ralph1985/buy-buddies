import { isLang, type Lang } from '../../domain/i18n/types.js';

const KEY = 'bb.lang';

export function loadLang(): Lang {
  try {
    const raw = localStorage.getItem(KEY);
    return isLang(raw) ? raw : 'es';
  } catch {
    return 'es';
  }
}

export function saveLang(lang: Lang): void {
  try {
    localStorage.setItem(KEY, lang);
  } catch {
    /* noop: sin bloqueo si el navegador no permite persistir */
  }
}
