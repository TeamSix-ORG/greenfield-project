import React, { Component } from 'react';
import Search from './search.jsx';
import EventsList from './eventsList.jsx'

class UserDashboard extends Component {
    render() {
        return (
            <div>
                <h1>userDashboard</h1>
                <Search />
                <EventsList />
                <div>
                    {/* user profile properties */}
                </div>
            </div>
        );
    }
}

export default UserDashboard;