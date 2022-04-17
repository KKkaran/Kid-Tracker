module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "plugin:react/recommended",
    "eslint:recommended",
    "react-app",
    "react-app/jest",
    "plugin:import/errors",
    "plugin:import/warnings",
  ],
  // parser: "@typescript-eslint/parser",
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.js", "*.jsx",],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 12,
        sourceType: "module",
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
  ],
  plugins: [
    "react",
    "react-native",
  ],
  rules: {
    "no-var": "error",
    "testing-library/no-container": "off",
    "testing-library/no-node-access": "off",
    "import/no-named-as-default-member": "off",
    "class-methods-use-this": "off",
    "no-underscore-dangle": "off",
    "comma-spacing": "off",
    "comma-dangle": "off",
    "no-restricted-syntax": "off",
    "no-plusplus": "off",
    "no-console": "off",
    "max-len": "off",
    "object-curly-newline": "off",
    "react/no-danger": "off",
    "react/no-array-index-key": "off",
    "@typescript-eslint/no-var-requires": "off",
    semi: [1, "always",],
    quotes: [1, "double",],
    "no-use-before-define": "off",
    "react-native/split-platform-components": [
      0,
      {
        androidPathRegex: "\\.android.(js|jsx|ts|tsx)$",
        iosPathRegex: "\\.ios.(js|jsx|ts|tsx)$",
      },
    ],
    "react/jsx-filename-extension": ["error", { extensions: [".tsx", ".jsx",], },],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        ts: "never",
        tsx: "never",
      },
    ],
    "no-shadow": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "import/prefer-default-export": "off",
    "react/prop-types": "off",
    "no-void": "off",
    "import/no-unresolved": [2, { caseSensitive: false, },],
    "react-native/no-inline-styles": 0,
    "react-native/split-platform-components": [
      2,
      {
        androidPathRegex: "\\.android.(js|jsx|ts|tsx)$",
        iosPathRegex: "\\.ios.(js|jsx|ts|tsx)$",
      },
    ],
  },
  settings: {
    "import/ignore": ["react-native"],
    "import/resolver": {
      // typescript: {},
      node: {
        paths: ["src",],
        extensions: [".js", ".jsx", ".ts", ".tsx", ".d.ts",],
        moduleDirectory: ["node_modules", "src/",],
      },
    },
  },
};