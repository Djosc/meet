import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';

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
			<div className="event">
				<Card className="event-card">
					<Card.Body className="event-card__body">
						<Card.Title className="summary pb-3">{event.summary}</Card.Title>
						<Card.Subtitle className="start-date">
							{event.start.dateTime} {event.start.timeZone}
						</Card.Subtitle>

						<Card.Text className="location">{event.location}</Card.Text>

						{this.state.collapsed === false && (
							<Card.Text className="description">{event.description}</Card.Text>
						)}

						<Button
							variant="outline-dark"
							className={this.state.collapsed ? 'show-details-btn' : 'hide-details-btn'}
							onClick={this.handleClick}
						>
							{this.state.collapsed ? 'Show Details' : 'Hide Details'}
						</Button>
					</Card.Body>
				</Card>
			</div>
		);
	}
}

export default Event;
