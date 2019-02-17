import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class AllChannels extends Component {
  joinChannel(channelId) {
    const userChannel = {
      user_id: this.props.currentUser.id,
      channel_id: channelId
    }
    this.props.createUserChannel(userChannel);
  }
  
  render() {
    const joinedChannels = this.props.channels.filter(channel => this.props.currentUser.channel_ids.includes(channel.id));
    const otherChannels = this.props.channels.filter(channel => !this.props.currentUser.channel_ids.includes(channel.id));    
    
    return (
      <div className='all-channels'>
        <h3>Browse Channels</h3>

        <div className="channel-detail">
          <p>Channels you can join</p>
          <ul>
            {otherChannels.map((channel, idx) =>
              <li key={idx} onClick={() => this.joinChannel(channel.id)}>
                <a>
                  # {channel.name}
                  <span>{channel.description}</span>
                </a>
              </li>
            )}  
          </ul>

          <p>Channels you belong to</p>
            <ul>
              {joinedChannels.map((channel, idx) =>
                <li key={idx}>
                  <Link to={`/messages/${channel.id}`} onClick={this.props.closeModal}>
                    # {channel.name}
                    <span>{channel.description}</span>
                  </Link>
                </li>
              )}
            </ul>
        </div>

      </div>
    )
  }
}

export default AllChannels;