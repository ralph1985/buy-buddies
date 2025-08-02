import { describe, it, expect, beforeEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { vi } from 'vitest';

vi.mock('@material/web/iconbutton/icon-button.js', () => ({}));
vi.mock('@material/web/labs/navigationdrawer/navigation-drawer.js', () => ({}));
vi.mock('@material/web/list/list.js', () => ({}));
vi.mock('@material/web/list/list-item.js', () => ({}));
vi.mock('@material/web/textfield/outlined-text-field.js', () => ({}));

import './app-root.js';

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

declare global {
  interface Window {
    fetch: typeof fetch;
  }
}

describe('app-root component', () => {
  beforeEach(() => {
    import.meta.env.VITE_ENV = 'test';
    window.fetch = async () => new Response('[]', { status: 200 }) as any;
  });

  it('toggles the navigation drawer from the menu button', async () => {
    const el = await fixture<HTMLDivElement>(html`<app-root></app-root>`);
    await el.updateComplete;

    const button = el.shadowRoot?.querySelector(
      'md-icon-button',
    ) as HTMLElement;
    const drawer = el.shadowRoot?.querySelector(
      'md-navigation-drawer',
    ) as HTMLElement & { opened: boolean };

    button.click();
    expect(drawer.opened).toBe(true);
    button.click();
    expect(drawer.opened).toBe(false);
  });

  it('navigates to config page', async () => {
    const el = await fixture<HTMLDivElement>(html`<app-root></app-root>`);
    await el.updateComplete;

    const drawer = el.shadowRoot?.querySelector(
      'md-navigation-drawer',
    ) as HTMLElement & { opened: boolean };
    drawer.opened = true;
    const items = drawer.querySelectorAll('md-list-item');
    (items[1] as HTMLElement).click();
    await new Promise((r) => setTimeout(r));

    expect(window.location.pathname).toBe('/config');
    expect(el.shadowRoot?.textContent).toContain('Configuración');
    expect(el.shadowRoot?.textContent).toContain('Env: test');
  });
});
