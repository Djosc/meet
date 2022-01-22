import React, { Component } from 'react';

class NumberOfEvents extends Component {
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
