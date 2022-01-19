import React, { Component } from 'react';

class NumberOfEvents extends Component {
	// state = {
	// 	numberOfEvents: 32,
	// };

	// handleInput = (e) => {
	// 	this.setState({
	// 		numberOfEvents: e.target.value,
	// 	});
	// };

	render() {
		return (
			<div className="NumberOfEvents">
				<p>Number of Events:</p>
				<input
					type="text"
					className="NumberOfEventsInput"
					value={this.props.numberOfEvents}
					onChange={this.props.updateNumberOfEvents}
				/>
			</div>
		);
	}
}

export default NumberOfEvents;
