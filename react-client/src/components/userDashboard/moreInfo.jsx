import React, { Component } from "react";

class MoreInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: []
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

  render() {
    return (
      <div>
        {
          <div>
            <img src={this.state.event[0].img} />
            <h3>{this.state.event[0].title}</h3>
            <h3>{this.state.event[0].date}</h3>
            <p>{this.state.event[0].description}</p>
          </div>
        }
      </div>
    );
  }
}

export default MoreInfo;
