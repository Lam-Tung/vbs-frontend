import { DayPilot } from "@daypilot/daypilot-lite-javascript";
import { IDisposable, IEventAggregator, resolve } from "aurelia";
import { BookingResourceService } from "~api/services/BookingResourceService";

export class BookingPage {
  // DI
  private readonly bookingResourceService: BookingResourceService = resolve(
    BookingResourceService
  );
  private readonly ea: IEventAggregator = resolve(IEventAggregator);
  // Properties
  disposables: IDisposable[] = [];
  eventCalendar: DayPilot.Calendar | null = null;

  constructor() {}

  async attached(): Promise<void> {
    await this.initCalendar();
  }

  async detached(): Promise<void> {
    await this.destroyCalendar();
  }

  async unbinding(): Promise<void> {
    this.disposables.forEach((d: IDisposable) => d.dispose());
    this.disposables = [];
  }

  private async initCalendar(): Promise<void> {
    this.eventCalendar = new DayPilot.Calendar("event-calendar", {
      viewType: "Week",
      startDate: DayPilot.Date.today(),
      timeFormat: "Clock24Hours",
    });
    this.eventCalendar.init();
    await this.initCalendarHandlers();
  }

  private async destroyCalendar(): Promise<void> {
    if (this.eventCalendar) {
      this.eventCalendar.dispose();
      this.eventCalendar = null;
    }
  }

  private async initCalendarHandlers(): Promise<void> {
    await this.initOnTimeRangeSelected();
  }

  private async initOnTimeRangeSelected(): Promise<void> {
    if (!this.eventCalendar) return;
    this.eventCalendar.onTimeRangeSelected = async (args: DayPilot.CalendarTimeRangeSelectedArgs) => {
      alert(
        `Selected from ${args.start.toString()} to ${args.end.toString()}`
      );
      this.eventCalendar.clearSelection();
    };
  }
}
