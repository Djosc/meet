import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {
	let EventWrapper;
	beforeAll(() => {
		EventWrapper = shallow(<Event event={mockData[0]} />);
	});

	test('renders summary', () => {
		expect(EventWrapper.find('.summary')).toHaveLength(1);
	});

	test('renders start date and timezone', () => {
		expect(EventWrapper.find('.start-date')).toHaveLength(1);
	});

	test('renders location', () => {
		expect(EventWrapper.find('.location')).toHaveLength(1);
	});

	test('renders show details button', () => {
		expect(EventWrapper.find('.show-details-btn')).toHaveLength(1);
	});

	test('event is collapsed by default', () => {
		expect(EventWrapper.state('collapsed')).toBe(true);
	});

	test('Clicking details button shows details', () => {
		EventWrapper.setState({
			collapsed: true,
		});
		EventWrapper.find('.show-details-btn').simulate('click');
		expect(EventWrapper.state('collapsed')).toBe(false);
	});

	test('Clicking hide details button hides details', () => {
		EventWrapper.setState({
			collapsed: false,
		});
		EventWrapper.find('.hide-details-btn').simulate('click');
		expect(EventWrapper.state('collapsed')).toBe(true);
	});
});
