import { bindable, customElement, resolve } from "aurelia";
import { NEGATIVE_BUTTON_CLICKED } from "~event/custom-events";

@customElement("negative-button")
export class NegativeButton {
  // DI
  private readonly element = resolve(Element);
  // Properties
  @bindable() label = "Cancel";

  handleClick() {
    this.element.dispatchEvent(
      new CustomEvent(NEGATIVE_BUTTON_CLICKED, { bubbles: true })
    );
  }
}
