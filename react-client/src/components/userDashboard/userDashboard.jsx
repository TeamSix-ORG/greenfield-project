import React, { Component } from "react";
import Search from "./search.jsx";
import EventsList from "./eventsList.jsx";
import $ from "jquery";
// import axios from 'axios'

class UserDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventsArr: []
    };
  }

  updateState(data){
     
      if(data){
          this.setState({
              eventsArr: data
          })

      }

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
  
  // axios.get('/events')
  // .then(response => {
  //   console.log(response)
  // })
  // .catch(err => {
  //   console.log(err)
  // })
  }

  render() {
    return (
      <div>
        <h1>userDashboard</h1>
        {console.log(this.state.eventsArr)}
        <Search events={this.updateState.bind(this)} />
        <EventsList events={this.state.eventsArr} />
        <div>{/* user profile properties */}</div>
      </div>
    );
  }
}

export default UserDashboard;
