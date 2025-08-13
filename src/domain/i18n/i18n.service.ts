import { EN_DICT, ES_DICT } from './dicts.js';
import type { Dict, I18nService, I18nState, Lang } from './types.js';

const DICTS: Record<Lang, Dict> = { es: ES_DICT, en: EN_DICT };

class I18nStore implements I18nService {
  #state: I18nState;
  #listeners = new Set<() => void>();

  constructor(defaultLang: Lang) {
    this.#state = { lang: defaultLang, dict: DICTS[defaultLang] };
  }
  getLang(): Lang {
    return this.#state.lang;
  }
  setLang(lang: Lang): void {
    if (this.#state.lang === lang) return;
    this.#state = { lang, dict: DICTS[lang] };
    this.#listeners.forEach((cb) => cb());
  }
  t(key: keyof Dict): string {
    return this.#state.dict[key];
  }
  subscribe(cb: () => void): () => void {
    this.#listeners.add(cb);
    return () => this.#listeners.delete(cb);
  }
}

export const createI18n = (defaultLang: Lang): I18nService =>
  new I18nStore(defaultLang);
