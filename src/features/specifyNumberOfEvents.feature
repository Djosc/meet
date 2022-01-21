Feature: Specify number of events

Scenario: 32 events should be displayed by default
Given the user is on the main page
When the data loads
Then 32 events should be displayed

Scenario: When the user changes the number of events, the number of events shown will change to the input number
Given the user is on the main page
When the user types a number into the textbox
Then the events list will show the specified number of events