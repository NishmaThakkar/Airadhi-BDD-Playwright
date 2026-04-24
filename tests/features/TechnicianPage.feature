Feature: Technician

    Technician page functionality work as per expectations

@runall
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

@runall
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

@runall
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
| In Progress  | 	3232_1            |
| Created      |  Dosage            |

@developing
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


@Technician_ui2
Scenario:  Verify Study three dot menu in Technician Role for 0 mapped slides
Given user has logged in as Technician
And user navigate to Technician dashboard
When user click on three dots on right side of Technician dashboard
#Then user should see below options on menu in case zero slides mapped:
      | Edit        |
      | Delete      |
      | Sync Images |
      | View Report |

@Technician_ui2
Scenario:  Verify Study three dot menu in Technician Role more than 0 and less than total mapped slides
Given user has logged in as Technician
And user navigate to Technician dashboard
When user click on three dots on right side of Technician dashboard
#Then user should see below options on menu in case more than 0 and less than total mapped slides:
      | Sync Images |
      | View Report |

@Technician_ui2
Scenario:  Verify Study three dot menu in Technician Role for all mapped slides
Given user has logged in as Technician
And user navigate to Technician dashboard
When user click on three dots on right side of Technician dashboard
#Then user should see below options on menu in case all slides mapped:
      | View Report |


