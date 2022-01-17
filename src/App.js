import React from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';

import { extractLocations, getEvents } from './api';

class App extends React.Component {
	state = {
		events: [],
		locations: [],
	};

	componentDidMount() {
		this.mounted = true;
		getEvents().then((events) => {
			this.setState({ events, locations: extractLocations(events) });
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
			this.setState({
				events: locationEvents,
			});
		});
	};

	render() {
		return (
			<div className="App">
				<div className="top-bar-wrap">
					<CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
					<NumberOfEvents />
				</div>
				<EventList events={this.state.events} />
			</div>
		);
	}
}

export default App;
