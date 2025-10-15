import { Calendar, DateSelectArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import scrollgridPlugin from "@fullcalendar/scrollgrid";
import timegridPlugin from "@fullcalendar/timegrid";

export class CalendarPage {
  calendarEl: HTMLElement | null = null;
  calendar: Calendar | null = null;

  constructor() {}

  async attached() {
    await this.initCalendar();
  }

  async detached(): Promise<void> {
    await this.destroyCalendar();
  }

  /**
   * Initialize the FullCalendar instance.
   */
  async initCalendar(): Promise<void> {
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
        right: "dayGridMonth,dayGridWeek,dayGridDay",
      },
      events: [],
    });

    this.calendar.render();
    await this.initCalendarHandlers();
  }

  /**
   * Cleanup the FullCalendar instance including all handlersnpm i.
   */
  async destroyCalendar(): Promise<void> {
    if (this.calendar) {
      this.calendar.destroy();
      this.calendar = null;
    }
  }

  async initCalendarHandlers(): Promise<void> {
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
