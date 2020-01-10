import React, { Component } from 'react';
import $ from 'jquery';
import EventsList from './eventsList.jsx';
import Search from './search.jsx';
import { Redirect } from 'react-router-dom';
import axios from 'axios'

class AttendedEvents extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: "",
			attendedArr: [],
			redirectToUserDashboard: false
		};
		window.attendedArr = this.state.attendedArr;
	}

	toggleStates(e) {
		e.preventDefault();
		this.setState({
			attendedEvents: false,
			dashboard: true
		});
	}

	// componentDidMount() {
	// 	let User = {};
    // if (localStorage && localStorage.getItem("user")) {
    //   User = JSON.parse(JSON.parse(localStorage.getItem("user")));
    //   this.setState({
    //     userId: User._id
    //   });
    // }


	// 	$.ajax({
	// 		url: '/api/jointEventUser',
	// 		type: 'GET',
	// 		success: (data) => {
	// 			var arr = [];
	// 			for (var i = 0; i < data.length; i++) {
	// 				if (data[i].userId === User._id) {
	// 					arr.push(data[i].eventId);
	// 				}
	// 			}
	// 			console.log(data, 'hi');
	// 			this.fetchEvents(arr);
	// 		},
	// 		error: (err) => {
	// 			throw err;
	// 		}
	// 	});
	// }

	// fetchEvents(arr) {
	// 	$.ajax({
	// 		url: '/api/events',
	// 		type: 'GET',
	// 		success: (results) => {
	// 			var array = [];
	// 			for (var i = 0; i < results.length; i++) {
	// 				for (let j = 0; j < results.length; j++) {
	// 					if (results[j].id === arr[i]) {
	// 						array.push(results[j]);
	// 					}
	// 				}
	// 			}
	// 			console.log(arr);
	// 			this.setState({ attendedArr: array });
	// 		}
	// 	});
	// }

	componentDidMount() {
			let User = {};
		if (localStorage && localStorage.getItem("user")) {
		  User = JSON.parse(JSON.parse(localStorage.getItem("user")));
		  this.setState({
		    userId: User._id
		  });
		}
console.log(User._id)
		axios.post(`/api/profiles/${User._id}`)
		.then(res => console.log(res))
	}

	toggleStates(e) {
		e.preventDefault();
		this.setState({
			redirectToUserDashboard: true
		});
	}

	render() {
		const container = {
			margin: '50px auto 0',
			width: '700px',
			boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)'
		};

		const ps = {
			padding: '2px 16px'
		};

		if (this.state.redirectToUserDashboard) {
			this.setState({
				redirectToUserDashboard: false
			});
			return (
				<Redirect
					to={{
						pathname: '/UserDashboard'
					}}
				/>
			);
		}

		return (
			<div>
				<button type="submit" onClick={this.toggleStates.bind(this)}>
					Dashboard
				</button>
				<div>
					{this.state.attendedArr.map((attended, index) => {
						return (
							<div key={index} style={container}>
								<img src={attended.imgUrl[0]} style={{ width: '100%' }} />
								<h1>{attended.eventName}</h1>
								<h4>Date: {attended.date}</h4>
								<p style={ps}>{attended.videos[0]}</p>
								<video width="700" height="480" src={attended.videos[0]} controls />

								<p style={ps}>Category:{attended.category}</p>
								<p style={ps}>Description: {attended.description}</p>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}
export default AttendedEvents;
