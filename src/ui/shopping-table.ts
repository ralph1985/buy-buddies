import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { ShoppingItem } from '../../core/shopping/models/shopping-item.js';
import './shopping-row.js';

@customElement('shopping-table')
export class ShoppingTable extends LitElement {
  static styles = css`
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th {
      text-align: left;
      padding: 4px;
      border-bottom: 2px solid #000;
    }
  `;

  @property({ type: Array })
  items: ShoppingItem[] = [];

  render() {
    return html`<table>
      <thead>
        <tr>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Unidad</th>
          <th>Grupo</th>
          <th>Categoría</th>
          <th>Notas</th>
        </tr>
      </thead>
      <tbody>
        ${this.items.map((item) => html`<shopping-row .item=${item}></shopping-row>`)}
      </tbody>
    </table>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'shopping-table': ShoppingTable;
  }
}
