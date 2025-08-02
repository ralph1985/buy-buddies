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

  private openDrawer = () => {
    this.drawer.opened = true;
  };

  private navigate(path: string) {
    Router.go(path);
    this.drawer.opened = false;
  }

  render() {
    return html`
      <header class="top-bar">
        <md-icon-button @click=${this.openDrawer}>
          <svg slot="icon" viewBox="0 0 24 24">
            <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"></path>
          </svg>
        </md-icon-button>
        <div class="title">Buy Buddies</div>
      </header>

      <md-navigation-drawer type="modal">
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
