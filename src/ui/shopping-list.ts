import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@material/web/textfield/outlined-text-field.js';
import { repeat } from 'lit/directives/repeat.js';
import './shopping-item.js';
import type { ShoppingItem } from '../../core/shopping/models/shopping-item.js';
import { t, LangController } from './i18n.js';

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
  private filter = '';

  private lang = new LangController(this);

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

  private onSearch(e: Event) {
    this.filter = (e.target as HTMLInputElement).value.toLowerCase();
  }

  render() {
    const filtered = this.items.filter((i) =>
      i.name.toLowerCase().includes(this.filter),
    );
    return html`
      <md-outlined-text-field
        .label=${t('search')}
        @input=${this.onSearch}
      ></md-outlined-text-field>
      <div class="total">
        ${t('total', filtered.length, this.items.length)}
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
