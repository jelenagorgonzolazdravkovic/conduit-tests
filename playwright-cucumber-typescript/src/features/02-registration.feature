Feature: User registration
  As a new user
  I want to create an account on the platform
  So that I can join the community

  Scenario: Successful registration of a new user
    Given the user is on the registration page
    When they enter valid registration details
    Then the user is successfully registered
