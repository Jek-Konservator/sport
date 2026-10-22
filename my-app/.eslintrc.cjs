const { resolve } = require("node:path");

const project = resolve(__dirname, "tsconfig.json");

module.exports = {
  root: true,
  extends: [
    require.resolve("@vercel/style-guide/eslint/browser"),
    require.resolve("@vercel/style-guide/eslint/react"),
    require.resolve("@vercel/style-guide/eslint/next"),
    require.resolve("@vercel/style-guide/eslint/typescript"),
  ],
  parserOptions: { project },
  plugins: ["boundaries"],
  settings: {
    "import/resolver": { typescript: { project } },
    "boundaries/include": ["src/**/*"],
    "boundaries/elements": [
      { type: "entity", pattern: "src/entities/*", capture: ["slice"] },
      { type: "feature", pattern: "src/features/*", capture: ["slice"] },
    ],
  },
  ignorePatterns: [
    "node_modules/",
    ".next/",
    "coverage/",
    "*.config.*",
    ".eslintrc.cjs",
    "next-env.d.ts",
  ],
  rules: {
    "import/no-default-export": "off",
    "import/order": "off",
    "import/no-extraneous-dependencies": "off",
    "react/function-component-definition": "off",
    "react/jsx-sort-props": [
      "error",
      { callbacksLast: false, shorthandFirst: false, reservedFirst: false },
    ],
    "@typescript-eslint/no-non-null-assertion": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/restrict-template-expressions": ["error", { allowNumber: true }],
    "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-confusing-void-expression": "off",
    "@typescript-eslint/no-misused-promises": [
      "error",
      { checksVoidReturn: { attributes: false } },
    ],
    "unicorn/filename-case": "off",
    "no-restricted-imports": [
      "error",
      { patterns: [{ group: ["@mantine/*"], message: "Импортируй Mantine только через @ui/*" }] },
    ],
    "import/no-restricted-paths": [
      "error",
      {
        zones: [
          {
            target: "./src/shared",
            from: [
              "./src/services",
              "./src/entities",
              "./src/features",
              "./src/screens",
              "./src/app",
            ],
          },
          {
            target: "./src/services",
            from: ["./src/entities", "./src/features", "./src/screens", "./src/app"],
          },
          { target: "./src/entities", from: ["./src/features", "./src/screens", "./src/app"] },
          { target: "./src/features", from: ["./src/screens", "./src/app"] },
          { target: "./src/screens", from: ["./src/app"] },
        ],
      },
    ],
    "boundaries/element-types": [
      "error",
      {
        default: "allow",
        rules: [
          { from: "entity", disallow: [["entity", { slice: "!${from.slice}" }]] },
          { from: "feature", disallow: [["feature", { slice: "!${from.slice}" }]] },
        ],
      },
    ],
  },
  overrides: [
    {
      files: ["src/shared/uikit/**/*"],
      rules: { "no-restricted-imports": "off" },
    },
    {
      files: ["src/app/**/*", "src/screens/*/index.tsx"],
      rules: { "import/no-default-export": "off" },
    },
    {
      files: ["**/*.test.ts", "**/*.test.tsx", "vitest.setup.ts"],
      rules: {
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/unbound-method": "off",
        "no-restricted-imports": "off",
      },
    },
  ],
};
