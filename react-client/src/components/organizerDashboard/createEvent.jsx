import React, { Component } from 'react';
import $ from 'jquery';
import { Redirect } from 'react-router-dom';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import axios from 'axios'

class createEvent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			eventname: '',
			description: '',
			date: '',
			category: '',
			cost: '',
			image: '',
			video: '',
			organizerId: ''
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleClick(e) {
		this.refs.fileUploader.click();
	}
	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	componentDidMount() {
		let User = {};
		if (localStorage && localStorage.getItem('user')) {
			User = JSON.parse(localStorage.getItem('user'));
			this.setState({
				organizerId: User._id
			});
		}
	}
	handleSubmit(event) {
		event.preventDefault();

		$.ajax({
			type: 'POST',
			url: '/api/createevnt',
			dataType: 'text',
			data: this.state,
			contentType: 'application/x-www-form-urlencoded',
			success: (data) => {
				console.log('hello');
				console.log(data);
			},
			error: (err) => {
				console.log(err);
			}
		});
	}

	render() {
		return (
			<div>
				<div className="container">
					<form onSubmit={this.handleSubmit.bind(this)}>
						<fieldset>
							<legend>Create a new Event</legend>

							<div className="form-group">
								<label htmlFor="Name">Event Name: </label>
								<input
									type="text"
									name="eventname"
									value={this.state.eventname}
									onChange={this.handleChange}
									className="form-control"
									placeholder="Enter te event name"
								/>
							</div>
							<div className="form-group">
								<label htmlFor="description">Event Name: </label>
								<input
									type="text"
									placeholder="description"
									name="description"
									value={this.state.description}
									onChange={this.handleChange}
									className="form-control"
								/>
							</div>

							<div className="form-group">
								<label htmlFor="dateOfBirth">Date</label>
								<input
									type="date"
									name="date"
									value={this.state.date}
									onChange={this.handleChange}
									className="form-control"
									placeholder="Enter  Date"
								/>
							</div>

							<div className="form-group">
								<label htmlFor="category">Category</label>
								<input
									type="text"
									placeholder="Category"
									name="category"
									value={this.state.category}
									onChange={this.handleChange}
									className="form-control"
								/>
							</div>
							<div className="form-group">
								<label htmlFor="cost">cost</label>
								<input
									type="text"
									placeholder="cost"
									name="cost"
									value={this.state.cost}
									onChange={this.handleChange}
									className="form-control"
								/>
							</div>

							<div className="form-group">
								<label htmlFor="urlPic">Add an image url</label>
								<input
									name="image"
									type="text"
									value={this.state.image}
									onChange={this.handleChange}
									className="form-control"
								/>
							</div>
							<div className="form-group">
								<label htmlFor="urlPic">Add a video url</label>
								<input
									name="video"
									value={this.state.video}
									onChange={this.handleChange}
									type="text"
									className="form-control"
								/>
							</div>
							<button type="submit" className="btn btn-primary">
								Submit
							</button>
						</fieldset>
					</form>
				</div>
			</div>
		);
	}
}

export default createEvent;
