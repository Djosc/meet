import React, { Component } from 'react';

class Alert extends Component {
	constructor(props) {
		super(props);
		this.color = null;
		this.fontSize = null;
		this.position = null;
	}

	getStyle = () => {
		return {
			color: this.color,
			fontSize: this.fontSize,
			position: this.position,
			marginLeft: this.marginLeft,
			marginBottom: this.marginBottom,
			paddingTop: this.paddingTop,
		};
	};

	render() {
		return (
			<div className="Alert">
				<p style={this.getStyle()}>{this.props.text}</p>
			</div>
		);
	}
}

class InfoAlert extends Alert {
	constructor(props) {
		super(props);
		this.color = 'white';
		this.fontSize = '12px';
		this.position = 'absolute';
	}
}

class ErrorAlert extends Alert {
	constructor(props) {
		super(props);
		this.color = 'red';
		this.fontSize = '12px';
		this.position = 'absolute';
		this.marginLeft = '45px';
	}
}

class OfflineAlert extends Alert {
	constructor(props) {
		super(props);
		this.color = 'red';
		this.fontSize = '16px';
		this.marginBottom = '0';
		this.paddingTop = '1rem';
	}
}

export { InfoAlert, ErrorAlert, OfflineAlert };

export default Alert;
