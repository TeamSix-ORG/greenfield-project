import React, { Component } from "react";
import Attend from "./attend.jsx";
import EventsList from './eventsList.jsx'
import $ from 'jquery'

class MoreInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event1: [],
      moreInfo: true,
      attendMoney: false
    };
  }


  attendToggler(e) {
    // Send request to the backend with the id of the event and user id
      var obj = {};
      obj.userId = "5e148bf8fc13ae0c40000006"
      obj.eventId = this.props.eventDescription[this.props.index].id;;
      console.log(obj , this.props.userId)
      $.ajax({
        url: "/api/jointEventUser",
        type: "POST",
        data: obj,
        success: data => {
          console.log(data)
          if (data === "Joined") {
            this.setState({
              attend: false,
              home: true
            });
          }
        },
        error: (err) => {
            throw err
        }
      });

      this.updateState()
    }

updateState(e) {
  // e.preventDefault();
  this.setState({
    moreInfo: false,
    home: true
  });
}
   
  
  attendTogglerMoney(e) {
    e.preventDefault();
    this.setState({
      moreInfo: false,
      attendMoney: true
    });
  }

  render() {
    const container = {
      margin: "50px auto 0",
      width: '700px',
      boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)"
    }

    const cardMedia  = {
      borderRadius: "2px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, .12)",
      height: "125px",
      marginBottom: "25px",
      transition: "all 300ms ease-out",
      width: "100%"
    }

    const ps={
      padding: "2px 16px"
    }



    return (
      <div>
        {this.state.moreInfo ? (
          <div style={container}>
            <img
              src={this.props.eventDescription[this.props.index].imgUrl[0]} style={{width:"100%"}}
            />
            <h3>Date: {this.props.eventDescription[this.props.index].date}</h3>
            <h3>Name: {this.props.eventDescription[this.props.index].eventName}</h3>
            <p>Description: {this.props.eventDescription[this.props.index].description}</p>
            <video width="700" height="480" src={this.props.eventDescription[this.props.index].videos[0]} controls></video>

            <p>{this.props.eventDescription[this.props.index].category}</p>
            <p>{this.props.eventDescription[this.props.index].description}</p>
            <button type="submit" onClick={this.updateState.bind(this)} style={cardMedia}>
                back
              </button>
            {this.props.eventDescription[this.props.index].cost === "FREE" ? (
              <button type="submit" onClick={this.attendToggler.bind(this)} style={cardMedia}>
                FREE
              </button>
            ) : (
              <button
                type="submit"
                onClick={this.attendTogglerMoney.bind(this)} style={cardMedia}
              >
                Attend
              </button>
            )}
          </div>
        ) : this.state.attendMoney ? (
          <Attend
            eventId={this.props.eventDescription[this.props.index].id}
            userId="5e148bf8fc13ae0c40000006"
            events={this.props.eventDescription}
          />
        )
        :
        <EventsList events={this.props.eventDescription} />
      }
      </div>
    );
  }
}

export default MoreInfo;
