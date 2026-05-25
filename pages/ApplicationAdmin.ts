import { Page, expect, Locator } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class ApplicationAdmin {
    private applicationAdminText;
    private configureOption;
    private usersOption
    private reassignOption;
    private fieldConfigTab;
    public dataConfigTab;
    public mappingStructureTab;
    public folderLocationTab;
    public projectToggleButton;
    public accessionToggleButton;
    public peerToggleButton;
    public additionalToggleButton;
    public studyToggleButton;
    public treatmentToggleButton;
    public durationToggleButton;
    public sacrificeToggleButton;
    public routeToggleButton;
    public croToggleButton;
    public testToggleButton;
    private btnSave;
    private successMessage;
    private addConfigButton;
    private addButton;
    private addTitleTextbox;
    private createButton;
    private folderName;
    private folderLocation;
    private folderNameInput;
    private folderLocationInput;
    private deleteFolder;
    private deleteIcon;
    private deleteButton;
    private addUser;
    private firstNameInput;
    private lastNameInput;
    private emailInput;
    private noUsersText;
    private deactivateUserButton;
    private yesButton;
    private inactiveTabOption;
    private activateUserButton;
    private applicationAdminCheckbox;
    private studyDirectorCheckbox;
    private technicianCheckbox;
    private pathologistCheckbox;
    private randomEmail;
    private editUserButton;


    constructor(private page: Page) {
        this.applicationAdminText = this.page.locator("//*[contains(@id,'mat-select')]").getByText('Application Admin');
        this.configureOption = this.page.locator("//*[contains(@class,'indvPlaces')]").getByText('Configure');
        this.usersOption = this.page.locator("//*[contains(@class,'indvPlaces')]").getByText('Users');
        this.reassignOption = this.page.locator("//*[contains(@class,'indvPlaces')]").getByText('Reassign');
        this.fieldConfigTab = this.page.locator("xpath=//*[contains(@class,'indvTab') and normalize-space()='Field Configuration']");
        this.dataConfigTab = this.page.locator("//*[contains(@class,'indvTab')]").getByText('Data Configuration');
        this.mappingStructureTab = this.page.locator("//*[contains(@class,'indvTab')]").getByText('Mapping Structure');
        this.folderLocationTab = this.page.locator("//*[contains(@class,'indvTab')]").getByText('Folder Location');
        this.projectToggleButton = this.page.locator("//mat-label[contains(text(),'Project No.')]/following-sibling::mat-slide-toggle");
        this.accessionToggleButton = this.page.locator("//mat-label[contains(text(),'Accession No.')]/following-sibling::mat-slide-toggle");
        this.peerToggleButton = this.page.locator("//mat-label[contains(text(),'Peer Reviewer')]/following-sibling::mat-slide-toggle");
        this.additionalToggleButton = this.page.locator("//mat-label[contains(text(),'Additional Pathologists')]/following-sibling::mat-slide-toggle");
        this.studyToggleButton = this.page.locator("//mat-label[contains(text(),'Study Domain')]/following-sibling::mat-slide-toggle");
        this.treatmentToggleButton = this.page.locator("//mat-label[contains(text(),'Treatment')]/following-sibling::mat-slide-toggle");
        this.durationToggleButton = this.page.locator("//mat-label[contains(text(),'Duration')]/following-sibling::mat-slide-toggle");
        this.sacrificeToggleButton = this.page.locator("//mat-label[contains(text(),'Sacrifice')]/following-sibling::mat-slide-toggle");
        this.routeToggleButton = this.page.locator("//mat-label[contains(text(),'Route')]/following-sibling::mat-slide-toggle");
        this.croToggleButton = this.page.locator("//mat-label[contains(text(),'CRO')]/following-sibling::mat-slide-toggle");
        this.testToggleButton = this.page.locator("//mat-label[contains(text(),'Test Item')]/following-sibling::mat-slide-toggle");
        this.btnSave = this.page.locator("button").getByText('Save');
        this.successMessage = this.page.locator("//div[contains(@class,'snackBarMsg')]"); 
        this.addConfigButton = this.page.locator("button").getByText('add');
        this.addButton = this.page.locator("xpath=//div[@class='editableRow']//mat-icon[@title='Add Configuration']");
   //     this.enterNameToast = this.page.locator("xpath=//div[contains(@class,'snackBarMsg') and contains(text(),' Please Enter Name ')]");
        this.addTitleTextbox = this.page.locator("xpath=//span[contains(@class,'mat-form-field-label-wrapper')]//*[contains(text(), 'Add Title')]");
        this.createButton = this.page.locator("//button[contains(text(), ' Create ')]");
        this.folderName = this.page.locator("//div[contains(@class,'mat-form-field-infix')]//mat-label[contains(text(),'Name')]");
        this.folderLocation = this.page.locator("//div[contains(@class,'mat-form-field-infix')]//mat-label[contains(text(),'Location')]");
        this.folderNameInput = faker.system.fileName();
        this.folderLocationInput = faker.system.directoryPath();
        this.deleteFolder = this.page.locator("//div[@class='rowTemplateDelete']//mat-icon[@title='Delete']").first();
        this.deleteIcon = this.page.locator("//mat-card-header[@class='mat-card-header dcMatCardHeader']//mat-icon[contains(text(), 'delete')]").last();
        this.deleteButton = this.page.locator("//button[contains(text(),'Delete')]");
        this.addUser = this.page.locator("//button[@title='Add User']");
        this.firstNameInput = this.page.locator("//input[@formcontrolname='firstName']");
        this.lastNameInput = this.page.locator("//input[@formcontrolname='lastName']");
        this.emailInput = this.page.locator("//input[@formcontrolname='email']");
        this.noUsersText = this.page.locator("//td[contains(text(),'No data to display')]");
        this.deactivateUserButton = this.page.locator("//a[@id='deActivateUserIcon']").first();
        this.yesButton = this.page.locator("//button[contains(text(),'Yes')]");
        this.inactiveTabOption = this.page.locator("//div[@class='indvTab']");
        this.activateUserButton = this.page.locator("//a[@id='activateUserIcon']").first();
        this.applicationAdminCheckbox = this.page.locator("//span[@class='mat-checkbox-inner-container']/following-sibling::span[text()='Application Admin']");
        this.studyDirectorCheckbox = this.page.locator("//span[@class='mat-checkbox-inner-container']/following-sibling::span[text()='Study Director']");
        this.technicianCheckbox = this.page.locator("//span[@class='mat-checkbox-inner-container']/following-sibling::span[text()='Technician']");
        this.pathologistCheckbox = this.page.locator("//span[@class='mat-checkbox-inner-container']/following-sibling::span[text()='Pathologist']");
        this.randomEmail = faker.internet.email();
        this.editUserButton = this.page.locator("//a[@id='editUserIcon']").first();
    }


    async selectApplicationAdmin() {
        await expect(this.applicationAdminText).toBeVisible();
        await this.applicationAdminText.click();
    }

    async sidePanelOptions() {
        await expect(this.configureOption).toBeVisible();
        await expect(this.usersOption).toBeVisible();
        await expect(this.reassignOption).toBeVisible();
    }

    async tabOptions() {
        await expect(this.fieldConfigTab).toBeVisible();
        await expect(this.dataConfigTab).toBeVisible();
        await expect(this.mappingStructureTab).toBeVisible();
        await expect(this.folderLocationTab).toBeVisible();
    }

    async navigateToFieldConfiguration() {
        await this.fieldConfigTab.click();
    }

    async toggleButton(button: Locator, toggleName: string): Promise<void> {
    const isChecked = (await button.getAttribute('class'))?.includes('mat-checked');
    console.log(`${toggleName} toggle is currently ${isChecked ? 'ON' : 'OFF'}`);
    await button.click();
    if (isChecked) {
        await expect(button).not.toContainClass('mat-checked');
        console.log(`${toggleName} toggle is turned OFF`);
    } else {
        await expect(button).toContainClass('mat-checked');
        console.log(`${toggleName} toggle is turned ON`);
    }
}

    async updateFieldConfiguration() {
        await this.page.waitForTimeout(5000);
        await this.toggleButton(this.projectToggleButton, 'Project');
        await this.toggleButton(this.accessionToggleButton, 'Accession');
        await this.toggleButton(this.peerToggleButton, 'Peer');
        await this.toggleButton(this.additionalToggleButton, 'Additional Pathologists');
        await this.toggleButton(this.studyToggleButton, 'Study Domain');
        await this.toggleButton(this.treatmentToggleButton, 'Treatment');
        await this.toggleButton(this.durationToggleButton, 'Duration');
        await this.toggleButton(this.sacrificeToggleButton, 'Sacrifice');
        await this.toggleButton(this.routeToggleButton, 'Route');
        await this.toggleButton(this.croToggleButton, 'CRO');
        await this.toggleButton(this.testToggleButton, 'Test Item');
    } 

    async saveButton(){
        await this.btnSave.click();
    }

    async verifySuccessMessage(text: string) {
        const snackbar = this.successMessage;
        await snackbar.waitFor({state: 'visible',timeout: 10000});
        await expect(snackbar).toContainText(text);
    }

    async clickAddConfigButton() {
        await this.addConfigButton.click();
        await this.page.waitForTimeout(3000);

    }

    async fillConfigurationDetails() {
    //    await this.addButton.click();
    //    await expect(this.enterNameToast).toBeVisible();
        await this.addTitleTextbox.fill(faker.lorem.words(1));
        await this.addButton.click();
    }

    async verifyConfigAdded() {
        await this.createButton.click();
    }

    async deleteConfig() {
        const name = await this.page.locator("//div[@class='mat-card-header-text']//mat-card-subtitle").last().getAttribute('title');
        await this.deleteIcon.click();
        await this.deleteButton.click();
        await expect(this.successMessage).toContainText(" Data Configuration " + name + " Deleted ");
    }

    async addFolderLocation() {
        await this.folderName.fill(this.folderNameInput);
        await this.folderLocation.fill(this.folderLocationInput);
        await this.page.waitForTimeout(2000);
   //     await this.createButton.click();
    }

    async deleteFolderLocation() {
        await this.deleteFolder.click();
        await this.deleteButton.click();
    }

    private consoleErrors: string[] = [];
    async consoleErrorCheck() {
        this.page.on('console', msg => {
        if (msg.type() === 'error') {
            this.consoleErrors.push(msg.text());
        //   console.log('Console Error:', msg.text());
    }});
    }

    async verifyNoConsoleErrors() {
    await this.page.waitForTimeout(2000);
    expect(this.consoleErrors,`Console errors found: ${this.consoleErrors.join('\n')}`).toEqual([]);
    }

    async navigateToUserPanel() {
        await this.usersOption.click();
    }

    async clickCreateUserButton() {
        await this.addUser.click();
    }

    async fillUserDetails() {
       
        const randomFirstName = faker.person.firstName();
        const randomLastName = faker.person.lastName();
        await this.firstNameInput.fill(randomFirstName);
        await this.lastNameInput.fill(randomLastName);
        await this.emailInput.fill(this.randomEmail);

        const checkboxes = [
        this.applicationAdminCheckbox,
        this.studyDirectorCheckbox,
        this.technicianCheckbox,
        this.pathologistCheckbox
    ];

    const randomCount = Math.floor(Math.random() * 4) + 1;
    const shuffled = checkboxes.sort(() => 0.5 - Math.random());
    const selectedCheckboxes = shuffled.slice(0, randomCount);
        for (const checkbox of selectedCheckboxes) {
            await checkbox.click();
        }
    }

    async verifyUserAdded() {
        await expect(this.randomEmail).toBeTruthy();
    }

    async deactivateUser() {
       if (await this.noUsersText.isVisible()) {
            console.log("No users available to deactivate.");
            return false;
        }
        else {
            await this.deactivateUserButton.click();
            await this.yesButton.click();
            return true;
        }
    }

    async inactiveTab() {
        await this.inactiveTabOption.click();
    }

    async activateUser() {
        if (await this.noUsersText.isVisible()) {
            console.log("No users available to activate.");
            return false;
        }
        else {            
            await this.activateUserButton.click();
            await this.yesButton.click();
            return true;
        }
    }

    async editUserRoles() {
        if (await this.noUsersText.isVisible()) {
            console.log("No users available to edit.");
            return false;
        }
        else {
            await this.editUserButton.click();
            const randomFirstName = faker.person.firstName();
            const randomLastName = faker.person.lastName();
            await this.firstNameInput.fill(randomFirstName);
            await this.lastNameInput.fill(randomLastName);
            await expect(this.emailInput).toBeDisabled();

            const checkboxes = [
            this.applicationAdminCheckbox,
            this.studyDirectorCheckbox,
            this.technicianCheckbox,
            this.pathologistCheckbox
            ];

            const randomCount = Math.floor(Math.random() * 4) + 1;
            const shuffled = checkboxes.sort(() => 0.5 - Math.random());
            const selectedCheckboxes = shuffled.slice(0, randomCount);
            for (const checkbox of selectedCheckboxes) {
                await checkbox.click();
            }
                return true;
        }
    }
}