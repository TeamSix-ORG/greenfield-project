import React, { Component } from 'react';
import $ from 'jquery';
import { Redirect } from 'react-router-dom';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import axios from 'axios'

class OrganizerDashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			createEvent: false
		};
	}
	toggleStates(e) {
		e.preventDefault();
		this.setState({
			createEvent: true
		});
	}

	render() {
		if (this.state.createEvent) {
			this.setState({
				createEvent: false
			});
			return (
				<Redirect
					to={{
						pathname: '/AttendedEvents'
					}}
				/>
			);
		}
		return (
			<div>
				<h1>OrganizerDashboard</h1>
				<button type="submit" onClick={this.toggleStates.bind(this)}>
					Create new event
				</button>
			</div>
		);
	}
}

export default OrganizerDashboard;
