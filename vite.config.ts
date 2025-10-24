import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import aurelia from "@aurelia/vite-plugin";
import { fileURLToPath } from "node:url";

export default defineConfig({
  server: {
    open: !process.env.CI,
    port: 9000,
  },
  esbuild: {
    target: "es2022",
  },
  plugins: [
    aurelia({
      useDev: true,
    }),
    nodePolyfills(),
  ],
  resolve: {
    alias: {
      "~api": fileURLToPath(new URL("./src/api", import.meta.url)),
      "~dialog": fileURLToPath(new URL("./src/dialog", import.meta.url)),
      "~custom-element": fileURLToPath(
        new URL("./src/custom-element", import.meta.url)
      ),
      "~event": fileURLToPath(new URL("./src/event", import.meta.url)),
      "~page": fileURLToPath(new URL("./src/page", import.meta.url)),
      "~resources": fileURLToPath(new URL("./src/resources", import.meta.url)),
    },
  },
});
