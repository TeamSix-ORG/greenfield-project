import React, { Component } from "react";
import BeautyStars from "beauty-stars";
import $ from "jquery";

class Ratings extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 0, rating: null };
  }

  ratingSubmit() {
    console.log(this.state.value);
    var obj = { rating: this.state.value };
    $.ajax({
      url: `/api/rate/${this.props.eventId}`,
      type: "POST",
      data: obj,
      success: data => {
        this.setState({ rating: data.results });
        console.log(data);
      },
      error: err => {
        throw err;
      }
    });
  }

  render() {
    return (
      <div>
        {console.log(this.state.rating)}
        {this.state.value !== 0 ? this.ratingSubmit() : null}
        <div className="container">
          <label>Rate this event</label>
          <BeautyStars
            value={this.state.value}
            onChange={value => this.setState({ value })}
            onclick={this.ratingSubmit.bind(this)}
          />{" "}
          <p>{this.state.rating}/5</p>
        </div>
      </div>
    );
  }
}

export default Ratings;
