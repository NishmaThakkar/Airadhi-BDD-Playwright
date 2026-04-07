import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://airadhi-merck-uat.airamatrix.in/AIRADHI/login');
  await page.locator('.mat-form-field-infix').first().click();
  await page.getByRole('textbox', { name: 'Email ID' }).fill('nishma.thakkar@airamatrix.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Password@5');
  await page.getByRole('textbox', { name: 'Password' }).press('Enter');
  await page.getByText('visibility_offLogin').click();
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByText('Application Admin').click();
  await page.getByText('Technician').click();
  await page.getByTitle('Create Study').click();
  await page.locator('.mat-select-arrow-wrapper.ng-tns-c114-154').click();
  await page.getByText('15Fields').click();
  await page.getByRole('button', { name: 'Upload File' }).click();
  await page.getByRole('button', { name: 'Upload File' }).setInputFiles('1AnimalID6organs.csv');
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByRole('textbox', { name: 'Study No.*' }).click();
  await page.getByRole('textbox', { name: 'Study No.*' }).fill('Automation 1');
  await page.locator('.mat-select-placeholder.mat-select-min-line.ng-tns-c114-160').click();
  await page.getByText('Nishma Thakkar', { exact: true }).click();
  await page.locator('div').filter({ hasText: /^Study Administrator\*$/ }).nth(3).click();
  await page.locator('#mat-option-41').getByText('Nishma Thakkar').click();
  await page.locator('.mat-select-placeholder.mat-select-min-line.ng-tns-c114-162').click();
  await page.getByText('Mice').click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Save & Finish' }).click();
  await page.getByText('Study created successfully').click();
  await expect(page.getByText('Automation')).toBeVisible();
  await page.getByText('Automation').click();
  await page.getByText('TissueView By').click();
  await page.getByText('Subject ID').click();
  await page.getByText('Subject IDView By').click();
  await page.getByText('Dosage').click();
  await page.locator('.mat-form-field-subscript-wrapper.ng-tns-c68-401').click();
  await page.locator('.mat-icon.notranslate.folderSvg > svg').click();
  await page.getByText('remove_red_eye').first().click();
  await page.getByText('remove_red_eye').nth(1).click();
  await page.getByText('1000 remove_red_eye').nth(2).click();
  await page.locator('#webViewerFrame').contentFrame().getByText('2px').click();
  await page.locator('#webViewerFrame').contentFrame().locator('#Path_59').nth(1).click();
  await page.locator('#webViewerFrame').contentFrame().locator('.mat-form-field-infix.ng-tns-c60-8').click();
  await page.locator('#webViewerFrame').contentFrame().getByRole('textbox', { name: 'Comments' }).fill('test');
  await page.locator('#webViewerFrame').contentFrame().locator('.fa.fa-floppy-o.createAnnoInfo').click();
  await page.locator('#webViewerFrame').contentFrame().locator('i').nth(3).click();
  await page.locator('#webViewerFrame').contentFrame().locator('.fa.fa-info-circle.annoInfo.annoDetails').click();
  await page.locator('#webViewerFrame').contentFrame().locator('i').nth(5).click();
  await page.locator('#webViewerFrame').contentFrame().getByRole('textbox', { name: 'Comments' }).click();
  await page.locator('#webViewerFrame').contentFrame().getByRole('textbox', { name: 'Comments' }).fill('test1');
  await page.locator('#webViewerFrame').contentFrame().locator('.fa.fa-floppy-o').first().click();
  await page.locator('#webViewerFrame').contentFrame().locator('#openseadragon_0-overlaycanvas').click({
    position: {
      x: 647,
      y: 370
    }
  });
  await page.locator('#webViewerFrame').contentFrame().locator('i').nth(3).click();
  await page.locator('#webViewerFrame').contentFrame().getByRole('textbox', { name: 'Comments' }).click();
});