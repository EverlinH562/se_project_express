module.exports = {
    env: {
      browser: true,
      node: true,
      es2021: true,
    },
    extends: ["eslint:recommended", "airbnb-base", "prettier"],
    overrides: [
      {
        env: {
          node: true,
        },
        files: [".eslintrc.{js,cjs}"],
        parserOptions: {
          sourceType: "script",
        },
      },
    ],
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
        
        'no-underscore-dangle': ['error', { allow: ['_id'] }],
        'no-console': 'off', 
    },
  };