import React, { Component } from "react";
import Attend from './attend'

class MoreInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: [],
      moreInfo: true,
        attend: false
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

  attendToggler(e) {
    e.preventDefault();
    this.setState({
        moreInfo: false,
        attend: true
    })
  }

  render() {
    return (
      <div>
        {
            this.state.moreInfo ?
          <div>
            <img src={this.state.event[0].img} />
            <h3>{this.state.event[0].title}</h3>
            <h3>{this.state.event[0].date}</h3>
            <p>{this.state.event[0].description}</p>
            <p>{this.state.event[0].cost}</p>
            <button type="submit" onClick={this.attendToggler.bind(this)}>
              Attend
            </button>
          </div>
          :
          <Attend />
        }
      </div>
    );
  }
}

export default MoreInfo;
