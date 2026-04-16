import { setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page,expect  } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  loginPage!: LoginPage;
  expect = expect;
  
}

setWorldConstructor(CustomWorld);