import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
await page.goto('https://airaqc-qc-internal.airamatrix.in/AIRAQc/login');
  await page.getByRole('textbox', { name: 'Email Id' }).fill('Nishma.thakkar@airamatrix.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Password@1');
  await page.getByRole('textbox', { name: 'Password' }).press('Enter');
  await page.locator('#mat-select-value-1').click();
  await page.getByText('Technician').click();
  await page.locator('#Gallery_folder').first().click();
  await page.getByRole('img', { name: 'macroPath' }).first().click();
  await page.locator('#webViewerFrame').contentFrame().locator('.fa.fa-chevron-right.rotateArrow.ng-tns-c157-0.openArrow').click();
  await page.locator('#webViewerFrame').contentFrame().getByText('F', { exact: true }).click();
  await page.locator('#webViewerFrame').contentFrame().getByText('2px').click();
  await page.locator('#webViewerFrame').contentFrame().locator('#annoSection i').click();
  await expect(page).toHaveScreenshot('webviewer.png', {
  fullPage: true,
    animations: 'disabled',
});
});