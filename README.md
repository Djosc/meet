# Meet

This application is a Progressive Web App that is built with a Test Driven Development approach.

# User Scenarios and Stories


**FEATURE 2: SHOW/HIDE AN EVENT'S DETAILS**

Scenario 1: An event element is collapsed by default

- Given an user is on the main page
- When nothing is clicked
- Then the even element will be collapsed

Scenario 2: User can expand an event to see its details

- Given the user is looking for more details on an event
- When the user clicks the event
- Then the event details are shown

Scenario 3: User can collapse an event to hide its details

- Given the user wants to close the element
- When the user clicks again on the expanded event
- Then the expanded details element will collapse

User Story: As a user, I should be able to select an event to get more details about said event.


**FEATURE 3: SPECIFY NUMBER OF EVENTS**

Scenario 1: When user hasn’t specified a number, 32 is the default number

- Given the user has not specified a number other than the default
- When the user opens the page
- Then 32 events will be displayed

Scenario 2: User can change the number of events they want to see

- Given the user wants to change the number of events
- When the user clicks the selector element
- Then they will be able to select a number, which will update the main list

User Story: As a user, I should be able to specify how many events I want to see in the list so I can narrow in on the ones that are of interest.


**FEATURE 4: USE THE APP WHEN OFFLINE**

Scenario 1: Show cached data when there’s no internet connection

- Given the user is offline and still needs access to the data
- When the user opens the app and has cached data
- Then the app and data will still behave as expected


Scenario 2: Show error when user changes the settings (city, time range)

- Given the user is offline
- When the user changes which information is being shown
- Then there will be an error message

User Story: As a user, I should still be able to see relevant data even when offline.


**FEATURE 5: DATA VISUALIZATION**

Scenario 1: Show a chart with the number of upcoming events in each city

- Given the user is viewing the list of events for a city
- When they want to see the data visualized
- Then the chart will be displayed for the use

User Story: As a user, I should be able to get a visualization overview of when the events are taking place so I can quickly find events I can attend.
