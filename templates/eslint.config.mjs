import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import nk from "@mizanurrahman70/nk/eslint-config.js";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  ...nk,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
