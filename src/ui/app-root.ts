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
    }

    .title {
      font-size: 1.25rem;
    }

    main {
      padding: 16px;
    }
  `;

  @query('md-navigation-drawer')
  private drawer!: HTMLElement & { open: boolean };

  private router!: Router;

  firstUpdated() {
    this.router = new Router(
      this.shadowRoot!.getElementById('outlet') as HTMLElement,
    );
    this.router.setRoutes([
      { path: '/', component: 'shopping-list' },
      { path: '/config', component: 'config-page' },
    ]);
  }

  private openDrawer() {
    this.drawer.open = true;
  }

  private navigate(path: string) {
    Router.go(path);
    this.drawer.open = false;
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
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-root': AppRoot;
  }
}
