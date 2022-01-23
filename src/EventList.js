import React, { Component } from 'react';
import { Container, Col, Row } from 'react-bootstrap';

import Event from './Event';

class EventList extends Component {
	render() {
		const { events } = this.props;
		return (
			<>
				{/* <Row className="justify-content-md-center"> */}
				<ul className="EventList py-4">
					<Container>
						<Row className="justify-content-center align-items-md-center">
							{events.map((event, id) => (
								<Col lg={4} md={6} sm={10} key={id}>
									<li key={event.id}>
										<Event event={event} />
									</li>
								</Col>
							))}
						</Row>
					</Container>
				</ul>
			</>
		);
	}
}

export default EventList;
