import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import tsESLint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig({
  files: ['**/*.{js,ts}'],
  extends:[
    tsESLint.configs.recommended,
    eslintPluginPrettierRecommended
]});
