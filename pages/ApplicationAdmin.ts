import { Page, expect, Locator } from '@playwright/test';

export class ApplicationAdmin {
    private applicationAdminText;
    private configureOption;
    private usersOption
    private reassignOption;
    private fieldConfigTab;
    private dataConfigTab;
    private mappingStructureTab;
    private folderLocationTab;
    private projectToggleButton;
    private accessionToggleButton;
    private peerToggleButton;
    private additionalToggleButton;
    private studyToggleButton;
    private treatmentToggleButton;
    private durationToggleButton;
    private sacrificeToggleButton;
    private routeToggleButton;
    private croToggleButton;
    private testToggleButton;
    private btnSave;
    private successMessage;

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

    private async toggleButton(button: Locator, toggleName: string): Promise<void> {
    const isChecked = (await button.getAttribute('class'))?.includes('mat-checked');
    await button.click();
    if (isChecked) {
        await expect(button).not.toHaveClass(/mat-checked/);
        console.log(`${toggleName} toggle is turned OFF`);
    } else {
        await expect(button).toHaveClass(/mat-checked/);
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

    async verifySuccessMessage() {
        await this.page.waitForTimeout(3000);
        await this.btnSave.click();
        await expect(this.successMessage).toContainText(' Configuration Added Successfully ');
    }

    async verifyTogglesState() {
        
    }
}
