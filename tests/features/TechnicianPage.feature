Feature: Technician

    Technician page functionality work as per expectations

#@dev
Scenario:  Verify dashboard UI for Technician role with Study section
Given user has logged in as Technician
When user navigate to Technician dashboard
And user navigate to Study section
Then user should see the status dropdown with options
And user should able to search text in search box
And user should see the left side panel with sections:
      | Study           |
      | Image Repository|
      | Analysis        |
      | Configure       |
And user should see plus icon for create study
And user should view study table with columns:
      | Study No.          |
      | Study Administrator|
      | Pathologist        |
      | Slides Mapped      |
      | #Organ             |
      | Analysis Completed |
      | Species            |
      | Status             |

#@dev
Scenario:  Verify dashboard UI for Technician role with Image Repository section
Given user has logged in as Technician
When user navigate to Technician dashboard
And user navigate to Study section
Then user should able to navigate Image Repository section
And user should view Image Repository tab
And user should view Search by Name text field
And user navigates to any image repository
And user view image list icon
And user should view image repository path
And user views images in list format
And user view image repository table with columns:
      | Name           |
      | Date Modified  |
      | Size           |
And user verify images folder up to last folder in list format
And user should able to navigate back to image repository
And user should able to navigate to grid view
And user should view images in grid format
And user verify images folder up to last folder in grid format

#@dev
Scenario Outline:  Verify study search on Technician dashboard
Given user has logged in as Technician
And user navigate to Technician dashboard
And user navigate to Study section
When user select study status "<study_status>" from dropdown
And user search study by study number "<study_number>" in search box
Then user should see study displayed on table with that study number
And user should see study status displayed on table as "<study_status>" for that "<study_number>"
Examples:
| study_status | study_number       |
| In Progress  | 	ET                |
| Created      |  Dosage            |

#@developed
Scenario: Verify view report popup for Technician role from three dot menu
Given user has logged in as Technician
And user navigate to Technician dashboard
And user navigate to Study section
And user has noted study no. and slides mapped for first study
When user click on three dots on right side of any study
Then user should click on view report option
And user should see view report popup header as "View Sync Report"
And user validate Study No. label is displayed with correct study number
And user validate image status dropdown is displayed with correct image status options:
      | All Images      |
      | Mapped Images   |
      | Unmapped Images |
And user validate image table with columns:
      | Subject ID  |
      | Image Name  |
      | Cassette ID |
      | Status      |
And user validate count of mapped images
And user validate count of unmapped images
And user validate total slide count is correct
And user verify images filter functionality in dropdown
#And user validate search functionality
And user validate Cancel and Download Report buttons are displayed

#@developed
Scenario: Verify slides mapped count inside study is correct
Given user has logged in as Technician
And user navigate to Technician dashboard
And user navigate to Study section
When user navigate inside the study
And user select "sex" from view by dropdown
And user noted total slide count inside study visiting each folder
And user click on Study Listing text
And user click on i icon of study
And user noted slides mapped count from slide details popup
And user click on three dots on right side of any study
And user should click on view report option
And user filters "Mapped Images" on view report
Then user verify that slides count from study and slides mapped count on details pop up are matched

#@developed
Scenario: Verify image details pop up from i icon
Given user has logged in as Technician
And user navigate to Technician dashboard
And user navigate to Study section
And user noted studyadmin, pathologist, species from study listing page
When user click on i icon of study
Then user validate slide details table with columns:
      | Image Name  |
      | Cassette ID |
      | Tissues     |
      | Sex         |
      | Subject ID  |
      | Dosage      |
And user validate studyadmin, pathologist, species from details pop up

#@developed
Scenario: Verify study folder level and slide level select all checkbox functionality
Given user has logged in as Technician
And user navigate to Technician dashboard
And user navigate to Study section
When user navigate inside the study
Then user verify view by dropdown present inside study
And user should view select All checkbox is working

#@developed
Scenario: Verify Dosage and Subject ID filter options are displayed correclty
Given user has logged in as Technician
And user navigate to Technician dashboard
And user navigate to Study section
When user navigate inside the study
And user navigate inside folder
And user noted dosage and subject id for all slides
And user click the filter
And user noted all dosage from slides
And user opens dosage dropdown 
And user noted all dosages from Dosage dropdown
And user noted all subject id from slides
And user click the filter
And user opens subject id dropdown
And user noted all subject id from Subject ID dropdown
Then user validate dropdown dosage values and slide dosage values are matched
And user validate dropdown subject id values and slide subject id values are matched

#@developed
Scenario: Verify filter functionality working for Dosage dropdown for multiple checked values
Given user has logged in as Technician
And user navigate to Technician dashboard
And user navigate to Study section
When user navigate inside the study
And user navigate inside folder
And user click the filter
And user noted all dosage from slides
And user opens dosage dropdown
And user noted all dosages from Dosage dropdown
Then user validate dosage filter is working as per expectations

#@developed
Scenario: Verify filter functionality working for Subject Id dropdown for multiple checked values
Given user has logged in as Technician
And user navigate to Technician dashboard
And user navigate to Study section
When user navigate inside the study
And user navigate inside folder
And user click the filter
And user noted all subject id from slides
And user opens subject id dropdown
And user noted all subject id from Subject ID dropdown
Then user validate subject id filter is working as per expectations

#@developed
Scenario: Verify filter functionality working properly for Dosage and Subject Id
Given user has logged in as Technician
And user navigate to Technician dashboard
And user navigate to Study section
When user navigate inside the study
And user navigate inside folder
And user noted dosage and subject id for all slides
And user picked any two slides dosage and subject id from slide to be filtered
And user click the filter
And user opens dosage dropdown
And user selects dosages from picked elements
And user click the filter
And user opens subject id dropdown
And user selects subject ids from picked elements
And user click the filter
Then user validates slides are displayed as per filter applied


