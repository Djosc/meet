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
					<Container fluid>
						<Row className="justify-content-md-center">
							{events.map((event) => (
								<Col lg={5} md={4} sm={10}>
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
