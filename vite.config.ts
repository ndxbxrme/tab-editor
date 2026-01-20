import { defineConfig } from "vite";

export default defineConfig({
  plugins: [],
  test: {
    exclude: ["tests/e2e/**"],
    include: ["tests/unit/**/*.test.{js,ts}", "tests/unit/**/*.spec.{js,ts}"],
    passWithNoTests: true,
  },
});
