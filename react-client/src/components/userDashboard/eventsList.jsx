import React, { Component } from "react";
import moreInfo from "./moreInfo.jsx";
import MoreInfo from "./moreInfo.jsx";

class EventsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventList: true,
      moreInfo: false,
      idx: null,
      msg: ""
    };
    // console.log(this.props)
  }
  changeHandler(e){
    e.preventDefault()
    this.setState({
        [e.target.name]: e.target.value
    })
  }

  updateState(e) {
      e.preventDefault()
      this.setState({
          msg: 'NO EVENTS TO SHOW'
      })
  }

  toggleComponents(e) {
    e.preventDefault();
    this.setState({
      eventList: false,
      moreInfo: true,
      idx: arguments[1]
    });
  }

  render() {
    return (
      <div>
        {this.state.eventList ? (
          this.props.events.length !== 0 ? (
            this.props.events.map((event, idx) => {
              return (
              <div key={idx} value ={this.state.idx} onChange={this.changeHandler.bind(this)} style={{borderStyle: 'solid'}}>
                <img src={event.imgUrl[0]} />
                <h3>{event.eventName}</h3>
                <h3>{event.date}</h3>
                <p>{event.description}</p>
                <p>{event.videos[0]}</p>
                <p>{event.category}</p>
                <p>{event.description}</p>
                <button type="submit" onClick={this.toggleComponents.bind(this)}>
                  More Info
                </button>
              </div>
              )
            })
          ) : (
            <div>
              {" "}
              <script> {this.updateState.bind(this)} </script> <p>{this.state.msg}</p>{" "}
            </div>
          )
        ) : (
          <MoreInfo
            index={this.state.idx}
            eventDescription={this.props.events}
          />
        )}
      </div>
    );
  }
}

export default EventsList;
