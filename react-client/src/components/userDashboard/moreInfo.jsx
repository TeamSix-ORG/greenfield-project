import React, { Component } from "react";
// import Attend from './attend'

class MoreInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: [],
      moreInfo: true,
        attendMoney: false
    };
  }

  componentDidMount() {
    var event = this.props.event;
    var idx = this.props.index;
    var data = [event[idx]];
    this.setState({
      event: data
    });
  }

  attendTogglerFree(e) {
    // Send request to the backend with the id of the event and user id
  }
  attendTogglerMoney(e) {
    e.preventDefault();
    this.setState({
        moreInfo: false,
        attendMoney: true
    })
  }

  render() {
    return (
      <div>
        {
            this.state.moreInfo ?
          <div>
            <img src={this.state.event.imgUrl[0]} />
                <h3>{this.state.event.eventName}</h3>
                <h3>{this.state.event.date}</h3>
                <p>{this.state.event.description}</p>
                <p>{this.state.event.videos[0]}</p>
                <p>{this.state.event.category}</p>
                <p>{this.state.event.description}</p>
            {this.state.event[0].cost === 0 ?
            <button type="submit" onClick={this.attendToggler.bind(this)}> 
              Attend
            </button>
            :
            <button type="submit" onClick={this.attendToggler.bind(this)}> 
              Attend
            </button>
            }
          </div>
          :
          null
          // <Attend />
        }
      </div>
    );
  }
}

export default MoreInfo;
