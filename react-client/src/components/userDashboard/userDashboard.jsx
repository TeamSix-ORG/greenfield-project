import React, { Component } from 'react';
import Search from './search.jsx';
import EventsList from './eventsList.jsx';
import $ from 'jquery';
import { Redirect } from 'react-router-dom';

import AttendedEvents from './attendedEvents.jsx';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import axios from 'axios'

class UserDashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			eventsArr: [],
			redirectToAttendedEvents: false,
			userId: ''
		};
	}
	//  UPDATING THE STATE OF THE ARRAY CALLED FROM THE SEARCH FUNCTION TO UPDATE THE VIEW
	updateState(data) {
		if (data) {
			this.setState({
				eventsArr: data
			});
		}
	}
	//  THIS FUNCTION IS USED TO TOGGLE THE REDIRECTION TO THE ATTENDED EVENTS
	toggleStates(e) {
		e.preventDefault();
		this.setState({
			redirectToAttendedEvents: true
		});
	}
	//  WHEN THE PAGE IS LOADED WE MAKE A REQUEST TO PULL THE WHOLE  DATA BASE AND THEN ON SUCCESS WE CALL THE FECH FUNCTION
	componentDidMount() {
		let User = {};
		if (localStorage && localStorage.getItem('user')) {
			User = JSON.parse(JSON.parse(localStorage.getItem('user')));
			this.setState({
				userId: User._id
			});
		}

		/*$.ajax({
			url: '/api/events',
			type: 'GET',
			success: (data) => {
				this.fetchUserEvent(data);
			},
			error: (err) => {
				throw err;
			}
		});*/
	}
	//  IT'S USED TO GET THE JOINT TABLE OF ALL THE EVENTS ATTENDED BY THE USER AND THEN FILTTERING IT OUT TO GET THE EVNTS THAT THE USER DIDN'T ATTEND TO
	fetchUserEvent(data) {
		$.ajax({
			url: '/api/jointEventUser',
			type: 'GET',
			success: (results) => {
				var arr = [];
				for (let i = 0; i < results.length; i++) {
					if (results[i].userId === this.state.userId) {
						arr.push(results[i]);
					}
				}
				for (let j = 0; j < arr.length; j++) {
					for (let k = 0; k < data.length; k++) {
						if (arr[j].eventId === data[k].id) {
							console.log('hi');
							console.log(data.splice(k, 1));
						}
					}
				}
				this.setState({ eventsArr: data });
			},
			error: (err) => {
				throw err;
			}
		});
	}
	//  IN THE RENDER FUNCTION WECHECK IF THE BUTTON IS CLICKED OR NOT SO WE CAN REDIRECT
	//  AND SEND THE DATA TO THE SEARCH
	//  IN THE EVENT LIST WE SEND THE FILTTERED DATA TO THE EVENTLIST COMPONENT TO VIEW IT
	render() {
		if (this.state.redirectToAttendedEvents) {
			this.setState({
				redirectToAttendedEvents: false
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
				<h1>userDashboard</h1>
				<div>
					<button type="submit" onClick={this.toggleStates.bind(this)}>
						Attended Events
					</button>
					<Search events1={this.updateState.bind(this)} />
					<EventsList events={this.state.eventsArr} />
				</div>
			</div>
		);
	}
}

export default UserDashboard;
