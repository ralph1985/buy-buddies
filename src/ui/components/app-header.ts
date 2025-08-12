import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('app-header')
export class AppHeader extends LitElement {
  @property({ type: Boolean }) isMockData = false;

  static override styles = css`
    :host {
      display: block;
    }
    .mock-banner {
      padding: 8px 12px;
      border-radius: 8px;
      margin-bottom: 8px;
      background: #fff3cd; /* amarillito aviso, no crítico */
      color: #664d03;
      font-weight: 600;
    }
  `;

  override render() {
    return html`
      ${this.isMockData
        ? html`
            <div
              class="mock-banner"
              role="status"
              aria-label="Aviso: usando datos de prueba"
              data-test-id="mock-banner"
            >
              ⚠ Datos de prueba activos
            </div>
          `
        : null}
      <header>
        <slot></slot>
      </header>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-header': AppHeader;
  }
}
