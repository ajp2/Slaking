import React, { Component } from 'react'

export class AllChannels extends Component {
  joinChannel(channelId) {
    const userChannel = {
      user_id: this.props.currentUser.id,
      channel_id: channelId
    }
    this.props.createUserChannel(userChannel);
  }
  
  render() {
    return (
      <ul className='all-channels'>
        {this.props.channels.map((channel, idx) =>
          <li key={idx}>
            <span>{channel.name}</span>
            {!this.props.currentUser.channel_ids.includes(channel.id) ? (
              <button onClick={() => this.joinChannel(channel.id)}>Join</button>
            ) : false}
          </li>
        )}
      </ul>
    )
  }
}

export default AllChannels
