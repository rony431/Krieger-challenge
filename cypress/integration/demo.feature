Feature: Testing Höffner
  Scenario: Verify subscription functional
    Given a Höffner login page 
    Then I open a page 
    Then I can see a newsletter subscription input
    When I enter my email in the input field 
    And I press Absenden button
    Then I can see a confirmation message that my subscription is in progress 
    Then I receive an email asking to confirm my email
    When I open the email
    Then There is a link to finish registration process
    When I click Jetzt Anmeldung abschließen
    Then I am redirected to page confirming subscription