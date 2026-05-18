import { Given, When, Then} from '@cucumber/cucumber';
import { CustomWorld  } from '../../tests/fixtures/world';
import { expect, Locator } from '@playwright/test';


let project: any;

Given('Application admin should be selected', async function (this: CustomWorld) {
   await this.applicationAdmin.selectApplicationAdmin();
});

Then('User should see Configure, Users, Reassign in Side Panel', async function (this: CustomWorld) {
   await this.applicationAdmin.sidePanelOptions();
});

Then('User should see Field Configuration, Data Configuration, Mapping Structure, Folder Location in Tabs', async function (this: CustomWorld) {
    await this.applicationAdmin.tabOptions();
});     

Given('Admin is on Field Configuration tab', async function (this: CustomWorld) {   
    await this.applicationAdmin.navigateToFieldConfiguration();
});

When('Admin updates the field configuration', async function (this: CustomWorld) {
    await this.applicationAdmin.updateFieldConfiguration();
        
});

Then('Admin should see success message', async function (this: CustomWorld) {
    await this.applicationAdmin.verifySuccessMessage();
});

async function toggleState(adminToggle: Locator, technicianToggle: Locator,  technicianPage: any): Promise<string> {
   const isChecked = (await adminToggle.getAttribute('class'))?.includes('mat-checked');

    await technicianPage.selectTechnicianRole();
    await technicianPage.displayCreateStudyIcon();
    await technicianPage.verifyCreateStudyButton();
    await technicianPage.navigateToCreateStudyPage('1AnimalID6organs.csv','LungTest');

       if (isChecked) {
          //  await page.waitForTimeout(5000);
            await expect(technicianToggle).toBeVisible();
            return 'ON';
       } else {
        console.log('Project toggle is OFF');
           await expect(technicianToggle).not.toBeVisible();
           return 'OFF';
       }
}

When('Admin verifies the state of the toggles', async function (this: CustomWorld) {
    await this.page.waitForTimeout(5000);
    const technicianProject = this.page.locator("xpath=//*[contains(@id,'mat-form-field-label') and normalize-space()='Project No.']");             

    const projectToggleState = await toggleState(this.applicationAdmin.projectToggleButton, technicianProject, this.technicianPage);
    console.log(`Project toggle is ${projectToggleState}`);
    
});
