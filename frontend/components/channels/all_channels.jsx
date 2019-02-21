import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

export class AllChannels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channelId: undefined
    };
  }

  joinChannel(channelId) {
    const userChannel = {
      user_id: this.props.currentUser.id,
      channel_id: channelId
    }
    this.props.createUserChannel(userChannel);
    this.setState({ channelId }, this.props.closeModal);
  }
  
  render() {
    const { channel_ids } = this.props.currentUser;
    const joinedChannels = this.props.channels.filter(channel => (
      channel_ids.includes(channel.id) && !channel.private
    ));
    const otherChannels = this.props.channels.filter(channel => 
      !channel_ids.includes(channel.id) && !channel.private
    );
    
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

        {this.state.channelId ? <Redirect to={`/messages/${this.state.channelId}`} /> : null}
      </div>
    )
  }
}

export default AllChannels;