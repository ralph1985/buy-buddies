import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import './shopping-item.js';
import './shopping-filters.js';
import type { ShoppingItem } from '../../core/shopping/models/shopping-item.js';
import {
  filterShoppingItems,
  type ShoppingFilters,
} from '../../core/shopping/use-cases/filter-shopping-items.js';

@customElement('shopping-list')
export class ShoppingList extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
      background-color: #fff9c4;
    }
  `;

  @state()
  private items: ShoppingItem[] = [];

  @state()
  private filters: ShoppingFilters = {
    text: '',
    group: '',
    category: '',
    status: 'todos',
  };

  connectedCallback() {
    super.connectedCallback();
    this.load();
  }

  async load() {
    const sheetId = localStorage.getItem('googleSheetId');
    const url = sheetId
      ? `/api/shopping/get?googleSheetId=${encodeURIComponent(sheetId)}`
      : '/api/shopping/get';
    const res = await fetch(url);
    this.items = await res.json();
  }

  render() {
    const filtered = filterShoppingItems(this.items, this.filters);
    const groups = [...new Set(this.items.map((i) => i.group))];
    const categories = [...new Set(this.items.map((i) => i.category))];
    return html`
      <shopping-filters
        .groups=${groups}
        .categories=${categories}
        .filters=${this.filters}
        @filters-changed=${(e: CustomEvent<ShoppingFilters>) =>
          (this.filters = e.detail)}
      ></shopping-filters>
      <div class="total">
        Total de productos: ${filtered.length} de ${this.items.length}
      </div>
      <div>
        ${repeat(
          filtered,
          (item) => item.id,
          (item) => html`<shopping-item .item=${item}></shopping-item>`,
        )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'shopping-list': ShoppingList;
  }
}
