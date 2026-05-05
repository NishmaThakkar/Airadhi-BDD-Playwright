@application
Feature: Application Admin UI

Background:
  Given User launches the application
  And User enters valid credentials and is logged in sucessfully

Scenario: Admin can access dashboard
    Given Application admin should be selected
    Then User should see Configure, Users, Reassign in Side Panel
    Then User should see Field Configuration, Data Configuration, Mapping Structure, Folder Location in Tabs
#    And Admin should have access to user management

#Scenario: Admin can manage users
 # When Admin navigates to user management
  #Then Admin should see list of users
