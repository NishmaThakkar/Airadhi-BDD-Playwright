import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
retries:0,
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  //retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  //reporter: 'html',
/*reporter: [
  ['line'],
  ['allure-playwright']
],*/
  use: {

     baseURL: 'http://airadhi-qc-internal.airamatrix.in/',
    trace: 'on-first-retry',
       headless: false,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
           ignoreHTTPSErrors: true,//,
        //  viewport: null,
           
       },
    },
    {
      name: '  headless: false,',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  
  ],

});
