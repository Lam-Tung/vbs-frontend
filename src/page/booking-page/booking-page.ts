import { IDisposable, IEventAggregator, resolve } from "aurelia";
import { BookingResourceService } from "~api/services/BookingResourceService";

export class BookingPage {
  // DI
  private readonly bookingResourceService: BookingResourceService = resolve(BookingResourceService);
  private readonly ea: IEventAggregator = resolve(IEventAggregator);
  // Properties
  disposables: IDisposable[] = [];

  constructor() {}

  async bound(): Promise<void> {
   
  }

  async attached(): Promise<void> {
  }

  async detached(): Promise<void> {
  }

  async unbinding(): Promise<void> {
    this.disposables.forEach((d: IDisposable) => d.dispose());
    this.disposables = [];
  }
}
