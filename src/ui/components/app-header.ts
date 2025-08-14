import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { i18n } from '../../main.js';
import type { Lang } from '../../domain/i18n/types.js';
import '@material/web/iconbutton/icon-button.js';

@customElement('app-header')
export class AppHeader extends LitElement {
  @property({ type: Boolean }) isMockData = false;

  private _unsub?: () => void;

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
    header {
      display: flex;
      align-items: center;
    }
    ::slotted(*) {
      flex: 1;
    }
  `;

  override connectedCallback() {
    super.connectedCallback();
    this._unsub = i18n.subscribe(() => this.requestUpdate());
  }

  override disconnectedCallback() {
    this._unsub?.();
    super.disconnectedCallback();
  }

  override render() {
    const flag = i18n.getLang() === 'es' ? '🇪🇸' : '🇬🇧';
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
        <md-icon-button
          data-test-id="lang-toggle"
          aria-label="${
            i18n.getLang() === 'es' ? 'Cambiar a inglés' : 'Switch to Spanish'
          }"
          title="${i18n.getLang() === 'es' ? 'Cambiar a inglés' : 'Switch to Spanish'}"
          @click=${this.onToggleLang}
        >
          <span slot="icon">${flag}</span>
        </md-icon-button>
      </header>
    `;
  }

  private onToggleLang = () => {
    const next: Lang = i18n.getLang() === 'es' ? 'en' : 'es';
    i18n.setLang(next);
    this.dispatchEvent(
      new CustomEvent('lang-changed', {
        detail: { lang: next },
        bubbles: true,
        composed: true,
      }),
    );
    this.requestUpdate();
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'app-header': AppHeader;
  }
}
