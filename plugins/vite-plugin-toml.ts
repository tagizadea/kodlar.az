import TOML from "@iarna/toml";
import fs from "node:fs";
import type { Plugin } from "vite";

export default function tomlPlugin(): Plugin {
  return {
    name: "vite-plugin-toml",
    transform(code, id) {
      if (!id.endsWith(".toml")) return;
      const content = fs.readFileSync(id, "utf-8");
      const parsed = TOML.parse(content);
      return {
        code: `export default ${JSON.stringify(parsed)}`,
        map: null,
      };
    },
    handleHotUpdate({ file, server }) {
      if (file.endsWith(".toml")) {
        const mod = server.moduleGraph.getModuleById(file);
        if (mod) return [mod];
      }
    },
  };
}
