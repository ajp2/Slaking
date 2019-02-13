import React, { Component } from 'react';

import ChannelFormContainer from './channel_form_container';

export class ChannelList extends Component {
  constructor(props) {
    super(props);

  }

  joinChannel(channelId) {
    const userChannel = {
      user_id: this.props.currentUser.id,
      channel_id: channelId
    }
    this.props.createUserChannel(userChannel);
  }

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
          {channels.map((channel, idx) => 
            <li key={idx}>
              <span>{channel.name}</span>
              {!currentUser.channel_ids.includes(channel.id) ? (
                <button onClick={() => this.joinChannel(channel.id)}>Join</button>
              ) : false}
            </li>
          )}
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