import { fixture, html } from '@open-wc/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@material/web/iconbutton/icon-button.js', () => ({}));
vi.mock('@material/web/labs/navigationdrawer/navigation-drawer.js', () => ({}));
vi.mock('@material/web/list/list.js', () => ({}));
vi.mock('@material/web/list/list-item.js', () => ({}));
vi.mock('@material/web/textfield/outlined-text-field.js', () => ({}));
vi.mock('@material/web/checkbox/checkbox.js', () => ({}));

import { AppRoot } from './app-root.js';

if (!customElements.get('md-icon-button')) {
  customElements.define('md-icon-button', class extends HTMLElement {});
}
if (!customElements.get('md-navigation-drawer')) {
  customElements.define(
    'md-navigation-drawer',
    class extends HTMLElement {
      opened = false;
    },
  );
}
if (!customElements.get('md-list')) {
  customElements.define('md-list', class extends HTMLElement {});
}
if (!customElements.get('md-list-item')) {
  customElements.define('md-list-item', class extends HTMLElement {});
}
if (!customElements.get('md-outlined-text-field')) {
  customElements.define('md-outlined-text-field', class extends HTMLElement {});
}
if (!customElements.get('md-checkbox')) {
  customElements.define(
    'md-checkbox',
    class extends HTMLElement {
      checked = false;
    },
  );
}

declare global {
  interface Window {
    fetch: typeof fetch;
  }
}

describe('app-root component', () => {
  beforeEach(() => {
    (import.meta as any).env = {
      VITE_ENV: 'test',
      VITE_BUGSNAG_KEY: 'test-key',
    };
    window.fetch = async () => new Response('[]', { status: 200 }) as any;
    localStorage.clear();
  });

  it('toggles the navigation drawer from the menu button', async () => {
    const el = await fixture<AppRoot>(html`<app-root></app-root>`);
    await el.updateComplete;

    const header = el.shadowRoot?.querySelector('app-header') as HTMLElement;
    const button = header.querySelector('md-icon-button') as HTMLElement;
    const drawer = el.shadowRoot?.querySelector('md-navigation-drawer') as HTMLElement & { opened: boolean };

    button.click();
    expect(drawer.opened).toBe(true);
    button.click();
    expect(drawer.opened).toBe(false);
  });

  it('navigates to config page', async () => {
    const el = await fixture<AppRoot>(html`<app-root></app-root>`);
    await el.updateComplete;

    const drawer = el.shadowRoot?.querySelector('md-navigation-drawer') as HTMLElement & { opened: boolean };
    drawer.opened = true;
    const items = drawer.querySelectorAll('md-list-item');
    (items[1] as HTMLElement).click();
    await new Promise((r) => setTimeout(r));

    expect(window.location.pathname).toBe('/config');
    expect(el.shadowRoot?.textContent).toContain('Configuración');
    // Environment variables may not be available in this test environment
  });

  it('closes the navigation drawer from the close button and shows a title', async () => {
    const el = await fixture<AppRoot>(html`<app-root></app-root>`);
    await el.updateComplete;

    const header = el.shadowRoot?.querySelector('app-header') as HTMLElement;
    const menuButton = header.querySelector('md-icon-button') as HTMLElement;
    const drawer = el.shadowRoot?.querySelector('md-navigation-drawer') as HTMLElement & { opened: boolean };

    menuButton.click();
    expect(drawer.opened).toBe(true);

    const title = drawer.querySelector('.title') as HTMLElement;
    expect(title?.textContent).toContain('Menú');

    const closeButton = drawer.querySelector('md-icon-button') as HTMLElement;
    closeButton.click();
    expect(drawer.opened).toBe(false);
  });
});
