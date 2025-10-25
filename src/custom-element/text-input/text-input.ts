import { bindable, BindingMode, customElement } from "aurelia";

@customElement("text-input")
export class TextInput {
  // Properties
  @bindable label: string = "";
  @bindable({ mode: BindingMode.twoWay }) value: string = "";
}
