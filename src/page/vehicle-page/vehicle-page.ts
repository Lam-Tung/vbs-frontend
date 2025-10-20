import { IDisposable, IEventAggregator, resolve } from "aurelia";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import { VehicleDTO } from "~api/models/VehicleDTO";
import { VehicleResourceService } from "~api/services/VehicleResourceService";
import { SEARCH_BAR_EVENT } from "~event/ea-events";
export class VehiclePage {
  // DI
  private readonly ea: IEventAggregator = resolve(IEventAggregator);
  // Properties
  vehicles: VehicleDTO[] = [];
  vehicleTable: Tabulator | null = null;
  disposables: IDisposable[] = [];

  constructor() {}

  async bound(): Promise<void> {
    this.disposables.push(
      this.ea.subscribe(SEARCH_BAR_EVENT, async (query: string) => {
        await this.filterTable(query);
      })
    );
  }

  async attached(): Promise<void> {
    this.vehicles = await this.initVehicles();
    this.vehicleTable = await this.initTable();
  }

  async detached(): Promise<void> {
    await this.destroyTable();
  }

  async unbinding(): Promise<void> {
    this.disposables.forEach((d: IDisposable) => d.dispose());
    this.disposables = [];
  }

  /**
   * Fetches the list of vehicles from the API.
   * @returns A promise that resolves to an array of VehicleDTO objects.
   */
  private async initVehicles(): Promise<VehicleDTO[]> {
    try {
      const vehicles = VehicleResourceService.getVehicle();
      return vehicles;
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      return [];
    }
  }

  /**
   * Initializes the Tabulator table with vehicle data.
   * @returns A promise that resolves to the initialized Tabulator instance.
   */
  private async initTable(): Promise<Tabulator> {
    const vehicleTable = new Tabulator("#vehicle-table", {
      data: this.vehicles,
      layout: "fitColumns",
      columns: [
        { title: "Name", field: "name" },
        { title: "License plate", field: "licensePlate" },
        { title: "Manufacturer", field: "manufacturer" },
        { title: "Model", field: "model" },
      ],
      selectableRows: true,
      rowHeader: {
        formatter: "rowSelection",
        titleFormatter: "rowSelection",
        width: 40,
        headerSort: false,
        resizable: false,
        frozen: true,
        headerHozAlign: "center",
        hozAlign: "center",
      },
    });

    return vehicleTable;
  }

  /**
   * Destroys the Tabulator table instance.
   */
  private async destroyTable(): Promise<void> {
    if (this.vehicleTable) {
      this.vehicleTable.destroy();
      this.vehicleTable = null;
    }
  }

  /**
   * Filters the vehicle table based on the provided query.
   * @param query The search query to filter the table.
   */
  private async filterTable(query: string): Promise<void> {
    if (!query) {
      this.vehicleTable?.clearFilter();
      return;
    }

    const columns = this.vehicleTable.getColumns();
    const filters = columns.map((column) => {
      return { field: column.getField(), type: "like", value: query };
    });
    // Apply an OR filter across all columns
    this.vehicleTable.setFilter([filters]);
  }
}
