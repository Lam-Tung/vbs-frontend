import {
  bindable,
  customElement,
  IEventAggregator,
  ILogger,
  resolve
} from "aurelia";
import { SEARCH_BAR_EVENT } from "~event/ea-events";
import { SEARCH_ICON } from "~resources/icons";

@customElement("search-bar-element")
export class SearchBarElement {
  // DI
  private readonly logger = resolve(ILogger).scopeTo('SearchBarElement');
  private readonly ea: IEventAggregator = resolve(IEventAggregator);
  // Properties
  @bindable query = "";
  // Icons
  searchIcon: string = SEARCH_ICON;

  constructor() {}

  onInput(value: string): void {
    this.query = value;
    this.logger.debug("Search query input:", value);
    this.ea.publish(SEARCH_BAR_EVENT, value);
  }
}
