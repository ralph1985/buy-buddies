import { fixture, html } from '@open-wc/testing';
import { describe, it, expect } from 'vitest';
import './shopping-item.js';

import type { ShoppingItem } from '../../core/shopping/models/shopping-item.js';

describe('shopping-item', () => {
  it('renders item information', async () => {
    const item: ShoppingItem = {
      id: '1',
      name: 'Agua',
      quantity: '1',
      unit: 'L',
      group: 'Grupo',
      category: 'Bebida',
      notes: 'Nota',
      bought: false,
    };
    const el = await fixture<any>(html`<shopping-item .item=${item}></shopping-item>`);
    await el.updateComplete;
    const text = el.shadowRoot!.textContent!;
    expect(text).toContain('Agua');
    expect(text).toContain('1');
    expect(text).toContain('Bebida');
    expect(text).toContain('Grupo');
    expect(text).toContain('Nota');
    const checkbox = el.shadowRoot!.querySelector('input[type="checkbox"]');
    expect(checkbox).toBeTruthy();
  });
});
