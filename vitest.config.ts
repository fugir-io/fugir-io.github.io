/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    css: true,
    // Include .tsx and .ts files
    include: ["**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    // Coverage configuration
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "src/test/",
        "**/*.d.ts",
        "vite.config.ts",
        "vitest.config.ts",
        "dist/",
        ".github/",
        "docs/",
      ],
    },
    // Mock browser APIs
    deps: {
      inline: ["@testing-library/user-event"],
    },
  },
  resolve: {
    alias: {
      "@": new URL("./src/", import.meta.url).pathname,
    },
  },
});
