import { Page, expect } from '@playwright/test';
import { error } from 'console';
import { exitCode } from 'process';


export class TechnicianPage{
    constructor(private page: Page) {}
    private repo_name: string = '';
  //  private study_number: string = '';

    async loginTechnician(){
        await this.page.goto('https://airadhi-merck-uat.airamatrix.in/AIRADHI/login');
        await this.page.getByRole('textbox', { name: 'Email ID' }).fill("nishma.thakkar@airamatrix.com");
        await this.page.getByRole('textbox', { name: 'Password' }).fill("Password@1");
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
            await this.page.waitForTimeout(1000);
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

    // Method to note study number and slides mapped for first study in the list
    private study_number: string = '';
    private slides_mapped_col: string = '';
    async userHasNotedStudyNoAndSlidesMapped() {
        try {
            const firstStudyRow = this.page.locator('tbody tr').first();   
            this.study_number = await firstStudyRow.locator('#openGalleryIcon').first().innerText();
            console.log('Study number noted:', this.study_number);
            this.slides_mapped_col = await firstStudyRow.locator('td.mat-column-slidesMapped span').innerText();
            console.log('Slides mapped for the study:', this.slides_mapped_col);
        }
        catch (error) {
            throw new Error('Failed to note study number and slides mapped for first study: ' + error);
        }
    }

    // Method to click on three dots on right side of any study
    async clickThreeDotsOnStudy() {
        try {
            const threeDotsButton = this.page.locator('tr.expandable-element-row').first().locator('.mat-menu-trigger');
            await threeDotsButton.click();
            await this.page.waitForTimeout(2000);
        }
        catch (error) {
            throw new Error('Failed to click on three dots on right side of any study: ' + error);
        }
    }

    // Method to click on view report option
    async clickViewReportOption() {
        try {
            const viewReportOption = this.page.locator('button.mat-menu-item', { hasText: 'View Report' });
            await viewReportOption.click();
            await this.page.waitForTimeout(2000);
        }
        catch (error) {
            throw new Error('Failed to click on view report option: ' + error);
        }
    }

    // Method to verify view report popup is displayed
    async verifyViewReportPopupDisplayed(popup_header: string) {
        try {
            const reportHeader = this.page.locator('div.dialog-title', { hasText: popup_header });
            await expect(reportHeader).toBeVisible({ timeout: 5000 });
        } catch (error) {
            throw new Error('Failed to verify view report popup is displayed: ' + error);
        }
    }

    //study_number and slides_mapped_col
    // Method to verify correct study number is displayed in view report popup
    async verifyCorrectStudyNumberDisplayed() {
        try {
            const studyNumber = await this.page.locator('label:has-text("Study No.") + .reportStudy').innerText();
            console.log(studyNumber); // Same_img_recut_2
            expect(studyNumber?.trim()).toBe(this.study_number.trim());
        }
        catch (error) {
            throw new Error('Failed to verify correct study number is displayed in view report popup: ' + error);
        }
    }

    // Method to verify image status dropdown is displayed with correct status options in view report popup
    async verifyImageStatusOptions(expectedOptions: string[]) {
    try {
        const dropdown = this.page.locator('.reportMappingDiv mat-select[role="combobox"]');
        await dropdown.click();
        await this.page.waitForSelector('mat-option');

        const actualOptions = await this.page.locator('mat-option').allTextContents();

        for (const option of expectedOptions) {
            expect(actualOptions).toContain(option);
        }

        // close dropdown after verification
        await this.page.locator('//mat-option[normalize-space()="All Images"]').click();
        await this.page.waitForTimeout(2000);

    } 
    catch (error) {
        throw new Error('Failed to verify image status dropdown options in view report popup: ' + error);
    }
}

    // Method to verify image table with columns on View Report popup
    async verifyImageTableColumns(option: string) {
        try {
            const header = this.page.locator('#dataSlidesTableHeader th', { hasText: option });
            await expect(header).toBeVisible({ timeout: 3000 });
        } catch (error) {
            throw new Error('Failed to verify image table columns in view report popup: ' + error);
        }
    }

    //Method to verify count of mapped images displayed in view report popup matches with slides mapped noted for the study
    private total_slides_mapped: number = 0;
    private mappedCount: number = 0;
    async verifyCountOfMappedImages() {
        try {
            this.mappedCount = await this.page.locator('tbody.slideData tr td:last-child p',{ hasText: 'Mapped' }).count();
            console.log('Count of mapped images displayed in view report popup:', this.mappedCount);
            console.log('Slides mapped noted for the study:', this.slides_mapped_col);
            this.total_slides_mapped = parseInt(this.slides_mapped_col.split('/')[1].trim());
            console.log('Total slides mapped extracted from noted value:', this.total_slides_mapped);
            expect(this.mappedCount).toBe(this.total_slides_mapped);
        }
        catch (error) {
            throw new Error('Failed to verify count of mapped images in view report popup: ' + error);
        }
    }

    //Method to verify count of unmapped images displayed in view report popup matches with slides unmapped noted for the study
    private slides_mapped_count: number = 0;
    private unmapped_slides: number = 0;
    async verifyCountOfUnmappedImages() {
        try {
            console.log("-----------------------------");
            const unmappedCount = await this.page.locator('tbody.slideData tr td:last-child p',{ hasText: 'Unmapped' }).count();
            console.log('Count of unmapped images displayed in view report popup:', unmappedCount);
            console.log('Slides mapped noted for the study:', this.slides_mapped_col);
            console.log('Total slides on UI:', this.total_slides_mapped);
            this.slides_mapped_count = parseInt(this.slides_mapped_col.split('/')[0].trim());
            console.log('Total slides unmapped extracted from noted value:', this.slides_mapped_count);
            this.unmapped_slides = this.total_slides_mapped - (this.slides_mapped_count);
            expect(this.unmapped_slides).toBe(unmappedCount);
        }
        catch (error) {
            throw new Error('Failed to verify count of unmapped images in view report popup: ' + error);
        }       
    }

    // Method to verify total slide count displayed in view report popup matches with total slides noted for the study
    async verifyTotalSlidesOnViewReport() {
        try{
            console.log("-----------------------------");
            const rowCount = await this.page.locator('tbody.slideData tr').count();
            console.log('Total rows:', rowCount);
            console.log('total_slides_mapped in study:', this.total_slides_mapped);
            expect(rowCount).toBe(this.total_slides_mapped);
        }
        catch (error) {
            throw new Error('Failed to verify total slide count in view report popup: ' + error);
        }
    }

    // Method to verify Cancel and Download Report buttons are displayed in view report popup
    async verifyCancelAndDownloadButtons() {
        try {
            const cancelButton = this.page.locator('button', { hasText: 'Cancel' });
            const downloadButton = this.page.locator('button', { hasText: 'Download' });
            await expect(cancelButton).toBeVisible({ timeout: 5000 });
            await expect(downloadButton).toBeVisible({ timeout: 5000 });
        } catch (error) {
            throw new Error('Failed to verify Cancel and Download Report buttons in view report popup: ' + error);
        }
    }

    // Method to verify image filter functionality in dropdown on view report popup
    private FilteredMappedCount: number = 0; 
    async verifyImageFilterFunctionality() {
        try {
            console.log('-------------Mapped Count----------------------');
            const dropdown = this.page.locator('.reportMappingDiv mat-select[role="combobox"]');
            await dropdown.click();
            await this.page.waitForSelector('mat-option');
            await this.page.locator('//mat-option[normalize-space()="Mapped Images"]').click();
            await this.page.waitForTimeout(1000);

            const selectedOption = await this.page.locator('.reportMappingDiv mat-select[role="combobox"]').locator('.mat-select-min-line').innerText();
            const expectedOptionForMapped = 'Mapped Images';
            expect(selectedOption?.trim()).toBe(expectedOptionForMapped);
            
            this.FilteredMappedCount = await this.page.locator('tbody.slideData tr td:last-child p',{ hasText: 'Mapped' }).count();
            console.log('Filtered mapped count: ',this.FilteredMappedCount);
            expect(this.FilteredMappedCount).toBe(this.slides_mapped_count);
            console.log('slides mapped count from UI:',this.slides_mapped_count);
            console.log('Image filter functionality for mapped images in dropdown on view report popup is working as expected');

            console.log('-------------Unmapped Count----------------------');

            await dropdown.click();
            await this.page.waitForSelector('mat-option');
            await this.page.locator('//mat-option[normalize-space()="Unmapped Images"]').click();
            await this.page.waitForTimeout(1000);

            const selectedOptionForMapped = await this.page.locator('.reportMappingDiv mat-select[role="combobox"]').locator('.mat-select-min-line').innerText();
            const expectedOptionForUnmapped = 'Unmapped Images';
            expect(selectedOptionForMapped?.trim()).toBe(expectedOptionForUnmapped);

            const FilteredUnmappedCount = await this.page.locator('tbody.slideData tr td:last-child p',{ hasText: 'Unmapped' }).count();
            console.log('Filtered unmapped count: ',FilteredUnmappedCount);
            expect(FilteredUnmappedCount).toBe(this.unmapped_slides);
        }
        catch (error) {
            throw new Error('Failed to verify image filter functionality in dropdown on view report popup: ' + error);
        }
    }

    // Method to navigate inside study

    async navigateInsideStudy(){
        try{
                const studyLocator = this.page.locator('.orangeText').first();

                const study_no = (await studyLocator.textContent())?.trim();
                console.log('Study No:',study_no);

                await studyLocator.click();

                await expect(this.page.locator('.activeStudyNameText')).toHaveText(study_no!);
                const study_inside = await this.page.locator('.activeStudyNameText').textContent();
                console.log('Study no inside :',study_inside);
        }
        catch(error){
            throw new Error("Failed to verify study no. on UI and inside study: "+ error);
        }
    }

    // Method to select value from View By dropdown
    async selectValuefromViewByDropdown(value: string){
        try{
            const viewby_dropdown = this.page.locator('//mat-form-field[.//mat-label[normalize-space()="View By"]]//div[contains(@class,"mat-select-trigger")]');

        // Open dropdown
            await viewby_dropdown.click({ force: true });
            const panel = this.page.locator('.cdk-overlay-pane');
            await panel.waitFor({ state: 'visible' });

        // Select options
            const opt = panel.locator(`mat-option:has-text("${value}")`);
            await opt.click();
            await expect(opt,`Value "${value}" should be selected`).toHaveAttribute('aria-selected', 'true');
          //  await this.page.waitForTimeout(5000);  
        }
        catch(error){
            throw new Error("Failed to select sex from view by dropdown: "+ error);
        }
    }

    //Method to check if folders are available
    async totalFolderInStudy(): Promise<boolean>{
        try {
           
            const folder_locator = this.page.locator('div.indvStudy  div.folderIconDiv');
            this.folder_count = await folder_locator.count();
            return this.folder_count>0;

        } catch (error) {
            throw new Error("Failed find folder:"+error);
        }
    }

    // Method to navigate inside slide folder
    private folder_count: number = 0;
    private total_images_count: number = 0;  // Total images count from each folder inside study
    private ind_fold_img: number = 0;
    async noteTotalSlidesInSlideFolder() {
        try {
            //slide folder locator
            const folder_locator = this.page.locator('div.indvStudy  div.folderIconDiv');
            await this.page.waitForTimeout(2000);
            //Folder count
            this.folder_count = await folder_locator.count();
            console.log('Folders:', this.folder_count);
            console.log('Type:', typeof this.folder_count);

            //check if min 1 folder is available
            if(this.folder_count>0){
                //if min 1 folder is available, click on each folder
                for(let i=0; i<this.folder_count; i++){
                    const next_folder = folder_locator.nth(i);
                    await next_folder.click();
                    await this.page.waitForTimeout(4000);
                    //Find no. of slides
                    const image_locator = this.page.locator('div.indvImage');
                    this.ind_fold_img = await image_locator.count();
                    console.log("Individual slides in folder:"+this.ind_fold_img);

                    //Add count in variable
                    this.total_images_count += this.ind_fold_img;

                    //Come outside
                    await this.page.locator('.studyListingNavigation .activeStudyNameText').first().click();
                }
                    console.log("Total images: "+this.total_images_count);
                }
                else{
                    throw new Error('No data available');
                }
        } catch (error) {
            throw new Error("Failed to verify slide count in folder: " + error);
        }
    
    }

    //Method to click study listing text
    async clickStudyListingText(){
        await this.page.getByText('Study Listing').click({force:true});
    }

    //Method to click i icon on study
    async clickiIconOnStudy(){
        try {
            const icon = this.page.locator('#studyDetailIcon').first();
            await icon.scrollIntoViewIfNeeded();
            await icon.click({force:true});
            await this.page.waitForTimeout(2000);
        } catch (error) {
            throw new Error("Failed to click on i icon: "+error);
        }     
    }
    
    //Method to note Slides Mapped On Details Popup
    private slidesMappedCountOnDetailsPopup: number = 0;
    async noteSlidesMappedOnDetailsPopup(){
        try{
            await this.page.waitForTimeout(2000);
            const text = await this.page.locator('label:has-text("Slides Mapped") + span').innerHTML();
            this.slidesMappedCountOnDetailsPopup = parseInt(text.split('/')[0].trim(), 10);
            await this.page.locator('.headerIcon i').click({force:true}); //Click cross/close icon of Details popup
            console.log('Images mapped count on details pop up: '+this.slidesMappedCountOnDetailsPopup); // 46
        }
        catch(error)
        {
            throw new Error("Failed to note slide count from details pop up of i icon: "+error);
        }
    }

    //Method to filter images on view report
    async filterImagesOnViewReport(mapped_img: string){
        try {
            const dropdown = this.page.locator('.reportMappingDiv mat-select[role="combobox"]');
            await dropdown.click();
            await this.page.waitForSelector('mat-option');
            await this.page.locator(`//mat-option[normalize-space()="${mapped_img}"]`).click();
            await this.page.waitForTimeout(1000); 
        } catch (error) {
            throw new Error("Failed to filter images on view report popup: "+error);
        }
              
    }

    //Method to verify slides total count from study and slide count from details pop up are matched
    async verifySlideCountsMatched(){
        try {
            await this.page.waitForTimeout(2000);
            expect (this.slidesMappedCountOnDetailsPopup === this.FilteredMappedCount && this.total_images_count === this.slidesMappedCountOnDetailsPopup && this.total_images_count === this.FilteredMappedCount) 
            console.log('All three are equal');
        } catch (error) {
            throw new Error("Failed to verify slide count are matching or not: "+error);
        }
    }

    // Method to verify slide details table with columns on Details popup
    async verifySlideDetailTableColumns(option: string) {
        try {
            const header = this.page.locator('div.panelRow table thead th .mat-sort-header-content', { hasText: option });
            await expect(header).toBeVisible({ timeout: 3000 });
        } catch (error) {
            throw new Error('Failed to verify slide details table columns on Details popup: ' + error);
        }
    }

    //Method to note Study Admin, Pathologist and Species from study list
    private study_admin_study_list: string='';
    private pathologist_study_list: string='';
    private species_study_list: string='';
    private study_no_study_list: string='';
    async noteStudyRoleFromStudyList(){
        try {
            this.study_admin_study_list = await this.page.locator('.cdk-column-studyDirector span').first().innerText();
            this.pathologist_study_list = await this.page.locator('.cdk-column-pathologist span').first().innerText();
            this.species_study_list = await this.page.locator('.cdk-column-species span').first().innerText();
            this.study_no_study_list = await this.page.locator('.orangeText').first().innerText();
            console.log('Study Admin from list -------->'+ this.study_admin_study_list);
            console.log('Pathologist from list -------->'+ this.pathologist_study_list);
            console.log('Species from list -------->'+ this.species_study_list);
            console.log('Study from list -------->'+ this.study_no_study_list);
        } catch (error) {
            throw new Error('Failed to note study details from study listing:'+error);
        }
    }

    //Method to note Study Admin, Pathologist and Species from details pop up
    private study_admin_details: string='';
    private pathologist_details: string='';
    private species_study_details: string='';

    async verifyStudyRoleFromDetails(){
        try {
            console.log('------Details pop-----');
            const studyNo_details = await this.page.locator('label:has-text("Study No.") + span').innerText();
            this.study_admin_details = await this.page.locator('label:has-text("Study Administrator : ") + span').innerText();
            this.pathologist_details = await this.page.locator('label:has-text("Pathologist : ") + span').innerText();
            this.species_study_details = await this.page.locator('label:has-text("Species : ") + span').innerText();

            expect(this.study_no_study_list).toBe(studyNo_details.trim());
            expect(this.study_admin_study_list).toBe(this.study_admin_details.trim());
            expect(this.pathologist_study_list).toBe(this.pathologist_details.trim());
            expect(this.species_study_list).toBe(this.species_study_details.trim());

            console.log("Study No popup : "+studyNo_details);
            console.log("Study Admin popup : "+this.study_admin_details);
            console.log("Study Pathologist popup : "+this.pathologist_details);
            console.log("Study Species popup : "+this.species_study_details);
        } catch (error) {
            throw new Error('Failed to verify values from Details popup: '+error);
        }
    }

    //Method to check dropdown values in study
    async verifyViewByDropdownInStudy(){
        try {
            const viewby_dropdown = this.page.locator('//mat-form-field[.//mat-label[normalize-space()="View By"]]//div[contains(@class,"mat-select-trigger")]');
            viewby_dropdown.isVisible;
          //  console.log("Yes DD :"+viewby_dropdown.isVisible);
        // Open dropdown
            await viewby_dropdown.click({ force: true });
            const panel = this.page.locator('.cdk-overlay-pane');
            await panel.waitFor({ state: 'visible' });

        // Select options
            await this.page.waitForTimeout(2500);
            const Tissue_dropdown = await panel.locator('mat-option:has-text("Tissue")').innerText();
            const Subject_ID_dropdown = await panel.locator('mat-option:has-text("Subject ID")').innerText();
            const Dosage_dropdown = await panel.locator('mat-option:has-text("Dosage")').innerText();
            const Cassette_opt = await panel.locator('mat-option:has-text("Cassette")').innerText();
            const Sex_opt = await panel.locator('mat-option:has-text("Sex")').innerText();

        // Verify all options are displayed
            await this.page.waitForTimeout(2500);
            expect(Tissue_dropdown).toBe('Tissue');
            expect(Subject_ID_dropdown).toBe('Subject ID');
            expect(Dosage_dropdown).toBe('Dosage');
            expect(Cassette_opt).toBe('Cassette');
            expect(Sex_opt).toBe('Sex');
            await viewby_dropdown.click({ force: true });
        } catch (error) {
            throw new Error('Failed to verify Dropdown options: '+error);
        }
    }

    // Method to verify Select All checkbox is working
    async verifySelectAllCheckBox(){
        try {
            if(await this.totalFolderInStudy()){

            const selectAllText = await this.page.locator('.mat-checkbox-label').first().innerText();
            //this.page.locator('div.selectAllDiv').getByText('Select All');
            console.log(selectAllText);
            expect(selectAllText.trim()).toBe('Select All');


      //      console.log('Yes, Folder Exists !');
            const selectAllCheckbox = this.page.locator('div.selectAllDiv .mat-checkbox-inner-container');
            
            await expect(selectAllCheckbox).toBeVisible();
            await expect(selectAllCheckbox).not.toBeChecked();
            selectAllCheckbox.click();
            await expect(selectAllCheckbox).toBeChecked();
            await this.page.waitForTimeout(1500);

            
        }
        else{
            throw new Error("No Data Available:"+error);
        }
        } catch (error) {
            throw new Error('Failed to verify checkbox: '+error);
        }
        

    }


}

