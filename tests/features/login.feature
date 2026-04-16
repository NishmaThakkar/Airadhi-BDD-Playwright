Feature: Login and Logout
@test_one1
Scenario Outline: Successful login and logout
  Given I open the login page
  When I login with email "<email>" and password "<password>"
  Then I should be logged in
  When I logout from the application
  Then I should be logged out
  Examples:
  | email                              | password   |
  | nishma.thakkar@airamatrix.com      | Password@5 |

@test_one1
Scenario Outline: Invalid login attempts
  Given I open the login page
  When I login with incorrect email "<email>" and password "<password>"
  Then I should see a login error message

Examples:
  | email                          | password       |
  | wrong.email@airamatrix.com     | Password@5     |
  | nishma.thakkar@airamatrix.com  | WrongPass123   |
  | invalid.user@example.com       | Wrong@123      |
