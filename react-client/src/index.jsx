import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Create_account from './components/new-account.jsx';
import Create_user from './components/signup-user.jsx';
import Create_organizer from './components/signup-organizer.jsx';
import Login from './components/login.jsx';
import profile from './components/profile.jsx';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div>
				<Router>
					<Switch>
						<Route path="/newaccount" component={Create_account} />
						<Route path="/signupuser" component={Create_user} />
						<Route path="/signuporganizer" component={Create_organizer} />
						<Route path="/login" component={Login} />
						<Route path="/profile" component={profile} />
					</Switch>
				</Router>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
