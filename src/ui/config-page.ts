import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Router } from '@vaadin/router';

@customElement('config-page')
export class ConfigPage extends LitElement {
  static styles = css`
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

  private goHome() {
    Router.go('/');
  }

  render() {
    return html`<h1>Configuración</h1><button @click=${this.goHome}>Volver</button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'config-page': ConfigPage;
  }
}
