import React, { Component } from 'react';

export class ChannelList extends Component {
  componentDidMount() {
    this.props.fetchChannels();
  }

  render() {
    const { channels } = this.props;
    if (channels && channels.length === 0) return null;

    return (
      <div>
        <h2>All Channels</h2>
        <ul>
          {channels.map((channel, idx) => <li key={idx}>{channel.name}</li>)}
        </ul>
        <h2>User Channels</h2>
      </div>
    )
  }
}

export default ChannelList;