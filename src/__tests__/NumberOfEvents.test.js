import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
	let NumberOfEventsWrapper;
	beforeAll(() => {
		NumberOfEventsWrapper = shallow(<NumberOfEvents />);
	});

	test('renders text input', () => {
		expect(NumberOfEventsWrapper.find('.NumberOfEvents')).toHaveLength(1);
	});

	test('change state when input changes', () => {
		NumberOfEventsWrapper.setState({
			numberOfEvents: 32,
		});
		const eventObject = { target: { value: 5 } };
		NumberOfEventsWrapper.find('.NumberOfEventsInput').simulate('change', eventObject);
		expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(5);
	});
});
