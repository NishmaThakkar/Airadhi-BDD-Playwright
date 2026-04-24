@study
Feature: Study creation workflow

Background:
  Given User launches the application
  And User enters valid credentials and is logged in sucessfully
  And User navigates to technician role
  And User clicks on "Create Study" button

Scenario Outline: Create a study with multiple slides having different tissues for an animal ID
  Given User selects a template "<Template_Name>" and upload a valid study data file "<Excel_File_Path>"
  When User enters study details
  And User clicks on "Next" button
  And User clicks on "Save & Finish" button

Examples:
|Template_Name | Excel_File_Path  |
| 15Fields  | 1AnimalID6organs.csv |

