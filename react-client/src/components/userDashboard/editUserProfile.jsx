import React, { Component } from "react";
import Axios from "axios";
import $ from "jquery";
import NavBar from "./navBar.jsx";

class EditUserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      dateOfBirth: "",
      phoneNumber: "",
      about: "",
      imgUrl: ""
    };
  }

  onCHangeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmitHandler(e) {
    e.preventDefault();
    let User = {};
    if (localStorage && localStorage.getItem("user")) {
      User = JSON.parse(JSON.parse(localStorage.getItem("user")));
      this.setState({
        userId: User._id
      });
    }

    $.ajax({
      url: `/api/users/${User._id}`,
      type: "PUT",
      data: this.state,
      success: data => {
        console.log(data);
      },
      error: err => console.log("reeeee")
    });
  }
  render() {
    const { fullname, dateOfBirth, phoneNumber, about, imgUrl } = this.state;
    return (
      <div>
        <NavBar />

        <div className="container">
          <form onSubmit={this.onSubmitHandler.bind(this)}>
            <fieldset>
              <legend>Edit User Profile</legend>

              <div className="form-group">
                <label htmlFor="fullName">Full Name: </label>
                <input
                  type="text"
                  value={fullname}
                  name="fullname"
                  className="form-control"
                  id="fullName"
                  aria-describedby="emailHelp"
                  placeholder="Enter Your Full Name"
                  onChange={this.onCHangeHandler.bind(this)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="dateOfBirth">Date Of Birth</label>
                <input
                  type="date"
                  value={dateOfBirth}
                  name="birthDate"
                  className="form-control"
                  id="dateOfBirth"
                  placeholder="Enter Your Birth Date"
                  onChange={this.onCHangeHandler.bind(this)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="number"
                  value={phoneNumber}
                  name="phoneNumber"
                  className="form-control"
                  id="phoneNumber"
                  placeholder="Enter Your Phone number"
                  onChange={this.onCHangeHandler.bind(this)}
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your Phone Number with anyone else without
                  your premision.
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="about">About</label>
                <textarea
                  className="form-control"
                  value={about}
                  name="about"
                  id="about"
                  rows="3"
                  onChange={this.onCHangeHandler.bind(this)}
                ></textarea>
              </div>
              {/* <div className="form-group">
                <label htmlFor="uploadPicture">
                  Upload a Picture or add an image url
                </label>
                <input
                  type="file"
                  value={imgUrl}
                  name="imgUrl"
                  className="form-control-file"
                  id="uploadPicture"
                  onChange={this.onCHangeHandler.bind(this)}
                />
              </div> */}
              <div className="form-group">
                <label htmlFor="urlPic">Add an image url</label>
                <input
                  type="text"
                  value={imgUrl}
                  name="imgUrl"
                  className="form-control-file"
                  onChange={this.onCHangeHandler.bind(this)}
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

export default EditUserProfile;
