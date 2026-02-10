/// <reference path="../.astro/types.d.ts" />

declare module "*.toml" {
  const value: Record<string, unknown>;
  export default value;
}
