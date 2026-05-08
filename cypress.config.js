const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://books.toscrape.com",  // http not https — avoids SSL errors
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 8000,
    supportFile: "cypress/support/e2e.js",
    setupNodeEvents(on, config) {},
  },
});
