import { setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page,expect  } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ApplicationAdmin } from '../../pages/ApplicationAdmin';
import { TechnicianPage } from '../../pages/TechnicianPage';

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  loginPage!: LoginPage;
  applicationAdmin!: ApplicationAdmin;
  technicianPage!: TechnicianPage;
  expect = expect;
  userDeactivated?: boolean;
 // consoleErrors: string[] = [];
}

setWorldConstructor(CustomWorld);