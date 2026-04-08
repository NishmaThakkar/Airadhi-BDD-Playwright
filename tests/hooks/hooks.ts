import { Before, After } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import { CustomWorld } from '../../../fixtures/world';
import { setDefaultTimeout } from '@cucumber/cucumber';


setDefaultTimeout(60 * 1000); // 60 seconds


Before(async function (this: CustomWorld) {
  this.browser = await chromium.launch({ headless: false,args: ['--start-maximized'] });
    this.context = await this.browser.newContext({
    viewport: null});
  this.page = await this.context.newPage();
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
