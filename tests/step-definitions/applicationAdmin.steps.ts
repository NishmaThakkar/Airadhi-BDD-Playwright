import { Given, When, Then} from '@cucumber/cucumber';
import { CustomWorld  } from '../../tests/fixtures/world';
import { expect, Locator } from '@playwright/test';


Given('Application admin should be selected', async function (this: CustomWorld) {
//    await this.applicationAdmin.consoleErrorCheck();
   await this.applicationAdmin.selectApplicationAdmin();
//   await this.applicationAdmin.verifyNoConsoleErrors();
});

Then('User should see Configure, Users, Reassign in Side Panel', async function (this: CustomWorld) {
//    await this.applicationAdmin.consoleErrorCheck();
   await this.applicationAdmin.sidePanelOptions();
//   await this.applicationAdmin.verifyNoConsoleErrors();
});

Then('User should view below side panel:', async function (this: CustomWorld, dataTable) {
  const panel = dataTable.raw().flat();
  for (const section of panel) {
    await this.applicationAdmin.verifyLeftPanelSection(section);
  }
});

Then('User should view all the tabs:', async function (this: CustomWorld, dataTable) {
    const tabs = dataTable.raw().flat();
    for (const tab of tabs) {
        await this.applicationAdmin.verifyTabs(tab);
    }
});

Then('User should see Field Configuration, Data Configuration, Mapping Structure, Folder Location in Tabs', async function (this: CustomWorld) {
 //   await this.applicationAdmin.consoleErrorCheck();
    await this.applicationAdmin.tabOptions();
    //    await this.applicationAdmin.verifyNoConsoleErrors();
});     

Given('Admin is on Field Configuration tab', async function (this: CustomWorld) {   
//    await this.applicationAdmin.consoleErrorCheck();
    await this.applicationAdmin.navigateToFieldConfiguration();
 //   await this.applicationAdmin.verifyNoConsoleErrors();
});

When('Admin updates the field configuration', async function (this: CustomWorld) {
//    await this.applicationAdmin.consoleErrorCheck();
    await this.applicationAdmin.updateFieldConfiguration();
 //   await this.applicationAdmin.verifyNoConsoleErrors();
});

Then('Admin should see success message of toggle update', async function (this: CustomWorld) {
 //   await this.applicationAdmin.consoleErrorCheck();
    await this.applicationAdmin.verifySuccessMessage(' Configuration Added Successfully ');
//    await this.applicationAdmin.verifyNoConsoleErrors();
});

    async function toggleState(isChecked: any, technicianToggle: Locator): Promise<string> {
           if (isChecked) {
            console.log('Toggle is ON');
                await expect(technicianToggle).toBeVisible();
                return 'ON';
           } else {
            console.log('Toggle is OFF');
               await expect(technicianToggle).not.toBeVisible();
               return 'OFF';
           }
    }

When('Admin verifies the state of the toggles', async function (this: CustomWorld) {
    //    await this.applicationAdmin.consoleErrorCheck();
    const project = (await this.applicationAdmin.projectToggleButton.getAttribute('class'))?.includes('mat-checked');
    const accession = (await this.applicationAdmin.accessionToggleButton.getAttribute('class'))?.includes('mat-checked');
    const peer = (await this.applicationAdmin.peerToggleButton.getAttribute('class'))?.includes('mat-checked');
    const additional = (await this.applicationAdmin.additionalToggleButton.getAttribute('class'))?.includes('mat-checked');
    const study = (await this.applicationAdmin.studyToggleButton.getAttribute('class'))?.includes('mat-checked');   
    const treatment = (await this.applicationAdmin.treatmentToggleButton.getAttribute('class'))?.includes('mat-checked');
    const duration = (await this.applicationAdmin.durationToggleButton.getAttribute('class'))?.includes('mat-checked');
    const sacrifice = (await this.applicationAdmin.sacrificeToggleButton.getAttribute('class'))?.includes('mat-checked');
    const route = (await this.applicationAdmin.routeToggleButton.getAttribute('class'))?.includes('mat-checked');   
    const cro = (await this.applicationAdmin.croToggleButton.getAttribute('class'))?.includes('mat-checked');
    const test = (await this.applicationAdmin.testToggleButton.getAttribute('class'))?.includes('mat-checked');

    await this.technicianPage.selectTechnicianRole();
    await this.technicianPage.displayCreateStudyIcon();
    await this.technicianPage.verifyCreateStudyButton();
    await this.technicianPage.navigateToCreateStudyPage('1AnimalID6organs.csv','LungTest');

    await this.page.waitForTimeout(3000);
    const projectField = this.page.locator("xpath=//*[contains(@id,'mat-form-field-label') and normalize-space()='Project No.']");             
    await this.page.waitForTimeout(3000);
    const projectToggleState = await toggleState(project, projectField);
    console.log(`Project toggle is ${projectToggleState}`);


    const accessionTField = this.page.locator("xpath=//*[contains(@id,'mat-form-field-label') and normalize-space()='Accession No.']");
    const accessionToggleState = await toggleState(accession, accessionTField);
    console.log(`Accession toggle is ${accessionToggleState}`);

    const peerField = this.page.locator("xpath=//*[contains(@id,'mat-form-field-label') and normalize-space()='Peer Reviewer']");
    const peerToggleState = await toggleState(peer, peerField);
    console.log(`Peer Reviewer toggle is ${peerToggleState}`);

    const additionalField = this.page.locator("xpath=//*[contains(@id,'mat-form-field-label') and normalize-space()='Additional Pathologists']");
    const additionalToggleState = await toggleState(additional, additionalField);
    console.log(`Additional Pathologists toggle is ${additionalToggleState}`);

    const studyField = this.page.locator("xpath=//*[contains(@id,'mat-form-field-label') and normalize-space()='Study Domain']");
    const studyToggleState = await toggleState(study, studyField);
    console.log(`Study Domain toggle is ${studyToggleState}`);

    const treatmentField = this.page.locator("xpath=//*[contains(@id,'mat-form-field-label') and normalize-space()='Treatment']");
    const treatmentToggleState = await toggleState(treatment, treatmentField);
    console.log(`Treatment toggle is ${treatmentToggleState}`);

    const durationField = this.page.locator("xpath=//*[contains(@id,'mat-form-field-label') and normalize-space()='Duration']");
    const durationToggleState = await toggleState(duration, durationField);
    console.log(`Duration toggle is ${durationToggleState}`);

    const sacrificeField = this.page.locator("xpath=//*[contains(@id,'mat-form-field-label') and normalize-space()='Sacrifice']");
    const sacrificeToggleState = await toggleState(sacrifice, sacrificeField);
    console.log(`Sacrifice toggle is ${sacrificeToggleState}`);

    const routeField = this.page.locator("xpath=//*[contains(@id,'mat-form-field-label') and normalize-space()='Route']");
    const routeToggleState = await toggleState(route, routeField);
    console.log(`Route toggle is ${routeToggleState}`);

    const croField = this.page.locator("xpath=//*[contains(@id,'mat-form-field-label') and normalize-space()='CRO']");
    const croToggleState = await toggleState(cro, croField);
    console.log(`CRO toggle is ${croToggleState}`);

    const testField = this.page.locator("xpath=//*[contains(@id,'mat-form-field-label') and normalize-space()='Test Item']");
    const testToggleState = await toggleState(test, testField);
    console.log(`Test Item toggle is ${testToggleState}`);
    //    await this.applicationAdmin.verifyNoConsoleErrors();
});

Given('Admin is on Data Configuration tab', async function (this: CustomWorld) {
 //   await this.applicationAdmin.consoleErrorCheck();
    await this.applicationAdmin.dataConfigTab.click();
 //   await this.applicationAdmin.verifyNoConsoleErrors();
});

When('Admin clicks on Add Configuration button', async function (this: CustomWorld) {
//    await this.applicationAdmin.consoleErrorCheck();
    await this.applicationAdmin.clickAddConfigButton();
 //   await this.applicationAdmin.verifyNoConsoleErrors();
});

Then('Admin fills the configuration details and saves', async function (this: CustomWorld) {
 //   await this.applicationAdmin.consoleErrorCheck();
    await this.applicationAdmin.fillConfigurationDetails();
 //   await this.applicationAdmin.verifyNoConsoleErrors();
});

Given('Admin is on Folder Location tab', async function (this: CustomWorld) {
  //  await this.applicationAdmin.consoleErrorCheck();
    await this.applicationAdmin.folderLocationTab.click();
 //   await this.applicationAdmin.verifyNoConsoleErrors();
});

When('Admin clicks on Create button and fills the details', async function (this: CustomWorld) {
 //   await this.applicationAdmin.consoleErrorCheck();
    await this.applicationAdmin.verifyConfigAdded();
    await this.applicationAdmin.addFolderLocation();
//    await this.applicationAdmin.verifyNoConsoleErrors();
    
});

Given('Admin is on Mapping Structure tab', async function (this: CustomWorld) {
 //   await this.applicationAdmin.consoleErrorCheck();
    await this.applicationAdmin.mappingStructureTab.click();
 //   await this.applicationAdmin.verifyNoConsoleErrors();
});

When('Admin clicks on Save button', async function (this: CustomWorld) {
 //   await this.applicationAdmin.consoleErrorCheck();
 //   await this.page.waitForTimeout(3000);
    await this.applicationAdmin.saveButton();
 //   await this.applicationAdmin.verifyNoConsoleErrors();
});

Then('Admin should see success message of folder location creation', async function (this: CustomWorld) {
 //   await this.applicationAdmin.consoleErrorCheck();
    await this.page.waitForTimeout(3000);
    await this.applicationAdmin.verifySuccessMessage(' Image Folder Created Successfully ');
 //   await this.applicationAdmin.verifyNoConsoleErrors();
});

When('Admin clicks on Delete button of a folder location', async function (this: CustomWorld) {
 //   await this.applicationAdmin.consoleErrorCheck();
    await this.applicationAdmin.deleteFolderLocation();
 //   await this.applicationAdmin.verifyNoConsoleErrors();
});

When('Admin clicks on Delete button of a configuration', async function (this: CustomWorld) {
 //   await this.applicationAdmin.consoleErrorCheck();
    await this.applicationAdmin.deleteConfig();
 //   await this.applicationAdmin.verifyNoConsoleErrors();
});

Then('Admin should see success message of folder location deletion', async function (this: CustomWorld) {
 //   await this.applicationAdmin.consoleErrorCheck();
    await this.applicationAdmin.verifySuccessMessage(' Deleted successfully ');
 //   await this.applicationAdmin.verifyNoConsoleErrors();
});

Given('Admin is on User Panel', async function (this: CustomWorld) {
 //   await this.applicationAdmin.consoleErrorCheck();
    await this.applicationAdmin.navigateToUserPanel();
//    await this.applicationAdmin.verifyNoConsoleErrors();
});

Then('Admin should see user table with columns:', async function (this: CustomWorld, dataTable) {
    const columns = dataTable.raw().flat();
    for (const column of columns) {
        await this.applicationAdmin.verifyColumns(column);
     }
});

When('Admin clicks on Create User button and fills the details', async function (this: CustomWorld) {
 //   await this.applicationAdmin.consoleErrorCheck();
    await this.applicationAdmin.clickCreateUserButton();
    await this.applicationAdmin.fillUserDetails();
 //   await this.applicationAdmin.verifyNoConsoleErrors();
});

When('Admin clicks on Deactivate button of a user', async function (this: CustomWorld) {
 //   await this.applicationAdmin.consoleErrorCheck();
    this.userDeactivated =  await this.applicationAdmin.deactivateUser();
 //   await this.applicationAdmin.verifyNoConsoleErrors();
});

Then('Admin should see success message of user deactivation', async function (this: CustomWorld) {
    if (this.userDeactivated === false) {
        console.log("Skipping Then step because no user was available.");
        return;
    }
//    await this.applicationAdmin.consoleErrorCheck();
    await this.applicationAdmin.verifySuccessMessage(' User Deactivated Successfully ');
//    await this.applicationAdmin.verifyNoConsoleErrors();
});

When('Admin clicks on Inactive Tab', async function (this: CustomWorld) {
//    await this.applicationAdmin.consoleErrorCheck();
    await this.applicationAdmin.inactiveTab();
//    await this.applicationAdmin.verifyNoConsoleErrors();
});

Then('Admin should see search box', async function (this: CustomWorld) {
//    await this.applicationAdmin.consoleErrorCheck();
    await this.applicationAdmin.verifySearchBox();
//    await this.applicationAdmin.verifyNoConsoleErrors();
});

When('Admin clicks on Activate button of a user', async function (this: CustomWorld) {
//    await this.applicationAdmin.consoleErrorCheck();
    this.userDeactivated =  await this.applicationAdmin.activateUser();
 //   await this.applicationAdmin.verifyNoConsoleErrors();
});

Then('Admin should see success message of user activation', async function (this: CustomWorld) {
    if (this.userDeactivated === false) {
        console.log("Skipping Then step because no user was available.");
        return;
    }
//    await this.applicationAdmin.consoleErrorCheck();
    await this.applicationAdmin.verifySuccessMessage(' User Activated For Email ID :');
//    await this.applicationAdmin.verifyNoConsoleErrors();
});

Then('Admin should see success message of user creation', async function (this: CustomWorld) {
 //   await this.applicationAdmin.consoleErrorCheck();
    await this.applicationAdmin.verifySuccessMessage(' User Created And Verification Email Sent Successfully ');
 //   await this.applicationAdmin.verifyNoConsoleErrors();
});

Then('Admin should see the created user in Inactive tab', async function (this: CustomWorld) {
 //   await this.applicationAdmin.consoleErrorCheck();
    await this.applicationAdmin.verifyUserAdded();
 //   await this.applicationAdmin.verifyNoConsoleErrors();
});

Then('Admin should see error message of duplicate user creation', async function (this: CustomWorld) {
 //   await this.applicationAdmin.consoleErrorCheck();
    await this.applicationAdmin.verifySuccessMessage(' Email ID Already Exists ');
 //   await this.applicationAdmin.verifyNoConsoleErrors();
});

When('Admin clicks on Edit button of a user and updates the details', async function (this: CustomWorld) {
 //   await this.applicationAdmin.consoleErrorCheck();
    await this.applicationAdmin.editUserRoles();
    await this.applicationAdmin.verifyNoConsoleErrors();
});

Then('Admin should see success message of user update', async function (this: CustomWorld) {
 //   await this.applicationAdmin.consoleErrorCheck();
    await this.applicationAdmin.verifySuccessMessage(' User Updated Successfully For Email ID : ');
 //   await this.applicationAdmin.verifyNoConsoleErrors();
});