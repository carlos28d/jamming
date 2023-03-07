import { Track } from "../Track/Track";
import React from "react";
import "./TrackList.css";

export class TrackList extends React.Component {
  render() {
    this.tracks = this.props.searchResults.map((track) => {
      return (
                <Track 
                  track={track} 
                  key={track.id}
                  isRemoval={this.props.isRemoval}
                  onRemove={this.props.onRemove}
                  onAdd={this.props.onAdd} 
                />
      )
    });
    
    return (
      <div className="TrackList">
        {this.tracks}
      </div>
    );
  }
}
