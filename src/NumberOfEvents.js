import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
	render() {
		return (
			<div className="NumberOfEvents">
				<p className="pb-5">Number of Events:</p>
				<div className="error-wrapper">
					<ErrorAlert text={this.props.errorText} />
				</div>
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
