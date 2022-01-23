import React, { Component } from 'react';

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
		const suggestions = this.props.locations.filter((location) => {
			return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
		});
		this.setState({ query: value, suggestions });
	};

	handleItemClicked = (suggestion) => {
		this.setState({
			query: suggestion,
			showSuggestions: false,
		});

		this.props.updateEvents(suggestion);
	};

	render() {
		return (
			<div className="CitySearch">
				<p>Search for a city...</p>
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
		);
	}
}

export default CitySearch;
