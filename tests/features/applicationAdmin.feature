@application
Feature: Application Admin UI

Background:
  Given User launches the application
  And User enters valid credentials and is logged in sucessfully

@dashboard
Scenario: Admin can access dashboard and verify UI
    Given Application admin should be selected
    Then User should view below side panel:
      | Configure|
      | Users|
#      | Reassign|
    Then User should view all the tabs:
      |Field Configuration|
      |Data Configuration|
      |Mapping Structure|
      |Folder Location|

@updatetoggle
Scenario: Admin can update Field Configuration
  Given Admin is on Field Configuration tab
  When Admin updates the field configuration
  When Admin clicks on Save button
  Then Admin should see success message of toggle update

@verifytoggle
Scenario: Admin can verify Field Configuration toggle
  Given Admin is on Field Configuration tab
  When Admin verifies the state of the toggles
  
@addconfiguration
Scenario: Admin can add configuration in Data Configuration
  Given Application admin should be selected
  Given Admin is on Data Configuration tab
  When Admin clicks on Add Configuration button
  Then Admin fills the configuration details and saves

@deleteconfiguration
Scenario: Admin can delete configuration in Data Configuration
  Given Admin is on Data Configuration tab
  When Admin clicks on Delete button of a configuration

@mappingstructure
Scenario: Admin can add mapping structure
  Given Admin is on Mapping Structure tab
#  When Admin clicks on Add Configuration button
#  Then Admin fills the mapping structure details and saves

@createfolderlocation
Scenario: Admin can create folder location
  Given Admin is on Folder Location tab
  Then Admin should see search box
  When Admin clicks on Create button and fills the details
  When Admin clicks on Save button
  Then Admin should see success message of folder location creation

@deletefolderlocation
Scenario: Admin can delete folder location
  Given Admin is on Folder Location tab
  Then Admin should see search box
  When Admin clicks on Delete button of a folder location
 Then Admin should see success message of folder location deletion

@userpanel
Scenario: Admin can access User Panel and verify UI
  Given Admin is on User Panel
  Then Admin should see search box
#  Then User should view all the tabs:
#      | Active|
#      | Inactive|
  Then Admin should see user table with columns:
      | First Name|
      | Last Name|
      | Email ID        |
      | Creation Date  |
      | Roles         |

 @createusers
 Scenario: Admin can create user and verify duplicate user creation
  Given Admin is on User Panel
# Then User should see tabs:
  Then Admin should see search box
  When Admin clicks on Create User button and fills the details
  When Admin clicks on Save button for user
  Then Admin should see success message of user creation
  When Admin clicks on Inactive Tab
  Then Admin should see the created user in Inactive tab
  When Admin clicks on Create User button and fills the details
  When Admin clicks on Save button for user
  Then Admin should see error message of duplicate user creation
  
  @deactivateusers
  Scenario: Admin can deactivate user
  Given Admin is on User Panel
  Then Admin should see search box
  When Admin clicks on Deactivate button of a user
  Then Admin should see success message of user deactivation

  @activateusers
  Scenario: Admin can activate user
  Given Admin is on User Panel
  Then Admin should see search box
  When Admin clicks on Inactive Tab
  When Admin clicks on Activate button of a user
  Then Admin should see success message of user activation

@editusers
Scenario: Admin can edit user details
  Given Admin is on User Panel
  Then Admin should see search box
  When Admin clicks on Edit button of a user and updates the details
  When Admin clicks on Save button for user
 # Then Admin should see success message of user update