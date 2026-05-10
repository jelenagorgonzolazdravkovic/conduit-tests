Feature: Article management
  As a logged-in user
  I want to create and delete articles
  So that I can share content on the platform

  Scenario: Creating a new article
    Given the user is logged in
    And the user opens the editor for a new article
    When they fill in the article form and publish
    Then the article is successfully created

  Scenario: Deleting a created article
    Given the user is logged in
    And the user opens the editor for a new article
    When they fill in the article form and publish
    Then the article is successfully created
    And the delete button is visible
    When they click the delete article button
    Then the article is successfully deleted
