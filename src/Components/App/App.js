import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";
import { Playlist } from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";
import React from "react";
import "./App.css";
/*Check key are duplicated error and and if return statement is required at the end of Spotify.savePlaylist function
Filter out duplicate songs in recently played songs*/

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recentlyPlayed: [],
      searchResults: [],
      playlistName: "",
      playlistTracks: [],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.getRecentlyPlayed = this.getRecentlyPlayed.bind(this);
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar
            onSearch={this.search}
            addRecentlyPlayed={this.getRecentlyPlayed}
          />
          <div className="App-playlist">
            <SearchResults
              onAdd={this.addTrack}
              searchResults={this.state.searchResults}
              isRecent={false}
            />
            <SearchResults
              onAdd={this.addTrack}
              searchResults={this.state.recentlyPlayed}
              isRecent={true}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }

  addTrack(track) {
    if (!this.state.playlistTracks.find((song) => song.id === track.id)) {
      this.setState({ playlistTracks: [...this.state.playlistTracks, track] });
    }
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter((currentTrack) => currentTrack.id !== track.id);
    this.setState({ playlistTracks: tracks });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris);
    this.setState({ playlistName: "", playlistTracks: [] });
  }

  search(term) {
    Spotify.search(term).then((searchResults) => {
      this.setState({ searchResults: searchResults });
    });
  }

  async getRecentlyPlayed() {
    let results = await Spotify.getRecentlyPlayed();
    const unique = [...new Map(results.map((m) => [m.id, m])).values()];
    this.setState({ recentlyPlayed: unique });
  }
}

export default App;
