import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@material/web/textfield/outlined-text-field.js';
import './shopping-table.js';
import type { ShoppingItem } from '../../core/shopping/models/shopping-item.js';

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

  connectedCallback() {
    super.connectedCallback();
    this.load();
  }

  async load() {
    const res = await fetch('/api/shopping/get');
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
        label="Search"
        @input=${this.onSearch}
      ></md-outlined-text-field>
      <shopping-table .items=${filtered}></shopping-table>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'shopping-list': ShoppingList;
  }
}
