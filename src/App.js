import React from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';

import { Container, Row } from 'react-bootstrap';

import { extractLocations, getEvents } from './api';

import logo from './images/meet-logo.png';

class App extends React.Component {
	state = {
		events: [],
		locations: [],
		currentLocation: 'all',
		numberOfEvents: 32,
	};

	componentDidMount() {
		this.mounted = true;
		getEvents().then((events) => {
			if (this.mounted) {
				this.setState({
					events: events.slice(0, this.state.numberOfEvents),
					locations: extractLocations(events),
				});
			}
		});
	}

	componentWillUnmount() {
		this.mounted = false;
	}

	updateEvents = (location, eventCount) => {
		getEvents().then((events) => {
			const locationEvents =
				location === 'all'
					? events
					: events.filter((event) => event.location === location);
			if (eventCount !== this.state.numberOfEvents) {
				this.setState({
					events: locationEvents.slice(0, this.state.numberOfEvents),
					currentLocation: location,
				});
			} else {
				this.setState({
					events: locationEvents,
					currentLocation: location,
				});
			}
		});
	};

	updateNumberOfEvents = (e) => {
		this.setState({
			numberOfEvents: e.target.value,
		});
		this.updateEvents(this.state.currentLocation, this.state.numberOfEvents);
	};

	render() {
		return (
			<div className="App">
				<div className="meet-logo-div">
					<img src={logo} alt="meet logo" />
				</div>
				<div className="top-bar-wrap">
					<CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
					<NumberOfEvents
						numberOfEvents={this.state.numberOfEvents}
						updateNumberOfEvents={(e) => this.updateNumberOfEvents(e)}
					/>
				</div>
				<EventList events={this.state.events} />
			</div>
		);
	}
}

export default App;
