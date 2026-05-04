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

When('user has noted study no. and slides mapped for first study', async function () {
     await this.technicianPage.userHasNotedStudyNoAndSlidesMapped();
});

When('user click on three dots on right side of any study', async function () {
     await this.technicianPage.clickThreeDotsOnStudy();
});

Then('user should click on view report option', async function () {
     await this.technicianPage.clickViewReportOption();
});

Then('user should see view report popup header as {string}', async function (popup_header) {
     await this.technicianPage.verifyViewReportPopupDisplayed(popup_header);
});

Then('user validate Study No. label is displayed with correct study number', async function () {
     await this.technicianPage.verifyCorrectStudyNumberDisplayed();
});

Then('user validate image status dropdown is displayed with correct image status options:', async function (dataTable) {
    const image_status_options = dataTable.raw().flat().map((opt: string) => opt.trim());
    await this.technicianPage.verifyImageStatusOptions(image_status_options);
});

Then('user validate image table with columns:', async function (dataTable) {
     const imag_report_cols = dataTable.raw().flat(); // ["Subject ID", "Image Name","Cassette ID","Status"]
     for (const col of imag_report_cols) {
     await this.technicianPage.verifyImageTableColumns(col);
  }
});

Then('user validate total slide count is correct', async function(){
     await this.technicianPage.verifyTotalSlidesOnViewReport();          
});

Then('user validate count of mapped images', async function(){
     await this.technicianPage.verifyCountOfMappedImages();
});

Then('user validate count of unmapped images', async function(){
     await this.technicianPage.verifyCountOfUnmappedImages();          
});

Then('user validate Cancel and Download Report buttons are displayed', async function(){
     await this.technicianPage.verifyCancelAndDownloadButtons();          
});

Then('user verify images filter functionality in dropdown', async function(){
     await this.technicianPage.verifyImageFilterFunctionality();          
});

When('user navigate inside the study', async function(){
     await this.technicianPage.navigateInsideStudy();
});

When('user select {string} from view by dropdown', async function(value){
     await this.technicianPage.selectValuefromViewByDropdown(value);
});

When('user noted total slide count inside study visiting each folder', async function(){
     await this.technicianPage.noteTotalSlidesInSlideFolder();
});

When('user click on Study Listing text', async function(){
     await this.technicianPage.clickStudyListingText();
});

When('user click on i icon of study', async function(){
     await this.technicianPage.clickiIconOnStudy();
});

When('user noted slides mapped count from slide details popup', async function(){
     await this.technicianPage.noteSlidesMappedOnDetailsPopup();
});

When('user filters {string} on view report', async function(mapped_img){
     await this.technicianPage.filterImagesOnViewReport(mapped_img);
});

Then('user verify that slides count from study and slides mapped count on details pop up are matched', async function(){
     await this.technicianPage.verifySlideCountsMatched();
});

Then('user validate slide details table with columns:', async function (dataTable) {
     const slide_details_cols = dataTable.raw().flat(); // 	[Image Name, Cassette ID, Tissues, Sex, Subject ID, Dosage]
     for (const col of slide_details_cols) {
     await this.technicianPage.verifySlideDetailTableColumns(col);
  }
});

When('user noted studyadmin, pathologist, species from study listing page', async function(){
     await this.technicianPage.noteStudyRoleFromStudyList();
});

When('user validate studyadmin, pathologist, species from details pop up', async function(){
     await this.technicianPage.verifyStudyRoleFromDetails();
});

Then('user verify view by dropdown present inside study', async function(){
     await this.technicianPage.verifyViewByDropdownInStudy();
});

Then('user should view select All checkbox is working', async function(){
     await this.technicianPage.verifySelectAllCheckBox();
});