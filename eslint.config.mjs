import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // ...compat.config({
  //   rules: {
  //     "no-console": "warn",
  //     "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
  //     "react/react-in-jsx-scope": "off", // Next.js handles React import automatically
  //     "@typescript-eslint/no-explicit-any": "warn",
  //     "@typescript-eslint/explicit-module-boundary-types": "off",
  //   },
  // }),
  // {
  //   files: ["**/*.ts", "**/*.tsx"],
  //   languageOptions: {
  //     parserOptions: {
  //       project: "./tsconfig.json",
  //     },
  //   },
  // },
];

export default eslintConfig;
