import React, { PureComponent } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './components/WelcomeScreen';
import EventGenre from './EventGenre';

import { OfflineAlert } from './Alert';

import {
	ScatterChart,
	Scatter,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';

import { extractLocations, getEvents, checkToken, getAccessToken } from './api';

import logo from './images/meet-logo.png';
import { mockData } from './mock-data';

class App extends React.PureComponent {
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
		const accessToken = localStorage.getItem('access_token');
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

	getData = () => {
		const { locations, events } = this.state;
		const data = locations.map((location) => {
			const number = events.filter((event) => event.location === location).length;
			const city = location.split(', ').shift();
			return { city, number };
		});
		return data;
	};

	// This is so i can test locally without constantly deploying. When I
	// authenticate locally with Oauth2, i get redirected to the deployed site.
	// This is just a bad fix for that
	getMockData = () => {
		const locations = mockData.map((locale) => locale.location);
		const events = mockData.map((eve) => eve);
		const data = locations.map((location) => {
			const number = events.filter((event) => event.location === location).length;
			const city = location.split(', ').shift();
			return { city, number };
		});
		return data;
	};

	render() {
		const { locations, numberOfEvents, events } = this.state;

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
				<div className="data-vis-wrapper">
					<EventGenre events={events} />
					<ResponsiveContainer height={400} width={400}>
						<ScatterChart
							margin={{
								top: 20,
								right: 20,
								bottom: 20,
								left: 20,
							}}
						>
							<CartesianGrid />
							{/* data key should be city? city in the object? */}
							<XAxis type="category" dataKey="city" name="city" />
							<YAxis
								type="number"
								dataKey="number"
								name="number of events"
								allowDecimals={false}
							/>
							<Tooltip
								label=""
								cursor={{ strokeDasharray: '3 3' }}
								itemStyle={{ color: '#fff' }}
							/>
							<Scatter name="" data={this.getData()} fill="#fca311" />
							{/* <Scatter name="" data={this.getMockData()} fill="#fca311" /> */}
						</ScatterChart>
					</ResponsiveContainer>
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
