Feature: Login and Logout

Scenario: Successful login and logout
  Given I open the login page
  When I login with email "nishma.thakkar@airamatrix.com" and password "Password@5"
  Then I should be logged in
  When I logout from the application
  Then I should be logged out