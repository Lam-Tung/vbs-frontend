import { bindable, customElement, resolve } from "aurelia";
import { POSITIVE_BUTTON_CLICKED } from "~event/custom-events";

@customElement("positive-button")
export class PositiveButton {
  // DI
  private readonly element = resolve(Element);
  // Properties
  @bindable() label = "OK";

  onClick() {
    this.element.dispatchEvent(new CustomEvent(POSITIVE_BUTTON_CLICKED, { bubbles: true }));
  }
}
