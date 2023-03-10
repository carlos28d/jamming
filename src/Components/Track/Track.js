import React from "react";
import "./Track.css";

export class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  addTrack() {
    this.props.onAdd(this.props.track);
  }

  renderAction() {
    if (this.props.isRemoval) {
      return "-";
    } else {
      return "+";
    }
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album} </p>
        </div>
        <button onClick={this.props.isRemoval ? this.removeTrack : this.addTrack} className="Track-action">
          {this.renderAction()}
        </button>
      </div>
    );
  }
}
