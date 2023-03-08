import { TrackList } from "../TrackList/TrackList";
import React from "react";
import "./Playlist.css";

export class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e) {
    this.props.onNameChange(e.target.value);
  }

  render() {
    this.isRemoval = true;
    return (
      <div className="Playlist">
        <input
          onChange={this.handleNameChange}
          value={this.props.playlistName}
          placeholder="New Playlist"
        />
        <TrackList
          isRemoval={this.isRemoval}
          onRemove={this.props.onRemove}
          searchResults={this.props.playlistTracks}
        />
        <button onClick={this.props.onSave} className="Playlist-save">
          SAVE TO SPOTIFY
        </button>
      </div>
    );
  }
}
