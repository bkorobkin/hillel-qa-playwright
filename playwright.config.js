// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require('dotenv').config({
  path: `.env.${process.env.ENV} || 'stage'`
});
/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  // testDir: './tests',
  timeout: 30000,
  /* Run tests in files in parallel */
  testMatch: 'tests/hillel-garage/**.spec.js',
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'https://qauto2.forstudy.space/',
    baseURL: process.env.BASE_URL,
    //headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 5000,
    ignoreHTTPSErrors: true,
    // httpCredentials: {
    //   username: 'guest',
    //   password: 'welcome2qauto'
    // },
    httpCredentials: {
      username: 'process.env.USERNAME',
      password: 'process.env.PASSWORD'
    },

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    launchOptions: {
      slowMo: 2000,
    }
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'hillel-garage',
      use: { ...devices['Desktop Chrome'],
      // baseURL: 'https://qauto2.forstudy.space/',
      // httpCredentials: {
      //   username: 'guest',
      //   password: 'welcome2qauto'
      // },
      baseURL: process.env.BASE_URL,
      httpCredentials: {
        username: 'process.env.USERNAME',
        password: 'process.env.PASSWORD'
      },
      viewport: { width: 1280, height: 720 },
      testMatch: '**/tests/hillel-garage/**/*.spec.js',
    },
    // dependencies: ['setup']
  },

//   {
//     name: 'prod',
//     use: { ...devices['Desktop Firefox'],
//     baseURL: 'https://qauto2.heillel.com',
//     httpCredentials: {
//       username: 'guest',
//       password: 'welcome2qauto'
//     },
//     retries:2,
//   },
//   dependencies: ['setup']
// },

// {
//   name: 'setup',
//   testMatch: 'tests/setup/*.spec.js',
// },
    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    // },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
  //   {
  //     name: 'Microsoft Edge',
  //     use: { ...devices['Desktop Edge'], channel: 'msedge' },
  //   },
  //   {
  //     name: 'Google Chrome',
  //     use: { ...devices['Desktop Chrome'], channel: 'chrome' },
  //   },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

