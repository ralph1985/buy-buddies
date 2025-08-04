import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Router } from '@vaadin/router';
import '@material/web/textfield/outlined-text-field.js';
import { t, getLang, setLang, LangController, type Lang } from './i18n.js';

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

  @state()
  private googleSheetId = '';

  @state()
  private language: Lang = getLang();

  private lang = new LangController(this);

  connectedCallback() {
    super.connectedCallback();
    this.googleSheetId = localStorage.getItem('googleSheetId') ?? '';
    this.language = getLang();
  }

  private onInput(e: Event) {
    this.googleSheetId = (e.target as HTMLInputElement).value;
    localStorage.setItem('googleSheetId', this.googleSheetId);
  }

  private goHome() {
    Router.go('/');
  }

  private onLangChange(e: Event) {
    const lang = (e.target as HTMLSelectElement).value as Lang;
    setLang(lang);
    this.language = lang;
  }

  render() {
    return html`
      <h1>${t('config')}</h1>
      <md-outlined-text-field
        .label=${t('sheetId')}
        .value=${this.googleSheetId}
        @input=${this.onInput}
      ></md-outlined-text-field>
      <div>
        <label>${t('language')}:</label>
        <select @change=${this.onLangChange} .value=${this.language}>
          <option value="es">Español</option>
          <option value="en">English</option>
        </select>
      </div>
      <button @click=${this.goHome}>${t('back')}</button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'config-page': ConfigPage;
  }
}
