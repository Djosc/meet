import React from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './components/WelcomeScreen';

import { OfflineAlert } from './Alert';

import { extractLocations, getEvents, checkToken, getAccessToken } from './api';

import logo from './images/meet-logo.png';

class App extends React.Component {
	state = {
		events: [],
		locations: [],
		currentLocation: 'all',
		numberOfEvents: 32,
		errorText: '',
		offlineText: '',
		showWelcomeScreen: undefined,
	};

	async componentDidMount() {
		if (!navigator.onLine) {
			this.setState({
				offlineText:
					'You are offline. Event list is being displayed from the cache. You will not be able to load new events while offline.',
			});
		}

		this.mounted = true;
		const accessToken = localStorage.getItem('access_Token');
		const isTokenValid = (await checkToken(accessToken)).error ? false : true;
		const searchParams = new URLSearchParams(window.location.search);
		const code = searchParams.get('code');

		this.setState({ showWelcomeScreen: !(code || isTokenValid) });

		if ((code || isTokenValid) && this.mounted) {
			getEvents().then((events) => {
				if (this.mounted) {
					this.setState({
						events: events.slice(0, this.state.numberOfEvents),
						locations: extractLocations(events),
					});
				}
			});
		}
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

	// This, along with numberOfEvents and errorText is passed down to the
	// NumberOfEvents components.
	updateNumberOfEvents = (e) => {
		const value = e.target.value;
		if (value < 1 || value > 32 || /^-?\d+$/.test(value) !== true) {
			return this.setState({
				numberOfEvents: '',
				errorText: 'Please enter a number between 1 and 32.',
			});
		} else {
			this.setState({
				numberOfEvents: value,
				errorText: '',
			});
		}
		this.updateEvents(this.state.currentLocation, this.state.numberOfEvents);
	};

	render() {
		if (this.state.showWelcomeScreen === undefined) return <div className="App" />;

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
						errorText={this.state.errorText}
					/>
				</div>
				<div className="offline-alert-wrap">
					<OfflineAlert text={this.state.offlineText} />
				</div>
				<EventList events={this.state.events} />
				<WelcomeScreen
					showWelcomeScreen={this.state.showWelcomeScreen}
					getAccessToken={() => {
						getAccessToken();
					}}
				/>
			</div>
		);
	}
}

export default App;
