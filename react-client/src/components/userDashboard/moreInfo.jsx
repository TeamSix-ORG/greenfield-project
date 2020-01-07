import React, { Component } from "react";
import Attend from './attend.jsx'

class MoreInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event1: [],
      moreInfo: true,
        attendMoney: false
    };
  }

  // componentDidMount() {
  //   this.setState({
  //     event1: 
  //   });
  // }

  // attendTogglerFree(e) {
  //   // Send request to the backend with the id of the event and user id
  // }
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
        <script>{console.log(this.state.event1)}</script>
        {
            this.state.moreInfo ?
          <div>
            <img src={this.props.eventDescription[this.props.index].imgUrl[0]} />
                <h3>{this.props.eventDescription[this.props.index].event1Name}</h3>
                <h3>{this.props.eventDescription[this.props.index].date}</h3>
                <p>{this.props.eventDescription[this.props.index].description}</p>
                <p>{this.props.eventDescription[this.props.index].videos[0]}</p>
                <p>{this.props.eventDescription[this.props.index].category}</p>
                <p>{this.props.eventDescription[this.props.index].description}</p>
            {this.props.eventDescription[this.props.index].cost === 0 ?
            <button type="submit" onClick={this.attendTogglerMoney.bind(this)}> 
              Attend
            </button>
            :
            <button type="submit" onClick={this.attendTogglerMoney.bind(this)}> 
              Attend
            </button>
            }
          </div>
          :
          
          <Attend eventId={this.props.eventDescription[this.props.index].id} userId="5e148bf8fc13ae0c40000000"/>
        }
      </div>
    );
  }
}

export default MoreInfo;
