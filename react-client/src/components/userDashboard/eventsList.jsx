import React, { Component } from 'react';
import moreInfo from './moreInfo.jsx'
import MoreInfo from './moreInfo.jsx';

class EventsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            eventList: true,
            moreInfo: false,
            idx: null
        }
    }

    toggleComponents(e){
        e.preventDefault()
        this.setState({
            eventList: false,
            moreInfo: true,
            idx: arguments[1]
        })
    }

    render() {
        return (
            <div>
                {/* {console.log(this.props.events)} */}
                {this.props.events.map((event, idx) => {
                    <div key={idx}>
                        <img src={event.img} />
                        <h3>{event.title}</h3>
                        <h3>{event.date}</h3>
                        <p>{event.description}</p>
                        <button type="submit" onClick={this.toggleComponents(idx)}>More Info</button>
                    </div>
                })}  
                {this.state.eventList ? 
                null:
                <MoreInfo index={this.state.idx} eventDescription={this.props.events}/> 
            }          
            </div>
        );
    }
}

export default EventsList;