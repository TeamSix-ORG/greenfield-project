import React, { Component } from "react";
import $ from "jquery";
import EventsList from "./eventsList.jsx";
import Search from "./search.jsx";
import { Redirect } from "react-router-dom";
import axios from "axios";
import ReactPlayer from "react-player";
import NavBar from "./navBar.jsx";

class AttendedEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      attendedArr: [],
      redirectToUserDashboard: false
    };
  }

  toggleStates(e) {
    e.preventDefault();
    this.setState({
      attendedEvents: false,
      dashboard: true
    });
  }

  componentDidMount() {
    let User = {};
    if (localStorage && localStorage.getItem("user")) {
      User = JSON.parse(JSON.parse(localStorage.getItem("user")));
      this.setState({
        userId: User._id
      });
    }
    axios.post(`/api/profile/${User._id}`).then(res => {
      const data = res.data;
      axios.get(`/api/events`).then(res => {
        const events = res.data;
        var array = [];
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < events.length; j++) {
            if (data[i] === events[j].id) {
              array.push(events[j]);
            }
          }
        }
        this.setState({ attendedArr: array });
      });
    });
  }

  toggleStates(e) {
    e.preventDefault();
    this.setState({
      redirectToUserDashboard: true
    });
  }

  render() {
    const container = {
      margin: "50px auto 0",
      width: "700px",
      boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)"
    };

    const ps = {
      padding: "2px 16px"
    };

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
        <NavBar />
        {/* <button type="submit" onClick={this.toggleStates.bind(this)}>
          Dashboard
        </button> */}
        <div>
          {this.state.attendedArr.map((attended, index) => {
            return (
              <div key={index} style={container}>
                <img src={attended.imgUrl[0]} style={{ width: "100%" }} />
                <h1>{attended.eventName}</h1>
                <h4>Date: {attended.date}</h4>

                <ReactPlayer url={attended.videos[0]} />
                <p style={ps}>Category:{attended.category}</p>
                <p style={ps}>Description: {attended.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default AttendedEvents;
