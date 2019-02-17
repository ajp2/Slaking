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

        <h3>Channels you can join</h3>
        <ul>
          {otherChannels.map((channel, idx) =>
            <li key={idx} onClick={() => this.joinChannel(channel.id)}>
              <a>
                # {channel.name}
                {console.log(channel)}
              </a>
            </li>
          )}  
        </ul>

        <h3>Channels you belong to</h3>
          <ul>
            {joinedChannels.map((channel, idx) =>
              <li key={idx}>
                <Link to={`/messages/${channel.id}`} onClick={this.props.closeModal}># {channel.name}</Link>
              </li>
            )}
          </ul>

      </div>
    )
  }
}

export default AllChannels;