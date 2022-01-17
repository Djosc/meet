import React, { Component } from 'react';

class NumberOfEvents extends Component {
	state = {
		numberOfEvents: 32,
	};

	handleInput = (e) => {
		this.setState({
			numberOfEvents: e.target.value,
		});
	};

	render() {
		return (
			<div className="NumberOfEvents">
				<p>Number of Events:</p>
				<input
					type="text"
					className="NumberOfEventsInput"
					value={this.state.numberOfEvents}
					onChange={(e) => this.handleInput(e)}
				/>
			</div>
		);
	}
}

export default NumberOfEvents;
