# Cypress notes
## How to use the `@cypress/coverage`

- It seems that `@cypress/coverage` uses my `.babelrc`, regardless on the `file:preprocessor` statements in `cypress/plugins/index.js`. As a result, add the `babel-plugin-istanbul` in your `.babelrc`---and remember to remove it when you build the app because it adds 40kb in the bundle size:

  ```json
  // .babelrc
  {
    "plugins": ["istanbul"]
  }
  ```

- In case you're wondering, `@cypress/coverage` ignores the `istanbul` plugin if we place it in the test env of the `.babelrc`.
- Finally, the `.nyc_output/out.json` is empty with the `nyc@14.1.1`, so I used the `nyc@13.3.0`.
