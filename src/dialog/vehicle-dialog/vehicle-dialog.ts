import {
  IDialogController,
  IDialogCustomElementViewModel,
} from "@aurelia/dialog";
import { ILogger, resolve } from "aurelia";
import { VehicleDTO } from "~api/models/VehicleDTO";
import { VehicleResourceService } from "~api/services/VehicleResourceService";
import { X_ICON } from "~resources/icons";

export class VehicleDialog implements IDialogCustomElementViewModel {
  // DI
  private readonly logger = resolve(ILogger).scopeTo("VehicleDialog");
  private readonly vehicleResourceService: VehicleResourceService = resolve(
    VehicleResourceService
  );
  // Properties
  $dialog: IDialogController;
  vehicleDTO: VehicleDTO | null = null;
  // Icons
  xIcon: string = X_ICON;

  async activate(model: VehicleDTO) {
    this.vehicleDTO = model ?? {
      id: null,
      licensePlate: "",
      name: "",
      manufacturer: "",
      model: "",
    };
    this.logger.debug("Activated with model:", model);
  }

  async positiveClicked(): Promise<void> {
    this.logger.debug("Positive clicked, returning:", this.vehicleDTO);
    this.$dialog.ok(this.vehicleDTO);
  }

  async negativeClicked(): Promise<void> {
    this.logger.debug("Negative clicked, cancelling dialog.");
    this.$dialog.cancel();
  }

  async closeClicked(): Promise<void> {
    this.logger.debug("Close clicked, cancelling dialog.");
    this.$dialog.cancel();
  }
}
