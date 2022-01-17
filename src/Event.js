import React, { Component } from 'react';

class Event extends Component {
	state = {
		collapsed: true,
	};

	handleClick = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	};

	render() {
		const { event } = this.props;

		return (
			<div className="Event">
				<h1 className="summary">{event.summary}</h1>
				<p className="start-date">
					{event.start.dateTime} {event.start.timeZone}
				</p>

				<p className="location">{event.location}</p>

				{this.state.collapsed === false && (
					<p className="description">{event.description}</p>
				)}

				<button
					className={this.state.collapsed ? 'show-details-btn' : 'hide-details-btn'}
					onClick={this.handleClick}
				></button>
			</div>
		);
	}
}

export default Event;
