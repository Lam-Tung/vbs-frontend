import { IDialogController, IDialogCustomElementViewModel } from "@aurelia/dialog";
import { ILogger, resolve } from "aurelia";
import { VehicleDTO } from "~api/models/VehicleDTO";
import { VehicleResourceService } from "~api/services/VehicleResourceService";

export class VehicleDialog implements IDialogCustomElementViewModel{
    // DI
    private readonly logger = resolve(ILogger).scopeTo('VehicleDialog');
    private readonly vehicleResourceService: VehicleResourceService = resolve(VehicleResourceService);
    // Properties
    $dialog: IDialogController;
    vehicleDTO: VehicleDTO | null = null;

    async activate(model: VehicleDTO) {
        this.vehicleDTO = model;
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
}