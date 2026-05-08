import { Before, After } from '@cucumber/cucumber';
import { chromium ,firefox,webkit} from '@playwright/test';
import { CustomWorld } from '../../tests/fixtures/world';
import { ApplicationAdmin } from '../../pages/ApplicationAdmin';
import { TechnicianPage } from '../../pages/TechnicianPage';
import { setDefaultTimeout } from '@cucumber/cucumber';
import { pwConfig } from '../../tests/config/playwrightConfig';

setDefaultTimeout(60 * 1000); // 60 seconds


// Before(async function (this: CustomWorld) {
//   this.browser = await chromium.launch({ headless: false,args: ['--start-maximized'] });
//     this.context = await this.browser.newContext({
//     viewport: null});
//   this.page = await this.context.newPage();
// });



Before(async function (this: CustomWorld) {

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

  const browser = await browserType.launch({
    headless: false,
  });

  const context = await browser.newContext({
    ...project.use,
  });

  const page = await context.newPage();
  this.page = page;
  this.browser = browser;
  this.applicationAdmin = new ApplicationAdmin(page);
  this.TechnicianPage = new TechnicianPage(page);
});

After(async function (this: CustomWorld, scenario) {

  const status = scenario.result?.status;

  console.log('Scenario Status:', status);

  if (status !== 'PASSED') {
    const screenshot = await this.page.screenshot({ fullPage: true });
    await this.attach(screenshot, 'image/png');
  } else {
    await this.attach('Scenario passed', 'text/plain');
  }
  await this.browser?.close();
});