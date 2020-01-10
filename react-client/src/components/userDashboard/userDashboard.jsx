import React, { Component } from "react";
import Search from "./search.jsx";
import EventsList from "./eventsList.jsx";
import $ from "jquery";
import { Redirect } from "react-router-dom";

import AttendedEvents from "./attendedEvents.jsx";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import axios from "axios";

class UserDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventsArr: [],
      redirectToAttendedEvents: false,
      userId: ""
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
    if (localStorage && localStorage.getItem("user")) {
      User = JSON.parse(JSON.parse(localStorage.getItem("user")));
      this.setState({
        userId: User._id
      });
    }
    axios.get("/api/events").then(res => {
      var events = res.data;
      axios.get("/api/jointEventUser").then(data => {
        var joint = data.data;
        var arr = [];
        for (let i = 0; i < joint.length; i++) {
          if (joint[i].userId === this.state.userId) {
            arr.push(joint[i]);
          }
        }
        for (let j = 0; j < arr.length; j++) {
          console.log("hi");
          for (let k = 0; k < events.length; k++) {
            if (arr[j].eventId === events[k].id) {
              events.splice(k, 1);
            }
          }
        }

        this.updateState(events);
      });
    });
  }

  //  IN THE RENDER FUNCTION WECHECK IF THE BUTTON IS CLICKED OR NOT SO WE CAN REDIRECT
  //  AND SEND THE DATA TO THE SEARCH
  //  IN THE EVENT LIST WE SEND THE FILTTERED DATA TO THE EVENTLIST COMPONENT TO VIEW IT
  render() {
    // if (this.state.redirectToAttendedEvents) {
    // 	this.setState({
    // 		redirectToAttendedEvents: false
    // 	});
    // 	return (
    // 		<Redirect
    // 			to={{
    // 				pathname: '/AttendedEvents'
    // 			}}
    // 		/>
    // 	);
    // }
    // return (
    // 	<div>
    // 		<h1>userDashboard</h1>
    // 		<div>
    // 			<button type="submit" onClick={this.toggleStates.bind(this)}>
    // 				Attended Events
    // 			</button>
    // 			<Search events1={this.updateState.bind(this)} />
    // 			<EventsList events={this.state.eventsArr} />
    // 		</div>
    // 	</div>
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <a className="navbar-brand" href="/userdashboard">
            Home
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="/attendedevents"
                  // onClick={this.toggleStates.bind(this)}
                >
                  Attended Events
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/profile">
                  Profile
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Logout
                </a>
              </li>
            </ul>
            <Search events1={this.updateState.bind(this)} />
          </div>
        </nav>
        <EventsList events={this.state.eventsArr} />
      </div>
    );
  }
}

export default UserDashboard;
