export type Lang = 'es' | 'en';
export const isLang = (v: unknown): v is Lang => v === 'es' || v === 'en';

export type I18nKey =
  | 'menu.home'
  | 'menu.products'
  | 'menu.list'
  | 'menu.groups'
  | 'menu.settings';

export type Dict = Record<I18nKey, string>;

export interface I18nState {
  lang: Lang;
  dict: Dict;
}

export interface I18nService {
  getLang(): Lang;
  setLang(lang: Lang): void;
  t(key: I18nKey): string;
  subscribe(cb: () => void): () => void;
}
