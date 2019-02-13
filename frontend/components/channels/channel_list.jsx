import React, { Component } from 'react';

import ChannelFormContainer from './channel_form_container';

export class ChannelList extends Component {
  componentDidMount() {
    this.props.fetchChannels();
    this.props.fetchUsers().then(this.props.fetchCurrentUser);
  }

  render() {
    const { channels, currentUser, userChannels } = this.props;
    if (channels && channels.length === 0) return null;
    if (!userChannels) return null;

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

        <ChannelFormContainer />
      </div>
    )
  }
}

export default ChannelList;