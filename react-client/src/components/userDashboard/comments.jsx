import React, { Component } from "react";
import Axios from "axios";

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      userId: "",
      username: ""
    };
    let User = {};
    if (localStorage && localStorage.getItem("user")) {
      User = JSON.parse(JSON.parse(localStorage.getItem("user")));
      this.setState({
        userId: User._id,
        username: User.username
      });
    }
  }

  changeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitComment(e) {
    e.preventDefault();
    var obj = {
      userId: this.props.userId,
      username: this.props.username,
      comment: this.props.comment
    };
    Axios.post(`/api/comment/${this.props.event.id}`, obj).then(data => {
      if (data === "Comment Sent") {
        alert("Comment Was Sent");
      }
    });
  }

  render() {
    return (
      <div>
        {this.props.Comments.map((comment, idx) => {
          <div key={idx}>
            <h3>{comment.username}</h3>
            <p>{comment.dateTime}</p>
            <p>{comment.comment}</p>
          </div>;
        })}
        <form onSubmit={this.submitComment.bind(this)}>
          <label htmlFor="comment">Comment:</label>
          <textarea name="comment" id="comment" cols="30" rows="10"></textarea>
          <button type="submit"></button>
        </form>
      </div>
    );
  }
}

export default Comments;
