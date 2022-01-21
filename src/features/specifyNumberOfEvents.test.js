import React from 'react';
import { mount, shallow } from 'enzyme';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';
import { mockData } from '../mock-data';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
	test('32 events should be displayed by default', ({ given, when, then }) => {
		let AppWrapper;
		given('the user is on the main page', () => {
			AppWrapper = mount(<App />);
		});

		when('the data loads', () => {
			AppWrapper.update();
		});

		then('32 events should be displayed', () => {
			expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
		});
	});

	test('When the user changes the number of events, the number of events shown will change to the input number', ({
		given,
		when,
		then,
	}) => {
		let AppWrapper;
		given('the user is on the main page', () => {
			AppWrapper = mount(<App />);
		});

		when('the user types a number into the textbox', () => {
			AppWrapper.update();
			AppWrapper.find('.NumberOfEventsInput').simulate('change', {
				target: { value: '1' },
			});
		});

		then('the events list will show the specified number of events', () => {
			AppWrapper.update();
			expect(AppWrapper.find('.event')).toHaveLength(1);
		});
	});
});
