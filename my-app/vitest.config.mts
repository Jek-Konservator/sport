import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    globals: true,
    clearMocks: true,
    setupFiles: ["./vitest.setup.ts"],
    css: { modules: { classNameStrategy: "non-scoped" } },
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/app/**",
        "src/shared/uikit/**",
        "**/index.ts",
        "**/types/**",
        "**/*.dto.ts",
        "**/*.test.{ts,tsx}",
        "src/shared/test/**",
      ],
      thresholds: { lines: 80, branches: 80 },
    },
  },
});
