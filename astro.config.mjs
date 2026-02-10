import { defineConfig } from "astro/config";
import tomlPlugin from "./plugins/vite-plugin-toml.ts";

export default defineConfig({
  site: "https://kodlar.az",
  output: "static",
  build: {
    format: "directory",
  },
  vite: {
    plugins: [tomlPlugin()],
  },
  markdown: {
    shikiConfig: {
      theme: "github-dark",
      wrap: true,
    },
  },
});
