import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Nested worktree checkouts (this project's own milestone worktrees,
    // and any unrelated project content that ends up under here) are not
    // part of this app and must not be linted as if they were.
    ".claude/**",
  ]),
]);

export default eslintConfig;
