import React, { Component } from 'react';
import moreInfo from './moreInfo.jsx'
import MoreInfo from './moreInfo.jsx';

class EventsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            eventList: true,
            moreInfo: false
        }
    }

    toggleComponents(){
        this.setState({
            eventList: false,
            moreInfo: true
        })
    }

    render() {
        return (
            <div>
                {this.props.events.map((event, idx) => {
                    <div key={idx}>
                        <img src={event.img} />
                        <h3>{event.title}</h3>
                        <h3>{event.date}</h3>
                        <p>{event.description}</p>
                        <button type="submit" onClick={this.toggleComponents}>More Info</button>
                    </div>
                })}  
                {this.state.eventList ? 
                null:
                <MoreInfo /> 
            }          
            </div>
        );
    }
}

export default EventsList;