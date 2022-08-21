// if you want to disable a rule in just a single file, please use the eslint-disable-next-line
// option in that file, rather than opening yourself up to a blanket solution and potentially miss
// out on an actual issue.

// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  ignorePatterns: ["**/__generated__/*.ts"],
  plugins: ["react", "@typescript-eslint", "graphql", "relay"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:relay/recommended",
    "prettier",
    "react-app",
    "react-app/jest",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
    project: "./tsconfig.eslint.json",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  // This is where you can override rules across your project
  rules: {
    "@typescript-eslint/no-unused-vars": ["warn"],
    "linebreak-style": ["error", "unix"],
    "@typescript-eslint/no-explicit-any": "off",
    "react/prop-types": "off",
    "relay/generated-flow-types": "off",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
  },
  overrides: [
    {
      files: ["*.js"],
      rules: {
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-unsafe-return": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/no-var-requires": "off",
      },
    },
    {
      files: ["*.test.ts", "*.test.tsx", "*.test.js"],
      rules: {
        "max-lines-per-function": "off",
        "max-lines": "off",
        "max-statements": "off",
      },
    },
  ],
  globals: {
    __DEV__: true,
  },
};
