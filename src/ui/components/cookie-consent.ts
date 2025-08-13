import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/checkbox/checkbox.js';
import '@material/web/dialog/dialog.js';

import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { type CookieConsent, getConsent, saveConsent } from '../../domain/privacy/cookieConsent.js';

@customElement('cookie-consent')
export class CookieConsentElement extends LitElement {
  static override styles = css`
    :host {
      position: fixed;
      inset-inline: 0;
      bottom: 0;
      z-index: 2000;
      display: block;
    }
    .banner {
      margin: 12px;
      padding: 12px 16px;
      border-radius: 12px;
      background: #fff;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
      display: flex;
      gap: 12px;
      align-items: start;
    }
    .text {
      flex: 1;
    }
    .actions {
      display: flex;
      gap: 8px;
    }
    .hidden {
      display: none;
    }
    .title {
      font-weight: 600;
      margin-bottom: 4px;
    }
  `;

  @state() private open = false;
  @state() private showBanner = false;
  @state() private analytics = false;
  @state() private marketing = false;

  override connectedCallback(): void {
    super.connectedCallback();
    const consent = getConsent();
    this.showBanner = !consent;
    if (consent) {
      this.analytics = consent.analytics;
      this.marketing = consent.marketing;
    }
  }

  private acceptAll = () => {
    this.persist({ necessary: true, analytics: true, marketing: true, timestamp: Date.now() });
  };

  private rejectOptional = () => {
    this.persist({ necessary: true, analytics: false, marketing: false, timestamp: Date.now() });
  };

  private openConfig = () => {
    this.open = true;
  };
  private closeConfig = () => {
    this.open = false;
  };

  private saveConfig = () => {
    this.persist({ necessary: true, analytics: this.analytics, marketing: this.marketing, timestamp: Date.now() });
    this.closeConfig();
  };

  private persist(consent: CookieConsent) {
    saveConsent(consent);
    this.showBanner = false;
    this.dispatchEvent(new CustomEvent('consent-changed', { detail: consent, bubbles: true, composed: true }));
  }

  override render() {
    return html`
      <div
        class=${this.showBanner ? 'banner' : 'banner hidden'}
        role="region"
        aria-label="Aviso de cookies"
        data-test-id="cookie-banner"
      >
        <div class="text">
          <div class="title">🍪 Este sitio utiliza cookies</div>
          <div>
            Usamos cookies necesarias para que la web funcione y opcionales (analíticas/marketing) para mejorar la
            experiencia. Puedes aceptarlas todas o configurarlas.
          </div>
        </div>
        <div class="actions">
          <md-outlined-button data-test-id="btn-config" @click=${this.openConfig}>Configurar</md-outlined-button>
          <md-outlined-button data-test-id="btn-reject" @click=${this.rejectOptional}
            >Rechazar opcionales</md-outlined-button
          >
          <md-filled-button data-test-id="btn-accept-all" @click=${this.acceptAll}>Aceptar todas</md-filled-button>
        </div>
      </div>

      <md-dialog ?open=${this.open} role="dialog" aria-label="Configurar cookies" @closed=${this.closeConfig}>
        <div slot="headline">Preferencias de cookies</div>
        <div slot="content">
          <p><strong>Necesarias</strong>: siempre activas (imprescindibles).</p>
          <md-checkbox checked disabled aria-label="Cookies necesarias">Necesarias</md-checkbox>

          <md-checkbox
            .checked=${this.analytics}
            @change=${(e: Event) => (this.analytics = (e.target as HTMLInputElement).checked)}
            data-test-id="chk-analytics"
            aria-label="Cookies analíticas"
            >Analíticas</md-checkbox
          >

          <md-checkbox
            .checked=${this.marketing}
            @change=${(e: Event) => (this.marketing = (e.target as HTMLInputElement).checked)}
            data-test-id="chk-marketing"
            aria-label="Cookies de marketing"
            >Marketing</md-checkbox
          >
        </div>
        <div slot="actions">
          <md-outlined-button @click=${this.closeConfig}>Cancelar</md-outlined-button>
          <md-filled-button data-test-id="btn-save-config" @click=${this.saveConfig}>Guardar</md-filled-button>
        </div>
      </md-dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cookie-consent': CookieConsentElement;
  }
}
