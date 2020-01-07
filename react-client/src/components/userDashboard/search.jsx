import React, { Component } from "react";
import $ from "jquery";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: "",
      category: "",
      filttredEvents: []
    };
  }

  // Hndelse the change of state in the input and the options boxes
  searchIpuntChangeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  // Submits a ajax request to the server and fetches the data brings back the matched data
  submitSearchHandler(e) {
    e.preventDefault();
    var searchComp = {};
    searchComp.eventName = this.state.eventName;
    if (this.state.category !== "") {
      searchComp.category = this.state.category;
    }

    $.ajax({
      url: "/events",
      method: "GET",
      data: searchComp,
      success: data => {
        this.updateState(this.state.filttredEvents, data);
        this.props.events(this.state.filttredEvents);
      },
      error: err => console.log("Error in get request search", err)
    });
  }
  //Updating state of the filttered array
  updateState(target, data) {
    this.setState({
      target: data
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.submitSearchHandler.bind(this)}>
          <label htmlFor="search">Search By Name: </label>
          <input
            type="search"
            name="eventName"
            id="eventName"
            onChange={this.searchIpuntChangeHandler.bind(this)}
            value={this.state.eventName}
          />
          <select
            name="category"
            value={this.state.category}
            onChange={this.searchIpuntChangeHandler.bind(this)}
          >
            <option value="N/A">N/A</option>
            <option value="edu">Educational</option>
            <option value="fun">Fun</option>
            <option value="sports">Sports</option>
          </select>
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }
}

export default Search;
