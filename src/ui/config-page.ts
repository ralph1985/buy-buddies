import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('config-page')
export class ConfigPage extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
    }

    h1 {
      margin: 0;
      font-size: 1.5rem;
    }
  `;

  render() {
    return html`<h1>Configuración</h1>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'config-page': ConfigPage;
  }
}
