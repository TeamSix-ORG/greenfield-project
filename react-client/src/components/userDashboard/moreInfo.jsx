import React, { Component } from "react";
import Attend from "./attend.jsx";
import EventsList from './eventsList.jsx'

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
      obj.UserId = "userId"
      obj.eventId = this.props.eventDescription[this.props.index].id;;
      console.log(obj , this.props.userId)
      $.ajax({
        url: "/api/jointEventUser",
        type: "POST",
        data: obj,
        success: data => {
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
  e.preventDefault();
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
    return (
      <div>
        {this.state.moreInfo ? (
          <div>
            <img
              src={this.props.eventDescription[this.props.index].imgUrl[0]}
            />
            <h3>{this.props.eventDescription[this.props.index].event1Name}</h3>
            <h3>{this.props.eventDescription[this.props.index].date}</h3>
            <p>{this.props.eventDescription[this.props.index].description}</p>
            <p>{this.props.eventDescription[this.props.index].videos[0]}</p>
            <p>{this.props.eventDescription[this.props.index].category}</p>
            <p>{this.props.eventDescription[this.props.index].description}</p>
            <button type="submit" onClick={this.updateState.bind(this)}>
                back
              </button>
            {this.props.eventDescription[this.props.index].cost === "FREE" ? (
              <button type="submit" onClick={this.updateState.bind(this)}>
                FREE
              </button>
            ) : (
              <button
                type="submit"
                onClick={this.attendTogglerMoney.bind(this)}
              >
                Attend
              </button>
            )}
          </div>
        ) : this.state.attendMoney ? (
          <Attend
            eventId={this.props.eventDescription[this.props.index].id}
            userId="5e148bf8fc13ae0c40000000"
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
