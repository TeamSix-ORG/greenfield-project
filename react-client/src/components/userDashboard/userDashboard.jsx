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

  updateState(data) {
    if (data) {
      this.setState({
        eventsArr: data
      });
    }
  }

  toggleStates(e) {
    e.preventDefault();
    this.setState({
      redirectToAttendedEvents: true
    });
  }

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

  fetchUserEvent(data) {
    $.ajax({
      url: "/api/jointEventUser",
      type: "GET",
      success: results => {
        var arr = [];
        var array = [];
        for (let i = 0; i < results.length; i++) {
          if (results[i].userId === this.state.userId) {
            arr.push(results[i]);
          }
        }
        for (let j = 0; j < arr.length; j++) {
          for (let k = 0; k < data.length; k++) {
            if ( arr[j].eventId === data[k].id ) {
              console.log('hi')
              console.log(data.splice(k,1))
            }
          }
          }
        this.setState({ eventsArr: data })
      },
      error: err => {
        throw err;
      }
    });
  }

  render() {
    if (this.state.redirectToAttendedEvents) {
      this.setState({
        redirectToAttendedEvents: false
      });
      return (
        <Redirect
          to={{
            pathname: "/AttendedEvents"
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
