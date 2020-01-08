import React, { Component } from "react";
import $ from "jquery";
import EventsList from "./eventsList.jsx";
import Search from "./search.jsx";
import { Redirect } from "react-router-dom";

class AttendedEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: "5e148bf8fc13ae0c40000000",
            attendedArr: [],
            redirectToUserDashboard: false
        };
        window.attendedArr = this.state.attendedArr
    }

  toggleStates(e) {
    e.preventDefault();
    this.setState({
      attendedEvents: false,
      dashboard: true
    });
  }

  componentDidMount() {
    $.ajax({
      url: "/api/jointEventUser",
      type: "GET",
      success: data => {
        var arr = [];
        for (var i = 0; i < data.length; i++) {
          if (data[i].userId === this.state.userId) {
            arr.push(data[i].eventId);
        }
    }
        this.fetchEvents(arr);
      },
      error: err => {
        throw err;
      }
    });
  }

  fetchEvents(arr) {
    $.ajax({
      url: "/api/events",
      type: "GET",
      success: results => {
        var array = [];
        for (var i = 0; i < results.length; i++) {
          for (let j = 0; j < results.length; j++) {
              console.log(results[j].id === arr[i], results[j].id ,arr[i])
            if (results[j].id === arr[i]) {
              array.push(results[j]);
            }
          }
        }
        console.log(array)
        this.setState({ attendedArr: array });
      }
    });
  }

  toggleStates(e) {
    e.preventDefault();
    this.setState({
      redirectToUserDashboard: true
    });
  }

  render() {
    if (this.state.redirectToUserDashboard) {
      this.setState({
        redirectToUserDashboard: false
      });
      return (
        <Redirect
          to={{
            pathname: "/UserDashboard"
          }}
        />
      );
    }

    return (
      <div>
        <button type="submit" onClick={this.toggleStates.bind(this)}>
          Dashboard
        </button>
        <div>
          {this.state.attendedArr.map((attended, index) => {
           return ( <div key={index}>
                <img
              src={attended.imgUrl[0]}
            />
            <h3>{attended.eventName}</h3>
            <h3>{attended.date}</h3>
            <p>{attended.description}</p>
            <p>{attended.videos[0]}</p>
            <p>{attended.category}</p>
            <p>{attended.description}</p> 
           </div>  )
          })}
        </div>
      </div>
    );
  }
}
export default AttendedEvents;
