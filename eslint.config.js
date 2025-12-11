module.exports = [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        require: "readonly",
        module: "readonly",
        exports: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        process: "readonly",
      },
    },
    rules: {
      // ===== EMPTY LINE CONTROL =====
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1 }],

      // ===== YOUR PREVIOUS SETTINGS =====
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_|next|req|res|err|error",
          varsIgnorePattern: "^_",
        },
      ],
      "no-console": "off",
      eqeqeq: ["warn", "always"],
      curly: ["warn", "all"],

      // ===== ADDITIONAL USEFUL RULES =====
      "no-trailing-spaces": "error",
      "object-curly-spacing": ["warn", "always"],
      "array-bracket-spacing": ["warn", "never"],
      "comma-dangle": ["warn", "never"],
      semi: ["warn", "always"],
    },
  },
  {
    ignores: [
      "node_modules/**",
      "test.js",
      "dist/**",
      "build/**",
      "coverage/**",
      "*.log",
    ],
  },
];
