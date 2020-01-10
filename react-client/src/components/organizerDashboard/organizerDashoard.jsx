import React, { Component } from 'react';
import $ from 'jquery';
import { Redirect } from 'react-router-dom';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import axios from 'axios'

class OrganizerDashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div>
				<h1>OrganizerDashboard</h1>
			</div>
		);
	}
}

export default OrganizerDashboard;
