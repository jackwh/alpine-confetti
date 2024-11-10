import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/alpine-confetti.browser.ts"],
    format: ["esm", "cjs"],
    noExternal: ["canvas-confetti"],
    platform: "browser",
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
});
