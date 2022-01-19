import React from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';

import { extractLocations, getEvents } from './api';

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

	updateEvents = (location) => {
		getEvents().then((events) => {
			const locationEvents =
				location === 'all'
					? events
					: events.filter((event) => event.location === location);
			if (this.mounted) {
				this.setState({
					events: locationEvents.slice(0, this.state.numberOfEvents),
					currentLocation: location,
				});
			}
		});
	};

	updateNumberOfEvents = (e) => {
		this.setState({
			numberOfEvents: e.target.value,
		});
		this.updateEvents(this.state.currentLocation);
	};

	render() {
		return (
			<div className="App">
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
