import React, { Component } from "react";
import Search from "./search.jsx";
import EventsList from "./eventsList.jsx";
import $ from "jquery";
import  { Redirect } from 'react-router-dom'

import AttendedEvents from "./attendedEvents.jsx";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import axios from 'axios'

class UserDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventsArr: [],
      // attendedEvents: false,
      // dashboard: true
      redirectToAttendedEvents:false
    };
  }

  updateState(data) {
    if (data) {
      this.setState({
        eventsArr: data
      });
    }
  }

  toggleStates(e){
    e.preventDefault()
    this.setState({
      redirectToAttendedEvents: true
      
    });
  }

  componentDidMount() {
    $.ajax({
      url: "/api/events",
      type: "GET",
      success: data => {
        this.setState({
          eventsArr: data
        });
      },
      error: err => {
        throw err;
      }
    });
  }

  render() {
    if(this.state.redirectToAttendedEvents){
			this.setState({
				redirectToAttendedEvents: false
			})
			return  <Redirect to={{
			  pathname: '/AttendedEvents',
			  
			}} />
		}
    return (
      <div>
        <h1>userDashboard</h1>
          <div>
          <button type="submit" onClick={this.toggleStates.bind(this)}>Attended Events</button>
            <Search events1={this.updateState.bind(this)} />
            <EventsList events={this.state.eventsArr} />

          </div>
      </div>
    );
  }
}

export default UserDashboard;
