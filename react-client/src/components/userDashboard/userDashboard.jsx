import React, { Component } from "react";
import Search from "./search.jsx";
import EventsList from "./eventsList.jsx";
import $ from "jquery";
import { Redirect } from "react-router-dom";

import AttendedEvents from "./attendedEvents.jsx";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import axios from 'axios'

class UserDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventsArr: [],
      redirectToAttendedEvents: false,
      userId: "5e148bf8fc13ae0c40000006"
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
  // toggleStates(e) {
  //   e.preventDefault();
  //   this.setState({
  //     redirectToAttendedEvents: true
  //   });
  // }
  //  WHEN THE PAGE IS LOADED WE MAKE A REQUEST TO PULL THE WHOLE MOVIE DATA BASE AND THEN ON SUCCESS WE CALL THE FECH FUNCTION
  componentDidMount() {
    $.ajax({
      url: "/api/events",
      type: "GET",
      success: data => {
        this.fetchUserEvent(data);
        // this.setState({
        //   eventsArr: data
        // });
      },
      error: err => {
        throw err;
      }
    });
  }
  //  IT'S USED TO GET THE JOINT TABLE OF ALL THE EVENTS ATTENDED BY THE USER AND THEN FILTTERING IT OUT TO GET THE EVNTS THAT THE USER DIDN'T ATTEND TO
  fetchUserEvent(data) {
    $.ajax({
      url: "/api/jointEventUser",
      type: "GET",
      success: results => {
        var arr = [];
        for (let i = 0; i < results.length; i++) {
          if (results[i].userId === this.state.userId) {
            arr.push(results[i]);
          }
        }
        for (let j = 0; j < arr.length; j++) {
          for (let k = 0; k < data.length; k++) {
            if (arr[j].eventId === data[k].id) {
              console.log("hi");
              console.log(data.splice(k, 1));
            }
          }
        }
        this.setState({ eventsArr: data });
      },
      error: err => {
        throw err;
      }
    });
  }
  //  IN THE RENDER FUNCTION WECHECK IF THE BUTTON IS CLICKED OR NOT SO WE CAN REDIRECT
  //  AND SEND THE DATA TO THE SEARCH
  //  IN THE EVENT LIST WE SEND THE FILTTERED DATA TO THE EVENTLIST COMPONENT TO VIEW IT
  render() {
    // if (this.state.redirectToAttendedEvents) {
    //   this.setState({
    //     redirectToAttendedEvents: false
    //   });
    //   return (
    //     <Redirect
    //       to={{
    //         pathname: "/AttendedEvents"
    //       }}
    //     />
    //   );
    // }
    return (
      // <div>
      //   <h1>userDashboard</h1>
      //   <div>
      //     <button type="submit" onClick={this.toggleStates.bind(this)}>
      //       Attended Events
      //     </button>
      //     <Search events1={this.updateState.bind(this)} />
      //     <EventsList events={this.state.eventsArr} />
      //   </div>
      // </div>
      <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <a class="navbar-brand" href="/userdashboard">
          Home
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarColor01">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <a
                class="nav-link"
                href="/attendedevents"
                // onClick={this.toggleStates.bind(this)}
              >
                Attended Events
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/profile">
                Profile
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                About
              </a>
            </li>
          </ul>
          <Search events1={this.updateState.bind(this)} />
        </div>
      </nav>
      <EventsList events={this.state.eventsArr} /></div>
    );
  }
}

export default UserDashboard;
