import '@material/web/textfield/outlined-text-field.js';

import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import type { ShoppingFilters } from '../../core/shopping/use-cases/filter-shopping-items.js';

@customElement('shopping-filters')
export class ShoppingFiltersElement extends LitElement {
  static override styles = css`
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
    const next: Partial<ShoppingFilters> = {};
    if (value !== undefined) next.text = value;
    this.updateFilters(next);
  };

  private onGroup = (e: Event) => {
    const value = (e.target as HTMLSelectElement).value;
    const next: Partial<ShoppingFilters> = {};
    if (value !== undefined) next.group = value;
    this.updateFilters(next);
  };

  private onCategory = (e: Event) => {
    const value = (e.target as HTMLSelectElement).value;
    const next: Partial<ShoppingFilters> = {};
    if (value !== undefined) next.category = value;
    this.updateFilters(next);
  };

  private onStatus = (e: Event) => {
    const maybeStatus = (e.target as HTMLSelectElement).value as ShoppingFilters['status'] | undefined;
    const next: Partial<ShoppingFilters> = {};
    if (maybeStatus !== undefined) next.status = maybeStatus;
    this.updateFilters(next);
  };

  private renderSummary() {
    const parts: string[] = [];
    if (this.filters.text) parts.push(`Texto: ${this.filters.text}`);
    if (this.filters.group) parts.push(`Grupo: ${this.filters.group}`);
    if (this.filters.category) parts.push(`Categoría: ${this.filters.category}`);
    if (this.filters.status && this.filters.status !== 'todos') {
      parts.push(`Estado: ${this.filters.status === 'comprado' ? 'Comprado' : 'No comprado'}`);
    }
    return parts.length ? html`<div class="summary">Filtros: ${parts.join(', ')}</div>` : html``;
  }

  override render() {
    return html`
      <button data-test-id="filters-toggle-btn" @click=${this.toggle}>${
        this.open ? 'Ocultar filtros' : 'Mostrar filtros'
      }</button>
      ${this.open
        ? html`<div class="box">
            <md-outlined-text-field
              data-test-id="filter-text"
              label="Buscar"
              .value=${this.filters.text || ''}
              @input=${this.onText}
            ></md-outlined-text-field>
            <select data-test-id="filter-group" @change=${this.onGroup}>
              <option value="">Todos los grupos</option>
              ${this.groups.map(
                (g) => html`<option value="${g}" ?selected=${this.filters.group === g}>${g}</option>`,
              )}
            </select>
            <select data-test-id="filter-category" @change=${this.onCategory}>
              <option value="">Todas las categorías</option>
              ${this.categories.map(
                (c) => html`<option value="${c}" ?selected=${this.filters.category === c}>${c}</option>`,
              )}
            </select>
            <select data-test-id="filter-status" @change=${this.onStatus}>
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
