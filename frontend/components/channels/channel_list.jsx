import React, { Component } from 'react';

export class ChannelList extends Component {
  componentDidMount() {
    this.props.fetchChannels();
    this.props.fetchUsers().then(this.props.fetchCurrentUser);
  }

  render() {
    const { channels, currentUser, userChannels } = this.props;
    if (channels && channels.length === 0) return null;
    if (!userChannels) return null;
    console.log(this.props.userChannels);

    return (
      <div>
        <h2>All Channels</h2>
        <ul>
          {channels.map((channel, idx) => <li key={idx}>{channel.name}</li>)}
        </ul>
        <h2>User Channels</h2>
        <ul>
          {userChannels.map((channel, idx) => <li key={idx}>{channel.name}</li>)}
        </ul>
      </div>
    )
  }
}

export default ChannelList;