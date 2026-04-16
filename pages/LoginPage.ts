import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://airadhi-merck-uat.airamatrix.in/AIRADHI/login');
  }

  async login() {
    await this.page.getByRole('textbox', { name: 'Email ID' }).fill("nishma.thakkar@airamatrix.com");
    await this.page.getByRole('textbox', { name: 'Password' }).fill("Password@5");
    await this.page.getByRole('button', { name: 'Login' }).click();
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




