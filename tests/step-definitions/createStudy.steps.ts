import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { CustomWorld } from '../../tests/fixtures/world';
import { LoginPage } from '../../pages/LoginPage';

Given('User launches the application', async function (this: CustomWorld) {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigate();

});

Given('User enters valid credentials and is logged in sucessfully', async function (this: CustomWorld) {
  await this.loginPage.login();
});

Given('User navigates to technician role', async function () {
 await this.page.locator('div').filter({ hasText: 'Application Admin' }).nth(5).click();
 await this.page.waitForURL('**/dashboard/configure', {
  timeout: 10000
});
  await this.page.getByText('Technician').click();
  await this.page.locator('div').filter({ hasText: /^Status$/ }).nth(3).click();
});

Given('User clicks on "Create Study" button', async function () {
  await this.page.getByTitle('Create Study').click();
});

  Given('User selects a template {string} and upload a valid study data file {string}', async function (templateName: string, excelFilePath: string) {
  const filePath = `./test-data/${excelFilePath}`;
  const templateSelector = templateName;
  await this.page.getByRole('combobox').click();
  await this.page.getByRole('combobox').click();
  setDefaultTimeout(10000); 
  await this.page.getByText(templateSelector).click();
  await this.page.setInputFiles('input[type="file"]', filePath);
  await this.page.getByRole('button', { name: 'Create' }).click();

  
});

When('user enters study details', async function (this: CustomWorld) {
  // Fill form fields here
});

When('user clicks on {string}', async function (this: CustomWorld, buttonName: string) {
  await this.page.getByRole('button', { name: buttonName }).click();
});

Then('study should be created successfully', async function (this: CustomWorld) {
  // Example validation
  await this.page.getByText('Study created successfully').isVisible();
});


