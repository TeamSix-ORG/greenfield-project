import React, { Component } from "react";
import BeautyStars from "beauty-stars";
import $ from "jquery";

class Ratings extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 0 };
  }

  ratingSubmit() {
    console.log(this.state.value);
    var obj = { rating: this.state.value };
    $.ajax({
      url: `/api/rate/${this.props.eventId}`,
      type: "POST",
      data: obj,
      success: data => console.log(data),
      error: err => {
        throw err;
      }
    });
  }

  render() {
    return (
      <div>
        {this.state.value !== 0 ? this.ratingSubmit() : null}
        <BeautyStars
          value={this.state.value}
          onChange={value => this.setState({ value })}
          onclick={this.ratingSubmit.bind(this)}
        />{" "}
      </div>
    );
  }
}

export default Ratings;
