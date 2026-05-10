@api
Feature: API tests
  As a tester
  I want to test the Conduit REST API directly
  So that I can verify the backend works correctly

  Scenario: Successful login via API returns a JWT token
    When I send a login API request with valid credentials
    Then the response has status 200
    And the response contains a JWT token

  Scenario: Failed login via API returns an error
    When I send a login API request with invalid credentials
    Then the response has status 403

  Scenario: Fetching the article list does not require authentication
    When I send a GET request for the article list
    Then the response has status 200
    And the response contains a list of articles

  Scenario: Creating an article via API requires authentication
    Given the user is authenticated via API
    When I send a request to create an article via API
    Then the response has status 201
    And the response contains the title of the created article

  Scenario: Deleting an article via API
    Given the user is authenticated via API
    And an article exists created via API
    When I send a request to delete that article via API
    Then the response has status 204
