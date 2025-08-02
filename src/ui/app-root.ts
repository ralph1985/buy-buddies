import { LitElement, html, css } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { Router } from '@vaadin/router';
import '@material/web/iconbutton/icon-button.js';
import '@material/web/labs/navigationdrawer/navigation-drawer.js';
import '@material/web/list/list.js';
import '@material/web/list/list-item.js';
import './shopping-list.js';
import './config-page.js';

@customElement('app-root')
export class AppRoot extends LitElement {
  static styles = css`
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

  private get viteEnv(): string {
    return import.meta.env.VITE_ENV ?? '';
  }

  firstUpdated() {
    this.router = new Router(
      this.shadowRoot!.getElementById('outlet') as HTMLElement,
    );
    this.router.setRoutes([
      { path: '/', component: 'shopping-list' },
      { path: '/config', component: 'config-page' },
    ]);
  }

  private toggleDrawer = () => {
    this.drawer.opened = !this.drawer.opened;
  };

  private navigate(path: string) {
    Router.go(path);
    this.drawer.opened = false;
  }

  render() {
    return html`
      <header class="top-bar">
        <md-icon-button @click=${this.toggleDrawer}>
          <svg slot="icon" viewBox="0 0 24 24">
            <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"></path>
          </svg>
        </md-icon-button>
        <div class="title">Buy Buddies</div>
      </header>

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
          <md-list-item @click=${() => this.navigate('/')}>Lista</md-list-item>
          <md-list-item @click=${() => this.navigate('/config')}>Configuración</md-list-item>
        </md-list>
      </md-navigation-drawer>

      <main>
        <div id="outlet"></div>
      </main>

      <footer>Env: ${this.viteEnv}</footer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-root': AppRoot;
  }
}
