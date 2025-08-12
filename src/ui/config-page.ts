import '@material/web/textfield/outlined-text-field.js';

import { Router } from '@vaadin/router';
import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

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
  `;

  @state()
  private googleSheetID = '';

  override connectedCallback() {
    super.connectedCallback();
    this.googleSheetID = localStorage.getItem('googleSheetID') ?? '';
  }

  private onInput(e: Event) {
    this.googleSheetID = (e.target as HTMLInputElement).value;
    localStorage.setItem('googleSheetID', this.googleSheetID);
  }

  private goHome() {
    Router.go('/');
  }

  override render() {
    return html`
      <h1>Configuración</h1>
      <md-outlined-text-field
        label="Google Sheet ID"
        .value=${this.googleSheetID}
        @input=${this.onInput}
      ></md-outlined-text-field>
      <button @click=${this.goHome}>Volver</button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'config-page': ConfigPage;
  }
}
