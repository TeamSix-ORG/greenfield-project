import React, { Component } from "react";
import moreInfo from "./moreInfo.jsx";
import MoreInfo from "./moreInfo.jsx";

class EventsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventList: true,
      moreInfo: false,
      index: null,
      msg: ""
    };
  }
//  THIS FUNCTION IS USED TO UPDATE THE STATES AND GET THE INDEX OF THE CLICKED DIV TO SEND TO THE MORE INF TAB

  changeHandler(e){
    e.preventDefault()
    this.setState({
        [e.target.name]: e.target.value
    })
  }

  // 

  // updateState(e) {
  //     e.preventDefault()
  //     this.setState({
  //         msg: 'NO EVENTS TO SHOW'
  //     })
  // }

//  THIS FUNCTION IS USED TO TOGGLE THE VIEW BETWEEN THE EVENTS LIST AND THE MORE INFO TAB

  toggleComponents(e) {
    e.preventDefault();
    this.setState({
      eventList: false,
      moreInfo: true,
    });
  }

  render() {
    return (
      <div>
        {this.state.eventList ? (
            this.props.events.map((event, idx) => {
              return (
              <div key={idx} value={idx} name='idx' onClick={this.changeHandler.bind(this)} style={{borderStyle: 'solid'}}>
                <img src={event.imgUrl[0]} />
                <h3>{event.eventName}</h3>
                <h3>{event.date}</h3>
                <p>{event.description}</p>
                <p>{event.videos[0]}</p>
                <p>{event.category}</p>
                <p>{event.description}</p>
                <button type="submit" name='index' value={idx} onClick={this.toggleComponents.bind(this)} >
                  More Info
                </button>
              </div>
              )
            })
        ) 
        : (
          <MoreInfo
            index={this.state.index}
            eventDescription={this.props.events}
          />
        )}
      </div>
    );
  }
}

export default EventsList;
