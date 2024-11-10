import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/browser.ts", "src/module.ts"],
    format: ["esm", "cjs"],
    noExternal: ["canvas-confetti"],
    platform: "browser",
    dts: true,
    sourcemap: true,
    clean: true,
});
