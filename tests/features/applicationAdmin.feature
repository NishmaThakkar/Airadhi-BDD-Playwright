@application
Feature: Application Admin UI

Background:
  Given User launches the application
  And User enters valid credentials and is logged in sucessfully

@dashboard
Scenario: Admin can access dashboard
    Given Application admin should be selected
    Then User should see Configure, Users, Reassign in Side Panel
    Then User should see Field Configuration, Data Configuration, Mapping Structure, Folder Location in Tabs

@updatetoggle
Scenario: Admin can update Field Configuration
  Given Admin is on Field Configuration tab
  When Admin updates the field configuration
  Then Admin should see success message

@verifytoggle
Scenario: Admin can verify Field Configuration toggle
  Given Admin is on Field Configuration tab
  When Admin verifies the state of the toggles
  
