import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../../pages/LoginPage';


Given('I open the login page', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigate();
});

When('I login with email {string} and password {string}',
  async function (email: string, password: string) {
    await this.loginPage.login(email, password);
  }
);

Then('I should be logged in', async function () {
  await this.loginPage.verifyLogin();
});

When('I logout from the application', async function () {
  await this.loginPage.logout();
});

Then('I should be logged out', async function () {
  await this.loginPage.verifyLogout();
});