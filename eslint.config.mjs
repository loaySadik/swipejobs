import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import prettier from "eslint-plugin-prettier";
import pluginReact from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import unusedImports from "eslint-plugin-unused-imports";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    extends: [prettierConfig],
    plugins: { 
      js, 
      prettier, 
      "unused-imports": unusedImports, 
      "react-hooks": reactHooks,
      react: pluginReact,
    },
    settings: {
      react: {
        version: "19.0.0",
        runtime: "automatic", // This is key for React 19 JSX transform
      },
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        React: true, // Add React to globals
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      'max-params': ['error', 3],
      'max-lines-per-function': ['error', 150],
      "unused-imports/no-unused-imports": "error",
      "react-hooks/rules-of-hooks": "warn",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
  {
    ignores: ["android/**", "ios/**"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
  // Override the React plugin's JSX scope rules in the recommended config
  {
    files: ["**/*.{jsx,tsx}"],
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
    },
  },
]);