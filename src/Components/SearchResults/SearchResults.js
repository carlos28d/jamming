import { TrackList } from "../TrackList/TrackList";
import React from "react";
import "./SearchResults.css";

export class SearchResults extends React.Component {
  render() {
    this.isRemoval = false;
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList isRemoval={this.isRemoval} onAdd={this.props.onAdd} searchResults={this.props.searchResults} />
      </div>
    );
  }
}
