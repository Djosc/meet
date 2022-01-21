import React from 'react';
import { mount, shallow } from 'enzyme';
import { loadFeature, defineFeature } from 'jest-cucumber';

import App from '../App';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, (test) => {
	test('When user hasn’t clicked and event, details should be collapsed.', ({
		given,
		when,
		then,
	}) => {
		let AppWrapper;
		given('the main page is open', () => {
			AppWrapper = mount(<App />);
		});

		when('the user has not clicked an event', () => {});

		then('each event element should be collapsed', () => {
			expect(AppWrapper.find('.show-details-btn')).toHaveLength(0);
		});
	});

	test('When the user clicks the show details button, the element will expand', ({
		given,
		when,
		then,
	}) => {
		let AppWrapper;
		given('an event element is collapsed', async () => {
			AppWrapper = await mount(<App />);
		});

		when('the user clicks the show details button', () => {
			AppWrapper.update();
			expect(AppWrapper.find('.show-details-btn')).toHaveLength(2);
			AppWrapper.find('.show-details-btn').at(0).simulate('click');
		});

		then('event element should expand', () => {
			expect(AppWrapper.find('.hide-details-btn')).toHaveLength(1);
		});
	});

	test('When the user clicks the hide details button, the element will collapse', ({
		given,
		when,
		then,
	}) => {
		let AppWrapper;
		given('an event is expanded', async () => {
			AppWrapper = await mount(<App />);
			AppWrapper.update();
			AppWrapper.find('.show-details-btn').at(0).simulate('click');
			expect(AppWrapper.find('.show-details-btn')).toHaveLength(1);
		});

		when('the user clicks the hide details button', () => {
			AppWrapper.find('.hide-details-btn').at(0).simulate('click');
			expect(AppWrapper.find('.hide-details-btn')).toHaveLength(0);
		});

		then('the event element should collapse', () => {
			expect(AppWrapper.find('.hide-details-btn')).toHaveLength(0);
		});
	});
});
