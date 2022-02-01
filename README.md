# Meet
![meet-main-scrnshot](https://user-images.githubusercontent.com/89062671/152058934-4b644dad-e56f-4e42-9b61-7fc0bc62450f.png)

Link to the live version: [Meet](https://djosc.github.io/meet/)

# Summary

Meet is a React application that retrieves data from the Google Calendar API about upcoming events related to Web Development. It uses Google Oauth2.0 in combination with serverless AWS Lambda functions to authenticate user logins. This is a Progressive Web App, built with a focus on Test Driven Development using Jest, Enzyme and Puppeteer. It also uses the react Recharts library to visualize the event data.

# Technologies Used

- React
- Google Oauth2.0
- Serverless
- AWS Lambda Functions
- Jest
- Enzyme
- Puppeteer

# Lessons Learned

Having a full set of mock data to use is extremely helpful when doing unit, acceptance and end-to-end testing, as well as testing in an local environment. Also, having more logic in place for testing in a local environment (such as bypassing Google OAuth2.0 or having functions to populate my components with mock data) would save me from constantly deploying when I would want to test my changes.

# User Scenarios and Stories

**FEATURE 1: FILTER EVENTS BY CITY**

Scenario 1: When user hasn't searched for a city, events from all cities should be shown

Scenario 2: User should see a list of suggestions when they search for a city

Scenario 3: User can select a city from the suggested list

User Story: As a user, I should be able to either view events from all cities, or search for a specific city.

**FEATURE 2: SHOW/HIDE AN EVENT'S DETAILS**

Scenario 1: An event element is collapsed by default

Scenario 2: User can expand an event to see its details

Scenario 3: User can collapse an event to hide its details

User Story: As a user, I should be able to select an event to get more details about said event.

**FEATURE 3: SPECIFY NUMBER OF EVENTS**

Scenario 1: When user hasn’t specified a number, 32 is the default number

Scenario 2: User can change the number of events they want to see

User Story: As a user, I should be able to specify how many events I want to see in the list so I can narrow in on the ones that are of interest.

**FEATURE 4: USE THE APP WHEN OFFLINE**

Scenario 1: Show cached data when there’s no internet connection

Scenario 2: Show error when user changes the settings (city, time range)

User Story: As a user, I should still be able to see relevant data even when offline.

**FEATURE 5: DATA VISUALIZATION**

Scenario 1: Show a chart with the number of upcoming events in each city

User Story: As a user, I should be able to get a visualization overview of when the events are taking place so I can quickly find events I can attend.
