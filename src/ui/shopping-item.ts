import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { ShoppingItem } from '../../core/shopping/models/shopping-item.js';

@customElement('shopping-item')
export class ShoppingItemElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      border: 1px solid #ccc;
      margin: 4px 0;
      padding: 8px;
    }
    .top {
      display: flex;
      align-items: center;
    }
    .checkbox {
      background-color: #f8bbd0;
      padding: 4px;
      margin-right: 8px;
    }
    .title {
      flex: 1;
      background-color: #bbdefb;
      padding: 4px;
    }
    .quantity {
      background-color: #c8e6c9;
      padding: 4px;
      margin-left: 8px;
    }
    .meta {
      background-color: #ffe0b2;
      text-align: center;
      margin-top: 4px;
      padding: 4px;
    }
    .notes {
      background-color: #d7ccc8;
      margin-top: 4px;
      padding: 4px;
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
      <div class="top">
        <div class="checkbox"><input type="checkbox" /></div>
        <div class="title">${name}</div>
        <div class="quantity">${quantity} ${unit}</div>
      </div>
      <div class="meta">${category} - ${group}</div>
      ${notes ? html`<div class="notes">${notes}</div>` : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'shopping-item': ShoppingItemElement;
  }
}
