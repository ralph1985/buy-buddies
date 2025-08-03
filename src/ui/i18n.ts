export type Lang = 'es' | 'en';

// Load initial language from localStorage or default to Spanish
let currentLang: Lang = (localStorage.getItem('lang') as Lang) || 'es';

// Very small pub-sub to notify components about language changes
const listeners = new Set<() => void>();

export function getLang(): Lang {
  return currentLang;
}

export function setLang(lang: Lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  listeners.forEach((l) => l());
}

export function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

// Translation dictionary
const translations: Record<Lang, Record<string, any>> = {
  es: {
    menu: 'Menú',
    list: 'Lista',
    config: 'Configuración',
    back: 'Volver',
    language: 'Idioma',
    search: 'Buscar',
    sheetId: 'ID de Google Sheet',
    total: (current: number, total: number) =>
      `Total de productos: ${current} de ${total}`,
  },
  en: {
    menu: 'Menu',
    list: 'List',
    config: 'Settings',
    back: 'Back',
    language: 'Language',
    search: 'Search',
    sheetId: 'Google Sheet ID',
    total: (current: number, total: number) =>
      `Total items: ${current} of ${total}`,
  },
};

export function t(key: string, ...args: any[]): string {
  const value = translations[currentLang][key];
  if (typeof value === 'function') {
    return value(...args);
  }
  return value ?? key;
}

// Lit controller to update components on language change
import type { ReactiveController, ReactiveControllerHost } from 'lit';

export class LangController implements ReactiveController {
  private host: ReactiveControllerHost;
  private unsub?: () => void;

  constructor(host: ReactiveControllerHost) {
    this.host = host;
    host.addController(this);
  }

  hostConnected() {
    this.unsub = subscribe(() => this.host.requestUpdate());
  }

  hostDisconnected() {
    this.unsub?.();
  }
}
