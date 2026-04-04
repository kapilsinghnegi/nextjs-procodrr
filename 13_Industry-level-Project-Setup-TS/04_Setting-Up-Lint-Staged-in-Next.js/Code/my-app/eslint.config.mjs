import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import prettier from "eslint-config-prettier/flat";

const eslintConfig = defineConfig([
  ...nextVitals,
  // Override default ignores of eslint-config-next.
  prettier,
  {
    rules: {
      // semi: "error",
      // quotes: ["error", "single"],
      // indent: ["error", "tab"],
      // "linebreak-style": ["error", "unix"],
      // "comma-dangle": ["error", "never"],
    },
  },
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    ignores: [".lintstagedrc.js"],
  },
]);

export default eslintConfig;
