import { Before, After, BeforeAll, AfterAll,BeforeStep,AfterStep } from '@cucumber/cucumber';
import { chromium, firefox, webkit, Browser, BrowserContext, Page,expect } from '@playwright/test';
import { CustomWorld } from '../../tests/fixtures/world';
import { ApplicationAdmin } from '../../pages/ApplicationAdmin';
import { TechnicianPage } from '../../pages/TechnicianPage';
import { setDefaultTimeout } from '@cucumber/cucumber';
import { pwConfig } from '../../tests/config/playwrightConfig';

setDefaultTimeout(60 * 1000); // 60 seconds

let sharedBrowser: Browser | undefined;
let sharedContext: BrowserContext | undefined;
let sharedPage: Page | undefined;
let consoleErrors: string[] = [];

BeforeAll(async function () {
  const browserName = process.env.BROWSER || 'chromium';
  const project = pwConfig.projects?.find(p => p.name === browserName);

  if (!project) {
    throw new Error(`Project ${browserName} not found in config`);
  }

  let browserType;

  switch (browserName) {
    case 'chromium':
      browserType = chromium;
      break;
    case 'firefox':
      browserType = firefox;
      break;
    case 'webkit':
      browserType = webkit;
      break;
    default:
      throw new Error('Invalid browser');
  }

  sharedBrowser = await browserType.launch({
    headless: false,
  });

  sharedContext = await sharedBrowser.newContext({
    ...project.use,
  });
const browser = await browserType.launch({
  headless: false,
  args: ['--start-maximized']
});
const context = await browser.newContext({
  viewport: null
});


  sharedPage = await sharedContext.newPage();

  // Capture console errors once for the shared page
});

Before(async function (this: CustomWorld) {
  if (!sharedBrowser || !sharedContext || !sharedPage) {
    throw new Error('Shared browser session was not initialized');
  }
  // Use the shared context/page created in BeforeAll to capture console errors
  this.context = sharedContext;
  this.page = sharedPage;
  this.browser = sharedBrowser;
  this.applicationAdmin = new ApplicationAdmin(this.page);
  this.technicianPage = new TechnicianPage(this.page);
  // reset console errors for the upcoming scenario

  await this.page.goto(pwConfig.use?.baseURL || '', { waitUntil: 'domcontentloaded' });

});

BeforeStep(async function (this: CustomWorld) {
  // Clear console errors before each step
  consoleErrors = [];
   this.page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
   });
});

After(async function (this: CustomWorld, scenario) {

  const status = scenario.result?.status;
  const scenarioName = scenario.pickle.name;
  console.log(`Scenario completed: ${scenarioName} | Status: ${status}`);

  if (status !== 'PASSED') {
  //  console.log(consoleErrors);
    const screenshot = await this.page.screenshot({ fullPage: true });
    await this.attach(screenshot, 'image/png');
  } else {
    await this.attach('Scenario passed', 'text/plain');
  }

});

AfterStep(async function (this: CustomWorld) {
  await this.page.waitForTimeout(2000);
  expect(consoleErrors,`Console errors found: ${consoleErrors.join('\n')}`).toEqual([]);
  
});

AfterAll(async function () {
  
  await sharedContext?.close();
  await sharedBrowser?.close();
});