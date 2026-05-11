import { Given, When, Then} from '@cucumber/cucumber';
import { CustomWorld  } from '../../tests/fixtures/world';

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

When('Admin verifies the state of the toggles', async function (this: CustomWorld) {
        await this.page.waitForTimeout(3000);
         if ((await this.page.locator("//mat-label[contains(text(),'Project No.')]/following-sibling::mat-slide-toggle").getAttribute('class'))?.includes('mat-checked')) {  
              await this.TechnicianPage.selectTechnicianRole();
              await this.page.waitForTimeout(2000);
              console.log('Project toggle is ON');
                  await this.TechnicianPage.displayCreateStudyIcon();
        }
        else
        {     
           console.log('Project toggle is OFF');
        }     
});