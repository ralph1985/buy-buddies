import '@material/web/checkbox/checkbox.js';
import '@material/web/textfield/outlined-text-field.js';

import { Router } from '@vaadin/router';
import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { getConsent, saveConsent } from '../domain/privacy/cookieConsent.js';

@customElement('config-page')
export class ConfigPage extends LitElement {
  static override styles = css`
    :host {
      display: block;
      padding: 16px;
      background-color: #e1bee7;
    }

    h1 {
      margin: 0;
      font-size: 1.5rem;
    }

    h2 {
      margin: 16px 0 8px;
      font-size: 1.2rem;
    }
  `;

  @state()
  private googleSheetID = '';

  @state()
  private analytics = false;

  @state()
  private marketing = false;

  override connectedCallback() {
    super.connectedCallback();
    this.googleSheetID = localStorage.getItem('googleSheetID') ?? '';
    const consent = getConsent();
    if (consent) {
      this.analytics = consent.analytics;
      this.marketing = consent.marketing;
    }
  }

  private onInput(e: Event) {
    this.googleSheetID = (e.target as HTMLInputElement).value;
    localStorage.setItem('googleSheetID', this.googleSheetID);
  }

  private goHome() {
    Router.go('/');
  }

  private updateConsent() {
    saveConsent({
      necessary: true,
      analytics: this.analytics,
      marketing: this.marketing,
      timestamp: Date.now(),
    });
  }

  private onAnalyticsChange(e: Event) {
    this.analytics = (e.target as HTMLInputElement).checked;
    this.updateConsent();
  }

  private onMarketingChange(e: Event) {
    this.marketing = (e.target as HTMLInputElement).checked;
    this.updateConsent();
  }

  override render() {
    return html`
      <h1>Configuración</h1>
      <md-outlined-text-field
        label="Google Sheet ID"
        .value=${this.googleSheetID}
        @input=${this.onInput}
      ></md-outlined-text-field>
      <section aria-labelledby="cookie-settings" data-test-id="cookie-section">
        <h2 id="cookie-settings">Cookies</h2>
        <div>
          <md-checkbox
            name="analytics"
            aria-label="Cookies analíticas"
            .checked=${this.analytics}
            @change=${this.onAnalyticsChange}
            data-test-id="config-analytics"
            >Cookies analíticas</md-checkbox
          >
        </div>
        <div>
          <md-checkbox
            name="marketing"
            aria-label="Cookies de marketing"
            .checked=${this.marketing}
            @change=${this.onMarketingChange}
            data-test-id="config-marketing"
            >Cookies de marketing</md-checkbox
          >
        </div>
      </section>
      <button @click=${this.goHome}>Volver</button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'config-page': ConfigPage;
  }
}
