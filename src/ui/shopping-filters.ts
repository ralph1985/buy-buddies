import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import '@material/web/textfield/outlined-text-field.js';
import type { ShoppingFilters } from '../../core/shopping/use-cases/filter-shopping-items.js';

@customElement('shopping-filters')
export class ShoppingFiltersElement extends LitElement {
  static styles = css`
    .box {
      border: 1px solid #ccc;
      padding: 8px;
      margin: 8px 0;
      background: #fafafa;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .summary {
      margin: 8px 0;
      font-size: 0.9rem;
    }
  `;

  @property({ type: Array }) groups: string[] = [];
  @property({ type: Array }) categories: string[] = [];
  @property({ type: Object }) filters: ShoppingFilters = {
    text: '',
    group: '',
    category: '',
    status: 'todos',
  };

  @state() private open = false;

  private updateFilters(changes: Partial<ShoppingFilters>) {
    this.filters = { ...this.filters, ...changes };
    this.dispatchEvent(
      new CustomEvent<ShoppingFilters>('filters-changed', {
        detail: this.filters,
      }),
    );
  }

  private toggle = () => {
    this.open = !this.open;
  };

  private onText = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    this.updateFilters({ text: value });
  };

  private onGroup = (e: Event) => {
    const value = (e.target as HTMLSelectElement).value;
    this.updateFilters({ group: value });
  };

  private onCategory = (e: Event) => {
    const value = (e.target as HTMLSelectElement).value;
    this.updateFilters({ category: value });
  };

  private onStatus = (e: Event) => {
    const value = (e.target as HTMLSelectElement).value as ShoppingFilters['status'];
    this.updateFilters({ status: value });
  };

  private renderSummary() {
    const parts: string[] = [];
    if (this.filters.text) parts.push(`Texto: ${this.filters.text}`);
    if (this.filters.group) parts.push(`Grupo: ${this.filters.group}`);
    if (this.filters.category) parts.push(`Categoría: ${this.filters.category}`);
    if (this.filters.status && this.filters.status !== 'todos') {
      parts.push(
        `Estado: ${this.filters.status === 'comprado' ? 'Comprado' : 'No comprado'}`,
      );
    }
    return parts.length
      ? html`<div class="summary">Filtros: ${parts.join(', ')}</div>`
      : html``;
  }

  render() {
    return html`
      <button @click=${this.toggle}>
        ${this.open ? 'Ocultar filtros' : 'Mostrar filtros'}
      </button>
      ${this.open
        ? html`<div class="box">
            <md-outlined-text-field
              label="Buscar"
              .value=${this.filters.text || ''}
              @input=${this.onText}
            ></md-outlined-text-field>
            <select @change=${this.onGroup}>
              <option value="">Todos los grupos</option>
              ${this.groups.map(
                (g) =>
                  html`<option value="${g}" ?selected=${this.filters.group === g}>${g}</option>`,
              )}
            </select>
            <select @change=${this.onCategory}>
              <option value="">Todas las categorías</option>
              ${this.categories.map(
                (c) =>
                  html`<option value="${c}" ?selected=${this.filters.category === c}>${c}</option>`,
              )}
            </select>
            <select @change=${this.onStatus}>
              <option value="todos" ?selected=${this.filters.status === 'todos'}>Todos</option>
              <option value="comprado" ?selected=${this.filters.status === 'comprado'}>Comprado</option>
              <option value="no-comprado" ?selected=${
                this.filters.status === 'no-comprado'
              }>No comprado</option>
            </select>
          </div>`
        : this.renderSummary()}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'shopping-filters': ShoppingFiltersElement;
  }
}
