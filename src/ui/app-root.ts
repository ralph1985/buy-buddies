import '@material/web/iconbutton/icon-button.js';
import '@material/web/labs/navigationdrawer/navigation-drawer.js';
import '@material/web/list/list.js';
import '@material/web/list/list-item.js';
import './shopping-list.js';
import './config-page.js';
import { i18n } from '../main.js';

import { Router } from '@vaadin/router';
import { css, html, LitElement } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { loadProducts } from '../domain/services/productsService.js';
import './components/app-header.js';

@customElement('app-root')
export class AppRoot extends LitElement {
  static override styles = css`
    .top-bar {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 16px;
      background-color: #ffcdd2;
    }

    .title {
      font-size: 1.25rem;
    }

    main {
      padding: 16px;
      padding-bottom: 64px;
      background-color: #c8e6c9;
    }

    md-navigation-drawer {
      background-color: #bbdefb;
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      z-index: 1000;
    }

    .drawer-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px;
    }

    .top-bar md-icon-button,
    .drawer-header md-icon-button {
      --md-icon-button-icon-color: black;
    }

    footer {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 8px 16px;
      background-color: #eeeeee;
      box-sizing: border-box;
    }
  `;

  @query('md-navigation-drawer')
  private drawer!: HTMLElement & { opened: boolean };

  private router!: Router;

  @state()
  private products: unknown[] = [];

  @state()
  private isMockData = false;

  private _unsub?: () => void;

  private get viteEnv(): string {
    return import.meta.env.VITE_ENV ?? '';
  }

  private get bugsnagKey(): string {
    return import.meta.env.VITE_BUGSNAG_KEY ?? '';
  }

  override async firstUpdated() {
    this.router = new Router(this.shadowRoot!.getElementById('outlet') as HTMLElement);
    this.router.setRoutes([
      { path: '/', component: 'shopping-list' },
      { path: '/config', component: 'config-page' },
    ]);

    const { items, isMockData } = await loadProducts();
    this.products = items;
    this.isMockData = isMockData;
  }

  override connectedCallback() {
    super.connectedCallback();
    // Re-render menu items whenever the selected language changes
    this._unsub = i18n.subscribe(() => this.requestUpdate());
  }

  override disconnectedCallback() {
    this._unsub?.();
    super.disconnectedCallback();
  }

  private toggleDrawer = () => {
    this.drawer.opened = !this.drawer.opened;
  };

  private navigate(path: string) {
    Router.go(path);
    this.drawer.opened = false;
  }

  override render() {
    return html`
      <app-header .isMockData=${this.isMockData}>
        <div class="top-bar">
          <md-icon-button data-test-id="drawer-toggle" @click=${this.toggleDrawer}>
            <svg slot="icon" viewBox="0 0 24 24">
              <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"></path>
            </svg>
          </md-icon-button>
          <div class="title">Buy Buddies</div>
        </div>
      </app-header>

      <md-navigation-drawer type="modal">
        <div class="drawer-header">
          <div class="title">Menú</div>
          <md-icon-button @click=${this.toggleDrawer}>
            <svg slot="icon" viewBox="0 0 24 24">
              <path
                d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
              ></path>
            </svg>
          </md-icon-button>
        </div>
        <md-list>
          <md-list-item
            data-test-id="menu-item-home"
            @click=${() => this.navigate('/')}
            >${i18n.t('menu.home')}</md-list-item
          >
          <md-list-item data-test-id="menu-item-products"
            >${i18n.t('menu.products')}</md-list-item
          >
          <md-list-item
            data-test-id="menu-item-list"
            @click=${() => this.navigate('/')}
            >${i18n.t('menu.list')}</md-list-item
          >
          <md-list-item data-test-id="menu-item-groups"
            >${i18n.t('menu.groups')}</md-list-item
          >
          <md-list-item
            data-test-id="menu-item-settings"
            @click=${() => this.navigate('/config')}
            >${i18n.t('menu.settings')}</md-list-item
          >
        </md-list>
      </md-navigation-drawer>

      <main>
        <div id="outlet"></div>
      </main>

      <footer>Env: ${this.viteEnv} | Bugsnag: ${this.bugsnagKey}</footer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-root': AppRoot;
  }
}
