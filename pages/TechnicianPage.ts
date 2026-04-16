import { Page, expect } from '@playwright/test';
import { LoginPage } from './LoginPage';

export class TechnicianPage{
    constructor(private page: Page) {}
    private repo_name: string = '';

    async loginTechnician(){
        await this.page.goto('https://airadhi-merck-uat.airamatrix.in/AIRADHI/login');
        await this.page.getByRole('textbox', { name: 'Email ID' }).fill("nishma.thakkar@airamatrix.com");
        await this.page.getByRole('textbox', { name: 'Password' }).fill("Password@5");
        await this.page.waitForTimeout(10000);
        await this.page.getByRole('button', { name: 'Login' }).click();
    }

    // Method to select Technician role from dropdown
    async selectTechnicianRole(){
        try {
            await this.page.getByText('Application Admin').click();
            await this.page.getByRole('option',{ name:'Technician' }).click();
            await this.page.waitForTimeout(2000);
        } catch (error) {
            throw new Error('Failed to select Technician role: ' + error);
        }
        
    }

    // Method to verify left panel sections
    async verifyLeftPanelSection(section: string) {
        try {
            const locator = this.page.locator('p', { hasText: section });
            await expect(locator).toBeVisible();
            await this.page.waitForTimeout(2000);
         } catch (error) {
            throw new Error('Failed to verify left panel section: ' + error);
         }
     }


    // Method to verify status dropdown options
    async verifyStatusDropdownOption() {
        const dropdown = this.page.locator('//mat-form-field[.//mat-label[normalize-space()="Status"]]//div[contains(@class,"mat-select-trigger")]');

        const options = ['Created', 'In Progress'];

        // Open dropdown
        await dropdown.click({ force: true });
        const panel = this.page.locator('.cdk-overlay-pane');
        await panel.waitFor({ state: 'visible' });

        // Select options
        for (const option of options) {
            const opt = panel.locator(`mat-option:has-text("${option}")`);
            await opt.click();
            await expect(opt,`Checkbox "${option}" should be selected`).toHaveAttribute('aria-selected', 'true');
        }
   
        // Deselect options and Verify checkboxes are unselected
        for (const option of options) {
            const opt = panel.locator(`mat-option:has-text("${option}")`);
            await opt.click();
            await expect(opt,`Checkbox "${option}" should be unselected`).toHaveAttribute('aria-selected', 'false');
        }
}

    // Method to verify search box functionality on Study Section
    async verifySearchBox() {
        try {
            const searchBox = this.page.locator('input[placeholder="Search"]');
            await searchBox.scrollIntoViewIfNeeded();
            await searchBox.click({ force: true });
            await searchBox.fill('Test Search', { force: true });
            await this.page.waitForTimeout(2500);
            await expect(searchBox).toHaveValue('Test Search', { timeout: 5000 });
            await searchBox.fill(''); 
            await expect(searchBox).toHaveValue('');
        } catch (error) {
            throw new Error('Failed to verify search box: ' + error);
        }

}

    // Method to verify presence of plus icon for creating study
    async displayCreateStudyIcon() {
       const createStudyBtn = this.page.locator('button.searchbtn[title="Create Study"]');
        // Assert the button is visible
        await expect(createStudyBtn).toBeVisible({ timeout: 5000 });

        // Optionally, assert the <i> plus icon inside is visible
        const plusIcon = createStudyBtn.locator('i.fa.fa-plus');
        await expect(plusIcon).toBeVisible({ timeout: 5000 });
    }


    // Method to verify study table columns
     async verifyStudyTableColumn(column: string) {
         try {
             // Locate by class and text
            const studyNoHeader = this.page.locator('div.mat-sort-header-content', { hasText: column });
            await expect(studyNoHeader).toBeVisible();
            await this.page.waitForTimeout(2500);
         } catch (error) {
             throw new Error('Failed to verify study table column: ' + error);
         }
     }

     // Method to navigate to Image Repository section
     async navigateToImageRepository() {
        try {
            const imageRepoLink = this.page.getByText('Image Repository');
            await imageRepoLink.click();
            await this.page.waitForTimeout(2000);
        } catch (error) {
            throw new Error('Failed to navigate to Image Repository section: ' + error);
        }
    }

    // Method to verify Image Repository tab is displayed
    async imageRepositoryTabDisplayed() {
        try {
            const imageRepoTab = this.page.getByRole('tab', { name: 'Image Repository' });
            await expect(imageRepoTab).toBeVisible({ timeout: 5000 });
        } catch (error) {
            throw new Error('Failed to verify Image Repository tab is displayed: ' + error);
        }
    }

    // Method to verify Search by Name text field in Image Repository
    async verifySearchByNameTextBox() {
        try {
            const searchByNameField = this.page.locator('input[placeholder="Search by Name"]');
            await expect(searchByNameField).toBeVisible({ timeout: 5000 });
        } catch (error) {
            throw new Error('Failed to verify Search by Name text field: ' + error);
        }
    }

    // Method to navigate to any image repository
    async navigateToAnyImageRepository() {
        try {
            const firstRepoLink = this.page.locator('.indvRepoName').first();
            this.repo_name = (await firstRepoLink.textContent() ?? '').trim();
            await firstRepoLink.click();
            console.log('Navigated to repository: ' + this.repo_name);
            await this.page.waitForTimeout(2000);
        } catch (error) {
            throw new Error('Failed to navigate to any image repository: ' + error);
        }
    }

    // Method to verify image list icon is displayed
    async verifyImageListIconDisplayed() {
        try {
            const listViewIcon = this.page.getByTitle('List View');
            await expect(listViewIcon).toBeVisible({ timeout: 5000 });
        } catch (error) {
            throw new Error('Failed to verify image list icon is displayed: ' + error);
        }
    }

    // Method to verify image repository path is displayed
    async verifyImageRepoPathDisplayed() {
        try {
            await expect(this.page.locator('.selectionFolderNames')).toHaveText('Image Repository');
            await expect(this.page.locator('.activeFolderName')).toHaveText(this.repo_name.trim());
        } catch (error) {
            throw new Error('Failed to verify image repository path is displayed: ' + error);
        }
    }

    // Method to verify images are displayed in list format
    async verifyListView() {
        try {
            await expect(this.page.locator('tbody[role="rowgroup"]')).toBeVisible({ timeout: 5000 });
        }
        catch (error) {
                throw new Error('Failed to verify list view is displayed: ' + error);
        }
    }

    // Method to navigate to grid view
    async navigateToGridView() {
        try {
            await this.page.getByTitle('List View').click();
            await this.page.waitForTimeout(2000);
           //wait expect(gridViewIcon).toBeVisible({ timeout: 5000 });
        } catch (error) {
            throw new Error('Failed to navigate to grid view: ' + error);
        }
    }

    // Method to verify images are displayed in grid format
    async verifyGridView() {
        try {
            const folders = this.page.locator('.indvFolderData');
            await expect(folders.first()).toBeVisible({ timeout: 5000 });
        }
        catch (error) {
                throw new Error('Failed to verify grid view is displayed: ' + error);
        }
    }

    // Method to verify image repository table columns
    async verifyImageTableColumn(column: string) {
        try {
            const header = this.page.locator('.mat-header-cell', { hasText: column });
            console.log('Verifying column: ' + column);
            await expect(header).toBeVisible({ timeout: 5000 });
        } catch (error) {
            throw new Error('Failed to verify image repository table column: ' + error);
        }
    }

    async verifyImageNameListView(){
        await this.page.locator('[title="Slide Preview"]').first().click();
        await this.page.waitForTimeout(2000);
        const firstRowImageName = await this.page.locator('tbody[role="rowgroup"] tr').first().locator('span.imageRepoNameRow').textContent();
        console.log(firstRowImageName?.trim());
       // console.log('This is image');

        const imageName = await this.page.locator('div.imgnavigation span.repoImgNameText').textContent();
        console.log(imageName?.trim());

        if(imageName?.trim() === firstRowImageName?.trim()){
            await expect (this.page.locator('div.repoImgPreview img')).toBeVisible({ timeout: 5000 });
            console.log('Successfully navigated to image details');
        }
        else{
            throw new Error('Failed to navigate to image details : Image name does not match');
        }

    }

    async verifyImageNameGridView(){
        await this.page.locator('.indvFolderData').locator('mat-icon', { hasText: 'remove_red_eye' }).first().click();
        await this.page.waitForTimeout(2000);
        const firstRowImageName = await this.page.locator('div.rightUpperDiv .indvTileName').first().textContent();
        console.log(firstRowImageName?.trim());
       // console.log('This is image');

        const imageName = await this.page.locator('div.imgnavigation span.repoImgNameText').textContent();
        console.log(imageName?.trim());

        if(imageName?.trim() === firstRowImageName?.trim()){
            await expect (this.page.locator('div.repoImgPreview img')).toBeVisible({ timeout: 5000 });
            console.log('Successfully navigated to image details');
        }
        else{
            throw new Error('Failed to navigate to image details : Image name does not match');
        }
    }

    //Verify Date Time Formate for LIST FORMAT

    async verifyTimestampFormat() {

        const timestampLocator = this.page.locator('span.imageNameRow'); // adjust if needed
        const timestamp = (await timestampLocator.first().textContent())?.trim();
        console.log('Timestamp found:', timestamp);
        const regex = /^\d{2}-\d{2}-\d{4} \| \d{2}:\d{2}:\d{2}$/;
        
        if (!timestamp) {
            throw new Error('Timestamp is null or empty');
        }
        if (!regex.test(timestamp)) {
            throw new Error(`Invalid timestamp format: ${timestamp}`);
        }
        console.log('Timestamp format is valid');
    }

    //LIST FORMAT
    // Method to click on first folder or image and verify navigation up to last folder in list format
    async clickAndVerifyImgFolderListView() {
        try {
            while (true) {
                const hasGalleryId = await this.page.locator('[id="Gallery_folder"]').count() > 0;
                const hasSlidePreview = await this.page.locator('[title="Slide Preview"]').count() > 0;

                if (hasGalleryId) {
                    await this.page.locator('[id="Gallery_folder"]').first().click();
                    const columns = ['Name', 'Date Modified', 'Size'];
                    for (const col of columns) {
                        await this.verifyImageTableColumn(col);
                    }
                    await this.verifyTimestampFormat();
                    await this.verifyListView();

                }
                else if (hasSlidePreview) {
                    await this.verifyImageNameListView();
                    await this.verifyTimestampFormat();
                    break;
                } 
                else 
                    {
                        console.log('No matching attribute found');
                        break; // Exit the loop if neither element is found
                    }
            }
        }
        catch (error) {
            throw new Error('Failed to click on first folder or image and verify navigation: ' + error);
        }
    }

       //GRID FORMAT
    // Method to click on first folder or image and verify navigation up to last folder in grid format
    async clickAndVerifyImgFolderGridView() {
        try {
            while (true) {
                const hasGalleryId = await this.page.locator('[id="Gallery_folder"]').count() > 0;
                const hasEyeIcon = await this.page.locator('.indvFolderData').locator('mat-icon', { hasText: 'remove_red_eye' }).count() > 0;

                if (hasGalleryId) {
                    await this.page.locator('[id="Gallery_folder"]').first().click();
                    await this.verifyGridView();
                }
                else if (hasEyeIcon) {
                    await this.verifyImageNameGridView();
                    break;
                } 
                else 
                    {
                        console.log('No matching attribute found');
                        break; // Exit the loop if neither element is found
                    }
            }
        }
        catch (error) {
            throw new Error('Failed to click on first folder or image and verify navigation: ' + error);
        }
    }

    // Method to navigate back to image repository from image details
    async navigateToImgRepoBack() {
        try {
            await this.page.locator('div.repoFolderSelection span.selectionFolderNames', { hasText: this.repo_name } ).click();
            await this.page.waitForTimeout(2000);
        } catch (error) {
            throw new Error('Failed to navigate back to image repository: ' + error);
        }
    }

    // Method to select status of study from dropdown
    async selectStudyStatus(status: string) {
        try {
        const dropdown = this.page.locator('//mat-form-field[.//mat-label[normalize-space()="Status"]]//div[contains(@class,"mat-select-trigger")]');
        
        // Open dropdown
        await dropdown.click({ force: true });
        const panel = this.page.locator('.cdk-overlay-pane');
        await panel.waitFor({ state: 'visible' });

        // Select options
        const opt = panel.locator(`mat-option:has-text("${status}")`);
        await opt.click();
        await expect(opt,`Checkbox "${status}" should be selected`).toHaveAttribute('aria-selected', 'true');
       
        }
        catch (error) {
            throw new Error('Failed to select study status from dropdown: ' + error);
        }
    }

    // Method to navigate to Study section
    async navigateToStudySection() {
        try {
            const studySectionLink = await this.page.getByText('Study', { exact: true });
            await studySectionLink.click();
            await this.page.waitForTimeout(2000);
        }
        catch (error) {
            throw new Error('Failed to navigate to Study section: ' + error);
        }
    }

    // Method to search study by study number in search box
    async searchStudyByNumber(study_number: string) {
        try {
            const searchBox = this.page.locator('input[placeholder="Search"]');
            await searchBox.scrollIntoViewIfNeeded();
            await searchBox.click({ force: true });
            await searchBox.fill(study_number, { force: true });
            searchBox.press('Enter');
        }
        catch (error) {
            throw new Error('Failed to search study by number: ' + error);
        }
    }

    // Method to verify study is displayed on table with that study number on Technician dashboard
    async verifyStudyDisplayed() {
    try {
        await this.page.waitForLoadState('networkidle');
        const study_number_searched = await this.page.locator('input[placeholder="Search"]').inputValue();
        console.log('Study number searched:', study_number_searched);
        const row = this.page.locator('table tbody tr', {hasText: study_number_searched});
        await expect(row).toBeVisible();
        const study_number_displayed = await row.locator('div[title]').first().innerText();
        console.log('Study number displayed:', study_number_displayed);
        expect(study_number_displayed?.trim()).toBe(study_number_searched?.trim());
    } catch (error) {
        throw new Error('Failed to verify study is displayed with that study number: ' + error);
    }
}

///////////////////
    // Method to verify study status is displayed on table with that study status on Technician dashboard
    async verifyStudyStatusDisplayed(study_status: string, study_number: string) {
        try {
            await this.page.waitForLoadState('networkidle');
            const status_searched = await this.page.locator('[role="combobox"]:has-text("' + study_status + '") .mat-select-min-line').innerText();
            console.log('Study status searched:', status_searched);
            const row = this.page.locator('table tbody tr', {hasText:study_number}).filter({hasText: status_searched});
            console.log('Row locator for study status:', row);
            await expect(row).toBeVisible();
            const study_status_displayed = await row.locator('td.mat-column-studyStatus').innerText();
            console.log('Study status displayed:', study_status_displayed);
            expect(study_status_displayed?.trim()).toBe(study_status.trim());
        }
        catch(error){
            throw new Error('Failed to verify study status is displayed with that study status: ' + error);
        }

    }

}


