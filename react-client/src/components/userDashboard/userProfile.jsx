import React, { Component } from "react";
import axios from "axios";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { userId: "5e148bf8fc13ae0c40000006", profile: [] };
  }

  componentDidMount() {
    axios.get(`/api/users/${this.state.userId}`).then(res => {
      const profileId = res.data[0].profileId;
      axios.get(`/api/profiles/${profileId}`).then(res => {
        this.setState({ profile: res.data });
      });
    });
  }
  // fetchUserProfile(id){

  // }

  render() {
    // D  E   S   I   G   N   E //
    const card = {
      boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
      maxWidth: "600px",
      margin: "auto",
      textAlign: "center"
    };

    const title = {
      color: "grey",
      fontSize: "18px"
    };

    const button = {
      border: "none",
      outline: "0",
      display: "inline-block",
      padding: "8px",
      color: "white",
      backgroundColor: "#000",
      textAlign: "center",
      cursor: "pointer",
      width: "100%",
      fontSize: "18px"
    };

    const a = {
      textDecoration: "none",
      fontSize: "22px",
      color: "black"
    };

    //                          //
    return (
      <div>
        {this.state.profile.length > 0 ? (
          <div style={card}>
            <img src={this.state.profile[0].imgUrl} style={{ width: "100%" }} />
            <h1>
              {this.state.profile[0].firstName +
                " " +
                this.state.profile[0].lastName}
            </h1>
            <p style={title}>CEO & Founder, Example</p>
            <p>Birth Date: {this.state.profile[0].birthDate}</p>
            <p>About: {this.state.profile[0].about}</p>
            <p>
              <button style={button} onClick={this.editUserProfile}>Edit</button>
            </p>
          </div>
        ) : null}
      </div>
    );
  }
}

export default UserProfile;