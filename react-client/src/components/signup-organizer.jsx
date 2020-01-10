import React from 'react';
import $ from 'jquery';

class Create_organizer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			username: '',
			phoneNumber: '',
			email: '',
			password: '',
			confirmPassord: '',
			type: 'organizer'
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	handleSubmit(event) {
		event.preventDefault();
		if (this.state.password !== this.state.confirmPassord) {
			alert('confirm password');
		}
		$.ajax({
			type: 'POST',
			url: '/api/signupuser',
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
		const { name, username, phoneNumber, email, password, confirmPassord } = this.state;
		return (
			<div>
				<h1>create a user account</h1>
				<form onSubmit={this.handleSubmit}>
					<label>
						Name:
						<input type="text" placeholder="name" name="name" value={name} onChange={this.handleChange} />
					</label>
					<label>
						Username:
						<input
							type="text"
							placeholder="Choose username"
							name="username"
							value={username}
							onChange={this.handleChange}
						/>
					</label>
					<label>
						Phone Number:
						<input
							type="text"
							placeholder="Phone Number"
							name="phoneNumber"
							value={phoneNumber}
							onChange={this.handleChange}
						/>
					</label>
					<label>
						Email:
						<input
							type="text"
							placeholder="enter your email"
							name="email"
							value={email}
							onChange={this.handleChange}
						/>
					</label>
					<label>
						Password:
						<input
							type="password"
							placeholder="enter your password"
							name="password"
							value={password}
							onChange={this.handleChange}
						/>
					</label>
					<label>
						Confirm Password:
						<input
							type="password"
							placeholder="enter your password"
							name="confirmPassord"
							value={confirmPassord}
							onChange={this.handleChange}
						/>
					</label>
					<button type="submit">Submit</button>
				</form>
			</div>
		);
	}
}

export default Create_organizer;
