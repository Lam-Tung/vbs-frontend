import { bindable, customElement, IEventAggregator, resolve } from "aurelia";
import { SEARCH_BAR_EVENT } from "../../ea-events";
import { SEARCH_ICON } from "../../icons";

@customElement("search-bar-element")
export class SearchBarElement {
  // DI
  private readonly ea: IEventAggregator = resolve(IEventAggregator);
  // Properties
  @bindable query = "";
  // Icons
  searchIcon: string = SEARCH_ICON;

  constructor() {}

  onInput(value: string): void {
    this.query = value;
    this.ea.publish(SEARCH_BAR_EVENT, value);
  }
}
