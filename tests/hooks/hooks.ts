import { Before, After } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import { CustomWorld } from '../../tests/fixtures/world';
import { setDefaultTimeout } from '@cucumber/cucumber';
import { LoginPage } from '../../ui/pages/LoginPage';

setDefaultTimeout(60 * 1000); // 60 seconds


Before(async function (this: CustomWorld) {
  this.browser = await chromium.launch({ headless: false,args: ['--start-maximized'] });
    this.context = await this.browser.newContext({
    viewport: null});
  this.page = await this.context.newPage();
});

Before(async function () {
  const loginPage = new LoginPage(this.page);
  await loginPage.navigate();
  await loginPage.login('nishma.thakkar@airamatrix.com', 'Password@5');
  await loginPage.verifyLogin();
});

After(async function (this: CustomWorld, scenario) {
   const status = scenario.result?.status; 
    console.log('Scenario Status:', scenario.result?.status);
  if (scenario.result?.status !== 'PASSED') {
    const screenshot = await this.page.screenshot({ fullPage: true });
    await this.attach(screenshot, 'image/png');
  } else {
    await this.attach('Scenario passed', 'text/plain');
  }

   await this.browser.close(); 
});
