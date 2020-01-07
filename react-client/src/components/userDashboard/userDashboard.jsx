import React, { Component } from 'react';
import Search from './search.jsx';
import EventsList from './eventsList.jsx'
import $ from "jquery";


class UserDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            eventsArr : []
        }
    }

    updateState(e){
        e.preventDefault
        var data = arguments[1]
        if(data){
            this.setState({
                eventsArr: data
            })

        }
        
    }

    componentDidMount(){
        $.ajax({
            url: '/events',
            method: 'GET',
            success: (data) => {
                this.updateState(data)
            },
            error: (err) => {
                throw err
            }
        })
    }

    render() {
        return (
            <div>
                <h1>userDashboard</h1>
                {console.log(this.state.eventsArr)}
                <Search events={this.updateState.bind(this)}/>
                <EventsList events={this.state.eventsArr}/>
                <div>
                    {/* user profile properties */}
                </div>
            </div>
        );
    }
}

export default UserDashboard;