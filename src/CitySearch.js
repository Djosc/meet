import React, { Component } from 'react';
import { InfoAlert } from './Alert';

class CitySearch extends Component {
	constructor(props) {
		super(props);

		// Setup ref to know when the user clicks outside of the city search bar
		this.setWrapperRef = this.setWrapperRef.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
	}

	setWrapperRef(node) {
		this.wrapperRef = node;
	}

	state = {
		query: '',
		suggestions: [],
		showSuggestions: undefined,
		infoText: '',
	};

	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside);
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside);
	}

	// Check if user clicks outside of the city search bar. If so, hide suggestions
	handleClickOutside = (event) => {
		if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
			this.setState({
				showSuggestions: false,
			});
		}
	};

	handleInputChanged = (event) => {
		const value = event.target.value;
		this.setState({ showSuggestions: true });
		const suggestions = this.props.locations.filter((location) => {
			return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
		});
		if (suggestions.length === 0) {
			this.setState({
				query: value,
				infoText: 'We cannot find the city you are looking for. Please try another city.',
			});
		} else {
			return this.setState({ query: value, suggestions, infoText: '' });
		}
	};

	handleItemClicked = (suggestion) => {
		this.setState({
			query: suggestion,
			showSuggestions: false,
			infoText: '',
		});

		this.props.updateEvents(suggestion);
	};

	render() {
		return (
			<>
				<div className="CitySearch">
					<p className="pb-5">Search for a city...</p>
					<div className="error-wrapper">
						<InfoAlert text={this.state.infoText} />
					</div>
					<div className="ref-wrapper" ref={this.setWrapperRef}>
						<input
							size="lg"
							type="text"
							className="city"
							value={this.state.query}
							onChange={this.handleInputChanged}
							onFocus={() => {
								this.setState({ showSuggestions: true });
							}}
						/>
						<ul
							className="suggestions"
							style={this.state.showSuggestions ? {} : { display: 'none' }}
						>
							{this.state.suggestions.map((suggestion) => (
								<li
									value={suggestion}
									key={suggestion}
									onClick={() => this.handleItemClicked(suggestion)}
								>
									{suggestion}
								</li>
							))}
							<li key="all" onClick={() => this.handleItemClicked('all')}>
								<b>See all cities</b>
							</li>
						</ul>
					</div>
				</div>
			</>
		);
	}
}

export default CitySearch;
