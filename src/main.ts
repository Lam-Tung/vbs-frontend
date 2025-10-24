import { DialogConfigurationStandard } from "@aurelia/dialog";
import { RouterConfiguration } from "@aurelia/router";
import "@fortawesome/fontawesome-free/css/all.css";
import Aurelia, { ConsoleSink, LoggerConfiguration, LogLevel } from "aurelia";
import { OpenAPI } from "./api";
import { MyApp } from "./my-app";
import * as customElements from "./resources/custom-elements";

OpenAPI.BASE = import.meta.env.VITE_API_URL;

export const dialogSettings = (settings) => {
  // Global service settings
  settings.rejectOnCancel = false;
  // Global Standard renderer options
  settings.options.modal = true; // Always open as modal by default
  settings.options.show = (dom) => {
    // Custom show animation for all dialogs
    return dom.root.animate(
      [
        { transform: "scale(0.8)", opacity: 0 },
        { transform: "scale(1)", opacity: 1 },
      ],
      { duration: 200 }
    ).finished;
  };
  settings.options.hide = (dom) => {
    // Custom hide animation for all dialogs
    return dom.root.animate(
      [
        { transform: "scale(1)", opacity: 1 },
        { transform: "scale(0.8)", opacity: 0 },
      ],
      { duration: 200 }
    ).finished;
  };
  settings.options.overlayStyle = "background: rgba(0, 0, 0, 0.6)";
};

Aurelia.register(RouterConfiguration)
  // To use HTML5 pushState routes, replace previous line with the following
  // customized router config.
  // .register(RouterConfiguration.customize({ useUrlFragmentHash: false }))

  // global registration of custom elements
  .register(customElements)
  // logger registration
  .register(
    LoggerConfiguration.create({
      sinks: [ConsoleSink],
      level: process.env.NODE_ENV === 'production' ? LogLevel.none : LogLevel.debug,
    })
  )
  // aurelia dialog registration
  .register(DialogConfigurationStandard.customize(dialogSettings))
  .app(MyApp)
  .start();
