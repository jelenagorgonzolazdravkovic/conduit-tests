Feature: User login
  As a registered user
  I want to log in to the platform
  So that I can use all available features

  Scenario: Successful login with valid credentials
    Given the user is on the login page
    When they enter valid credentials
    Then the user is successfully logged in

  Scenario: Failed login with a non-existent account
    Given the user is on the login page
    When they enter invalid credentials
    Then a login error is displayed

  Scenario: Failed login with a wrong password
    Given the user is on the login page
    When they enter the correct email but wrong password
    Then a login error is displayed
