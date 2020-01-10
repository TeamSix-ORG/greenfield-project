import React from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      type: "",
      authentified: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    $.ajax({
      type: "POST",
      url: "/api/login",
      dataType: "text",
      data: this.state,
      contentType: "application/x-www-form-urlencoded",
      success: data => {
        //  console.log(this.state);
        this.setState({
          authentified: true,
          type: JSON.parse(data).type
        });
        console.log(this.state);
        localStorage.setItem(this.state.type, JSON.stringify(data));
        if (this.state.type === "user")
          this.props.history.push("/userdashboard");
        if (this.state.type === "organizer")
          this.props.history.push("/organizerdashboard");
      },
      error: err => {
        if (err) {
          console.log(err);
        }
      }
    });
  }
  render() {
    // if (this.state.authentified) {
    //   if (this.state.type === "user") {
    //     return (
    //       <Redirect
    //         to={{
    //           pathname: "/userdashboard"
    //         }}
    //       />
    //     );
    //   }
    //   if (this.state.type === "organizer") {
    //     return (
    //       <Redirect
    //         to={{
    //           pathname: "/organizerdashboard"
    //         }}
    //       />
    //     );
    //   }
    // }
    const { username, email, password } = this.state;
    return (
      <div>
        <h1>create a user account</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              placeholder="Choose username"
              name="username"
              value={username}
              onChange={this.handleChange}
              required
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
              required
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
              required
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Login;
