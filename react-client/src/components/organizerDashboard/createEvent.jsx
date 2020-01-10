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
			cost: ''
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
	handleSubmit(event) {
		event.preventDefault();

		$.ajax({
			type: 'POST',
			url: '/api/createevnt',
			dataType: 'text',
			data: this.state,
			contentType: 'application/x-www-form-urlencoded',
			success: (data) => {
				console.log(data);
			},
			error: (err) => {
				if (err) {
					console.log(err);
				}
			}
		});
	}

	render() {
		return (
			<div>
				<h1>Create a new Event</h1>
				<form onSubmit={this.handleSubmit}>
					<label>
						Event Name:
						<input
							type="text"
							placeholder="Event Name"
							name="eventname"
							value={this.state.eventname}
							onChange={this.handleChange}
						/>
					</label>
					<label>
						description:
						<input
							type="text"
							placeholder="description"
							name="description"
							value={this.state.description}
							onChange={this.handleChange}
						/>
					</label>
					<label>
						Date:
						<input type="date" name="date" value={this.state.date} onChange={this.handleChange} />
					</label>
					<label>
						Category:
						<input
							type="text"
							placeholder="enter your email"
							name="category"
							value={this.state.category}
							onChange={this.handleChange}
						/>
					</label>
					<label>
						Add images :
						<input type="file" name="image" ref="fileUploader" />
					</label>
					<label>
						Add videos :
						<input type="file" name="video" ref="fileUploader" />
					</label>

					<label>
						cost:
						<input
							type="text"
							placeholder="cost"
							name="cost"
							value={this.state.cost}
							onChange={this.handleChange}
						/>
					</label>

					<button type="submit">Submit</button>
				</form>
			</div>
		);
	}
}

export default createEvent;
