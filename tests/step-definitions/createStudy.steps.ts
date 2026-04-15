import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld  } from '../../tests/fixtures/world';
import { LoginPage } from '../../pages/LoginPage';

Given('User launches the application', async function (this: CustomWorld) {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigate();

});

Given('User enters valid credentials and is logged in sucessfully', async function (this: CustomWorld) {
  await this.loginPage.login();
});

Given('User navigates to technician role', async function (this: CustomWorld) {
 await this.page.locator('div').filter({ hasText: 'Application Admin' }).nth(5).click();
 await this.page.waitForURL('**/dashboard/configure', {
  timeout: 10000
});
  await this.page.getByText('Technician').click();
});


Given('User clicks on "Create Study" button', async function (this: CustomWorld) {
  await this.page.getByTitle('Create Study').click();
    await this.expect(this.page.getByText('CancelCreate')).toBeVisible();

});

  Given('User selects a template {string} and upload a valid study data file {string}', async function (templateName: string, excelFilePath: string) {
  const filePath = `./test-data/${excelFilePath}`;
  const templateSelector = templateName;
 await this.expect(this.page.locator('#mat-select-value-5')).toBeVisible();
 await this.page.getByRole('combobox').first().click();
  await this.page.getByText(templateSelector).click();
  await this.page.setInputFiles('input[type="file"]', filePath);
  await this.page.getByRole('button', { name: 'Create' }).click();
});

When('User enters study details', async function (this: CustomWorld) {
await this.page.locator('div').filter({ hasText: /^Study title$/ }).nth(3).click();
await this.page.getByRole('textbox', { name: 'Study title' }).fill('Study1');
await this.page.getByRole('textbox', { name: 'Study title' }).press('Tab');
await this.page.getByRole('textbox', { name: 'Project No.' }).fill('Proj-09');
await this.page.getByRole('textbox', { name: 'Project No.' }).press('Tab');
await this.page.getByRole('textbox', { name: 'Project No.' }).click();
await this.page.locator('div').filter({ hasText: /^Study Administrator\*$/ }).nth(3).click();
await this.page.locator('#mat-option-48').getByText('Nishma Thakkar').click();
await this.page.locator('div').filter({ hasText: /^Pathologist\*$/ }).nth(3).click();
await this.page.locator('#mat-option-32').getByText('Nishma Thakkar').click();
await this.page.locator('div').filter({ hasText: /^Species \*$/ }).nth(3).click();
await this.page.getByText('Mice').click();
});


Given('User clicks on "Next" button', async function (this: CustomWorld) {
  await this.page.getByRole('button', { name: 'Next' }).click();
});

Given('User clicks on "Save & Finish" button', async function (this: CustomWorld) {
  await this.page.getByRole('button', { name: 'Save & Finish' }).click();
});

Then('Study should be created successfully', async function (this: CustomWorld) {
await this.expect(this.page.getByText('Study created successfully')).toBeVisible();
});

