import { bindable, customElement, resolve } from "aurelia";
import { DELETE_BUTTON_CLICKED } from "~event/custom-events";

@customElement("delete-button")
export class DeleteButton {
  // DI
  private readonly element = resolve(Element);
  // Properties
  @bindable() label: string = "Delete";
  @bindable() icon: string = null;

  onClick() {
    this.element.dispatchEvent(
      new CustomEvent(DELETE_BUTTON_CLICKED, { bubbles: true })
    );
  }
}
