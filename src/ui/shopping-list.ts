import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@material/web/textfield/outlined-text-field.js';
import '@material/web/list/list.js';
import '@material/web/list/list-item.js';
import type { ShoppingItem } from '../../core/shopping/models/shopping-item.js';

@customElement('shopping-list')
export class ShoppingList extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
    }
  `;

  @state()
  private items: ShoppingItem[] = [];

  @state()
  private filter = '';

  private readonly mode: string = import.meta.env.MODE ?? '';

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
      <md-list>
        ${filtered.map(
          (item) => html`<md-list-item>
            ${item.name} - ${item.category}
            ${item.bought ? '✔️' : ''}
          </md-list-item>`,
        )}
      </md-list>
      <div>Mode: ${this.mode}</div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'shopping-list': ShoppingList;
  }
}
