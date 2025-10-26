import { IDialogController } from "@aurelia/dialog";
import { customElement, ILogger, resolve } from "aurelia";
import { IConfirmDialog } from "src/interface/i-confirm-dialog";
import { X_ICON } from "~resources/icons";

@customElement("confirm-dialog")
export class ConfirmDialog {
  // DI
  private readonly logger = resolve(ILogger).scopeTo("ConfirmDialog");
  // Properties
  $dialog: IDialogController;
  data: IConfirmDialog = {
    title: "Confirm action",
    message: "Are you sure you want to proceed?",
  };

  // Icons
  xIcon: string = X_ICON;

  async activate(model: IConfirmDialog): Promise<void> {
    this.data = model;
    this.logger.debug("Activated with model:", model);
  }

  async positiveClicked(): Promise<void> {
    this.logger.debug("Positive clicked, returning");
    this.$dialog.ok();
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
