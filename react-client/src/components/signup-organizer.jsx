import React from "react";
import $ from "jquery";

class Create_organizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassord: "",
      type: "organizer"
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
      alert("confirm password");
    }
    $.ajax({
      type: "POST",
      url: "/api/signupuser",
      dataType: "text",
      data: this.state,
      contentType: "application/x-www-form-urlencoded",
      success: data => {
        console.log(data);
      },
      error: err => {
        if (err) {
          console.log(err);
        }
      }
    });
  }

  render() {
    const {
      name,
      username,
      phoneNumber,
      email,
      password,
      confirmPassord
    } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">
                  Create an Organizer Account
                </h5>
                <form className="form-signin" onSubmit={this.handleSubmit}>
                  <div className="form-label-group">
                    <label htmlFor="inputEmail">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={name}
                      onChange={this.handleChange}
                      className="form-control"
                      placeholder="Enter Full Name (OPTIONAL)"
                      autoFocus
                    />
                  </div>

                  <div className="form-label-group">
                    <label htmlFor="inputEmail">Username</label>
                    <input
                      type="text"
                      id="inputUsername"
                      name="username"
                      value={username}
                      onChange={this.handleChange}
                      className="form-control"
                      placeholder="Username"
                      required
                      autoFocus
                    />
                  </div>

                  <div className="form-label-group">
                    <label htmlFor="inputEmail">Phone Number</label>
                    <input
                      type="number"
                      id="inputPhoneNumber"
                      name="phoneNumber"
                      value={phoneNumber}
                      onChange={this.handleChange}
                      className="form-control"
                      placeholder="Enter Phone Number (OPTIONAL) "
                      autoFocus
                    />
                  </div>

                  <div className="form-label-group">
                    <label htmlFor="inputEmail">Email address</label>
                    <input
                      type="email"
                      id="inputEmail"
                      name="email"
                      value={email}
                      onChange={this.handleChange}
                      className="form-control"
                      placeholder="Email address"
                      required
                      autoFocus
                    />
                  </div>

                  <div className="form-label-group">
                    <label htmlFor="inputPassword">Password</label>
                    <input
                      type="password"
                      id="inputPassword"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={this.handleChange}
                      required
                    />
                  </div>

                  <div className="form-label-group">
                    <label htmlFor="inputPassword">Confirm Password</label>
                    <input
                      type="password"
                      id="confirmPassord"
                      className="form-control"
                      placeholder="Password"
                      name="confirmPassord"
                      value={confirmPassord}
                      onChange={this.handleChange}
                      required
                    />
                  </div>

                  <br />
                  <button
                    className="btn btn-lg btn-primary btn-block text-uppercase"
                    type="submit"
                  >
                    Sign Up
                  </button>
                  <hr className="my-4" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Create_organizer;
