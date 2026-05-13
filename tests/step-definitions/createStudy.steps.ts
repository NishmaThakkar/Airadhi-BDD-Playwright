import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld  } from '../../tests/fixtures/world';
import { LoginPage } from '../../pages/LoginPage';
import { TechnicianPage } from '../../pages/TechnicianPage';

Given('User launches the application', async function (this: CustomWorld) {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigate();
});

Given('User enters valid credentials and is logged in sucessfully', async function (this: CustomWorld) {
  await this.loginPage.login("nishma.thakkar@airamatrix.com", "Password@1");
});

Given('User navigates to technician role', async function (this: CustomWorld) {
  this.technicianPage = new TechnicianPage(this.page);
  await this.technicianPage.selectTechnicianRole();
});

Given('User clicks on "Create Study" button', async function (this: CustomWorld) {
  await this.technicianPage.verifyCreateStudyButton();
});

  Given('User selects a template {string} and upload a valid study data file {string}', async function (templateName: string, excelFilePath: string) {
    await this.technicianPage.navigateToCreateStudyPage(excelFilePath,templateName);
});
    
When('User enters study details', async function (this: CustomWorld) {
await this.technicianPage.enterStudyDetails();
});


Given('User clicks on "Next" button', async function (this: CustomWorld) {
  await this.page.getByRole('button', { name: 'Next' }).click();
});

Given('User clicks on "Save & Finish" button', async function (this: CustomWorld) {
  await this.page.getByRole('button', { name: 'Save & Finish' }).click();
   await this.page.waitForURL('**/dashboard/study', {
  timeout: 10000
});
    await this.expect(this.page.getByText('1AID7organs')).toBeVisible();
});

