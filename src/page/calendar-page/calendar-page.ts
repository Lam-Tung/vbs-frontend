import { Calendar, DateSelectArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import scrollgridPlugin from "@fullcalendar/scrollgrid";
import timegridPlugin from "@fullcalendar/timegrid";
import { BookingResourceService, UserResourceService } from "../../api";
import { EventAggregator, IDisposable, IEventAggregator, resolve } from "aurelia";
import { E } from "@fullcalendar/core/internal-common";
import { SEARCH_BAR_EVENT } from "../../ea-events";

export class CalendarPage {
  // DI
  private readonly bookingResourceService: BookingResourceService = resolve(
    BookingResourceService
  );
  private readonly ea: IEventAggregator = resolve(IEventAggregator);
  // Properties
  calendarEl: HTMLElement | null = null;
  calendar: Calendar | null = null;
  disposables: IDisposable[] = [];

  constructor() {}

  async bound(): Promise<void> {
   
  }

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

  /**
   * Initialize the FullCalendar instance.
   */
  private async initCalendar(): Promise<void> {
    this.calendarEl = document.getElementById("vbs-calendar");
    if (!this.calendarEl) {
      console.error("Calendar element not found");
      return;
    }
    this.calendar = new Calendar(this.calendarEl, {
      plugins: [
        dayGridPlugin,
        interactionPlugin,
        scrollgridPlugin,
        listPlugin,
        timegridPlugin,
      ],
      initialView: "timeGridWeek",
      height: "auto",
      selectable: true,
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "timeGridWeek,timeGridDay",
      },
      events: [],
    });

    this.calendar.render();
    await this.initCalendarHandlers();
  }

  /**
   * Cleanup the FullCalendar instance including all handlers.
   */
  private async destroyCalendar(): Promise<void> {
    if (this.calendar) {
      this.calendar.destroy();
      this.calendar = null;
    }
  }

  /**
   * Initialize calendar event handlers.
   */
  private async initCalendarHandlers(): Promise<void> {
    if (!this.calendar) {
      console.error("Calendar not initialized");
      return;
    }
    // drag timeframe to create an event
    this.calendar.on("select", async (info: DateSelectArg): Promise<void> => {
      console.log(`Selected from ${info.start} to ${info.end}`);
      // Example: Create an event for the selected range
      // this.calendar.addEvent({
      //   title: "New Event",
      //   start: info.start,
      //   end: info.end,
      //   allDay: info.allDay,
      // });
    });
  }
}
