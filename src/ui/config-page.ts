import '@material/web/textfield/outlined-text-field.js';

import { Router } from '@vaadin/router';
import { css,html, LitElement } from 'lit';
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
  private googleSheetId = '';

  override connectedCallback() {
    super.connectedCallback();
    this.googleSheetId = localStorage.getItem('googleSheetId') ?? '';
  }

  private onInput(e: Event) {
    this.googleSheetId = (e.target as HTMLInputElement).value;
    localStorage.setItem('googleSheetId', this.googleSheetId);
  }

  private goHome() {
    Router.go('/');
  }

  override render() {
    return html`
      <h1>Configuración</h1>
      <md-outlined-text-field
        label="Google Sheet ID"
        .value=${this.googleSheetId}
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
