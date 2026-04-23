import { Given, When, Then } from '@cucumber/cucumber';
import { TechnicianPage } from '../../pages/TechnicianPage';

Given('user has logged in as Technician', async function () {
  this.technicianPage = new TechnicianPage(this.page);
  await this.technicianPage.loginTechnician();
});

When('user navigate to Technician dashboard', async function () {
    await this.technicianPage.selectTechnicianRole();
});

Then('user should see the left side panel with sections:', async function (dataTable) {
  const sections = dataTable.raw().flat(); // ["Study", "Image Repository", "Analysis", "Configure"]
  for (const section of sections) {
    await this.technicianPage.verifyLeftPanelSection(section);
  }
});

Then('user should see the status dropdown with options', async function () {
    await this.technicianPage.verifyStatusDropdownOption();
});

Then('user should able to search text in search box', async function () {
    await this.technicianPage.verifySearchBox();
});

Then('user should see plus icon for create study', async function () {
    await this.technicianPage.displayCreateStudyIcon();
});

Then('user should view study table with columns:', async function (dataTable) {
  const study_cols = dataTable.raw().flat(); // ["Study No.", "Study Administrator", "Pathologist", "Slides Mapped", "QC Count", "Anomaly Count", "Total Oragn", "Success", "Species", "Status"]
  for (const col of study_cols) {
    await this.technicianPage.verifyStudyTableColumn(col);
  }
});

Then('user should able to navigate Image Repository section', async function () {
    await this.technicianPage.navigateToImageRepository();
});

Then('user should view Image Repository tab', async function () {
    await this.technicianPage.imageRepositoryTabDisplayed();
});

Then('user should view Search by Name text field', async function () {
    await this.technicianPage.verifySearchByNameTextBox();
});

Then('user navigates to any image repository', async function () {
    await this.technicianPage.navigateToAnyImageRepository();
});

Then('user view image list icon', async function () {
    await this.technicianPage.verifyImageListIconDisplayed();
});

Then('user should view image repository path', async function () {
    await this.technicianPage.verifyImageRepoPathDisplayed();
});

Then('user views images in list format', async function () {
    await this.technicianPage.verifyListView();
});

Then('user view image repository table with columns:', async function (dataTable) {
  const imag_cols = dataTable.raw().flat(); // ["Name", "Size","Date Modified"]
  for (const col of imag_cols) {
    await this.technicianPage.verifyImageTableColumn(col);
  }
});

Then('user should able to navigate to grid view', async function () {
    await this.technicianPage.navigateToGridView();
});

Then('user should view images in grid format', async function () {
     await this.technicianPage.verifyGridView();
});

Then('user verify images folder up to last folder in list format', async function () {
     await this.technicianPage.clickAndVerifyImgFolderListView();
});

Then('user should able to navigate back to image repository', async function () {
     await this.technicianPage.navigateToImgRepoBack();
});

Then('user verify images folder up to last folder in grid format', async function () {
     await this.technicianPage.clickAndVerifyImgFolderGridView();
});

Then('user navigate to Study section', async function () {
     await this.technicianPage.navigateToStudySection();
});

When('user select study status {string} from dropdown', async function (study_status) {
     await this.technicianPage.selectStudyStatus(study_status);
});

When('user search study by study number {string} in search box', async function (study_number) {
     await this.technicianPage.searchStudyByNumber(study_number);
});

Then('user should see study displayed on table with that study number', async function () {
     await this.technicianPage.verifyStudyDisplayed();
});

Then('user should see study status displayed on table as {string} for that {string}', async function (study_status, study_number) {
     await this.technicianPage.verifyStudyStatusDisplayed(study_status,study_number);
});



