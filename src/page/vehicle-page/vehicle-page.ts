import { DialogCloseResult, IDialogService } from "@aurelia/dialog";
import { IDisposable, IEventAggregator, ILogger, resolve } from "aurelia";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import { VehicleDTO } from "~api/models/VehicleDTO";
import { VehicleResourceService } from "~api/services/VehicleResourceService";
import { VehicleDialog } from "~dialog/vehicle-dialog/vehicle-dialog";
import { SEARCH_BAR_EVENT } from "~event/ea-events";
import { ADD_ICON, DELETE_ICON, EDIT_ICON } from "~resources/icons";

export class VehiclePage {
  // DI
  private readonly logger = resolve(ILogger).scopeTo("VehiclePage");
  private readonly ea: IEventAggregator = resolve(IEventAggregator);
  private readonly dialogService: IDialogService = resolve(IDialogService);
  // Properties
  vehicles: VehicleDTO[] = [];
  selectedVehicle: VehicleDTO | null = null;
  vehicleTable: Tabulator | null = null;
  disposables: IDisposable[] = [];
  // Icons
  addIcon: string = ADD_ICON;
  editIcon: string = EDIT_ICON;
  deleteIcon: string = DELETE_ICON;

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
      initialSort: [{ column: "name", dir: "asc" }],
      selectableRows: 1,
    });

    // Listen to selection events
    vehicleTable.on("rowSelected", (row: { getData: () => VehicleDTO }) => {
      this.selectedVehicle = row.getData();
      this.logger.debug("Selected vehicle:", this.selectedVehicle);
    });
    vehicleTable.on("rowDeselected", () => {
      this.selectedVehicle = null;
      this.logger.debug("Deselected vehicle");
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

  /**
   * Adds a new vehicle by opening a dialog and persisting the result.
   * @returns void
   */
  async addVehicle(): Promise<void> {
    this.logger.debug("Add vehicle triggered");
    const { dialog } = await this.dialogService.open({
      component: () => VehicleDialog,
    });
    const result: DialogCloseResult = await dialog.closed;

    if (result.status !== "ok") return;
    if (!result.value) return;
    this.logger.debug("Dialog returned vehicle:", result.value);
    // Persist the new vehicle via the API
    const newVehicleDTO: VehicleDTO = result.value as VehicleDTO;
    await VehicleResourceService.postVehicle(newVehicleDTO);
    // Add the new vehicle to the list and table
    this.vehicles.push(newVehicleDTO);
    this.vehicleTable?.addData([newVehicleDTO]);
  }

  /**
   * Edits the selected vehicle by opening a dialog and persisting the changes.
   * @returns void
   */
  async editVehicle(): Promise<void> {
    this.logger.debug("Edit vehicle triggered");
    if (!this.selectedVehicle) return;
    const { dialog } = await this.dialogService.open({
      component: () => VehicleDialog,
      model: this.selectedVehicle,
    });
    const result: DialogCloseResult = await dialog.closed;
    if (result.status !== "ok" || !result.value) return;
    // Persist the updated vehicle via the API
    const updatedVehicle: VehicleDTO = result.value as VehicleDTO;
    await VehicleResourceService.putVehicle(updatedVehicle);
    // Update vehicle in list and table
    const idx = this.vehicles.findIndex(
      (v: VehicleDTO) => v.id === updatedVehicle.id
    );
    if (idx !== -1) {
      this.vehicles[idx] = updatedVehicle;
      this.vehicleTable?.updateData([updatedVehicle]);
    }
  }

  async deleteVehicle(): Promise<void> {
    this.logger.debug("Delete vehicle triggered");
    if (!this.selectedVehicle) return;
    // Delete vehicle via API
    await VehicleResourceService.deleteVehicle(this.selectedVehicle);
    // Remove vehicle from list and table
    this.vehicles = this.vehicles.filter(
      (v: VehicleDTO) => v.id !== this.selectedVehicle?.id
    );
    this.vehicleTable?.deleteRow(this.selectedVehicle.id);
    this.selectedVehicle = null;
  }
}
