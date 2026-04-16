import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://airadhi-merck-uat.airamatrix.in/AIRADHI/login');
   
  }

  async login(email: string, password: string) {
 await this.page.getByRole('textbox', { name: 'Email ID' }).fill(email);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
    await this.page.waitForTimeout(10000);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async invalidlogin(email: string, password: string) {
    await this.page.getByRole('textbox', { name: 'Email ID' }).fill(email);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
    await this.page.waitForTimeout(10000);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async Error_msg(){
    try {
    await expect(this.page).toHaveURL(/login/, { timeout: 5000 });
    console.log('Login failed as expected, test passed.');
  } catch (error) {
    throw new Error('Login succeeded unexpectedly, test failed.');
  }
  }

  async verifyLogin() {
    await expect(this.page.getByRole('button', { name: 'Logout' })).toBeVisible();
  }

  async logout() {
    await this.page.getByRole('button', { name: 'Logout' }).click();
    await this.page.getByRole('menuitem', { name: 'Logout' }).click();
    await this.page.getByRole('button', { name: 'Yes' }).click();
  }

  async verifyLogout() {
    await expect(this.page).toHaveURL(/login/);  }

  }




