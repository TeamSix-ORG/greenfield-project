import React, { Component } from "react";
import $ from 'jquery'
import EventsList from './eventsList.jsx'
import Search from "./search.jsx";
import  { Redirect } from 'react-router-dom'


class AttendedEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "5e148bf8fc13ae0c40000000",
      attendedArr: [],
      redirectToUserDashboard: false

    };
  }

  toggleStates(e){
    e.preventDefault()
    this.setState({
      attendedEvents: false,
      dashboard: true
    });
  }

  componentDidMount() {
    $.ajax({
      url: "/api/jointEventUser",
      type: "POST",
      data: this.state.userId,
      success: data => {
        this.setState({ attendedArr: data });
      },
      error: err => {
        throw err;
      }
    });
  }


  toggleStates(e){
    e.preventDefault()
    this.setState({
      redirectToUserDashboard: true
      
    });
  }






  render() {

    if(this.state.redirectToUserDashboard){
        this.setState({
            redirectToUserDashboard: false
        })
        return  <Redirect to={{
          pathname: '/UserDashboard',
          
        }} />
    }

    return (
      <div>
          <div>

        <button type="submit" onClick={this.toggleStates.bind(this)}>
          Dashboard
        </button>
        <h1>hit</h1>

        <script>{console.log(this.state.attendedArr)}</script>
          </div> 
        
      </div>
    );
  }
}

export default AttendedEvents;
