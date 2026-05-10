Feature: Commenting on articles
  As a logged-in user
  I want to leave a comment on an article
  So that I can interact with the content

  Scenario: Adding a comment to an article
    Given the user is logged in
    And the user opens the editor for a new article
    When they fill in the article form and publish
    Then the article is successfully created
    When they leave a comment on the article
    Then the comment is visible on the page
