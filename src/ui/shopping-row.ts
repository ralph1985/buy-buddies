import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { ShoppingItem } from '../../core/shopping/models/shopping-item.js';

@customElement('shopping-row')
export class ShoppingRow extends LitElement {
  createRenderRoot() {
    return this;
  }

  static styles = css`
    :host {
      display: contents;
    }
    td {
      padding: 4px;
      border: 1px solid #ccc;
    }
  `;

  @property({ type: Object })
  item!: ShoppingItem;

  render() {
    if (!this.item) {
      return html``;
    }
    const { name, quantity, unit, group, category, notes } = this.item;
    return html`
      <td>${name}</td>
      <td>${quantity}</td>
      <td>${unit}</td>
      <td>${group}</td>
      <td>${category}</td>
      <td>${notes}</td>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'shopping-row': ShoppingRow;
  }
}
