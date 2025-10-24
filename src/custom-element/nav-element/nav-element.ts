import { customElement, ILogger, resolve } from "aurelia";

@customElement("nav-element")
export class NavElement {
  // DI
  private readonly logger = resolve(ILogger).scopeTo('NavElement');
  // Properties
  activeLink = "";

  async binding() {
    const path = window.location.pathname.replace('/', '');
    this.activeLink = path || 'calendar';
    this.logger.debug('Restored active link:', this.activeLink);
  }

  async setActive(link: string) {
    this.activeLink = link;
    this.logger.debug("Active link set to:", link);
  }
}
