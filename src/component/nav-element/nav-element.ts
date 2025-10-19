import { customElement } from "aurelia";

@customElement("nav-element")
export class NavElement {
  // Properties
  activeLink = "calendar"; // default active link

  setActive(link: string) {
    this.activeLink = link;
  }
}
