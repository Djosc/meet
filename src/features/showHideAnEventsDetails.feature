Feature: Show/hide an events details

Scenario: When user hasn’t clicked and event, details should be collapsed.
Given the main page is open
When the user has not clicked an event
Then each event element should be collapsed

Scenario: When the user clicks the show details button, the element will expand
Given an event element is collapsed
When the user clicks the show details button
Then event element should expand

Scenario: When the user clicks the hide details button, the element will collapse
Given an event is expanded
When the user clicks the hide details button
Then the event element should collapse