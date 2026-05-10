Feature: Liking articles
  As a logged-in user
  I want to like articles I enjoy
  So that I can mark my favourite content

  Scenario: Liking an article on the home page
    Given the user is logged in
    And the user is on the home page
    When they click like on the first article
    Then the like count has changed
