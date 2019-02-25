import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import ChannelListContainer from './channel_list_container';
import MessagesContainer from '../messages/messages_container';

export class Channels extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    this.props.fetchChannels();
    this.props.fetchUsers().then(this.props.fetchCurrentUser);
    this.createSocket();
  }

  // Broadcasts any channels created, edited, or deleted
  createSocket() {
    this.socket = App.cable.subscriptions.create({
      channel: 'ThreadsChannel'
    }, {
        received: data => {
          if (data.action && data.action === 'delete') {
            // Redirects and removes channel, userChannel from state
            this.props.history.push('/messages/1');
            this.props.removeUserChannel(this.props.currentUser.id, data.id);
            this.props.removeChannel(data.id);
          } else {
            this.props.receiveChannel(data);
            // dispatch userChannel if channel is DM sent to current user; skip if already exists
            if (data.private && 
              data.name.split(', ').includes(this.props.currentUser.username) &&
              !this.props.currentUser.channel_ids.includes(data.id)) {
                const userChannel = {
                  user_id: this.props.currentUser.id,
                  channel_id: data.id
                };
                this.props.receiveUserChannel(userChannel);
            }

          }
        }
      });
  }

  logout() {
    this.props.logout();
    this.props.history.push('/');
  }

  render() {
    const { channels, userChannels } = this.props;
    if ((channels && channels.length === 0) || !userChannels) return (
      <div className="loader">
        <img src={spinner_img} alt="Loading..." />
      </div>
    );

    const publicChannels = userChannels.filter(channel => !channel.private);
    const privateChannels = userChannels.filter(channel => channel.private);

    return (
      <div className='chat'>

        {/* Loading spinner */}
        {this.props.loading ? (
          <div className="loader">
            <img src={spinner_img} alt="Loading..."/>
          </div>
        ) : null}

        <section className="channels">

          <div className="user-profile">
            <div className="img-container">
              <img src={this.props.currentUser.avatarUrl} alt="avatar" />
            </div>
            <h2>{this.props.currentUser.username}</h2>
            <span className="arrow-down"></span>

            <div className="dropdown">
              <ul>
                <li onClick={this.logout}>Logout</li>
              </ul>
            </div>
          </div>

          <ChannelListContainer channelType='public' channels={publicChannels} />
          <ChannelListContainer channelType='private' channels={privateChannels} />

        </section>
        
        {this.props.currentUser.channel_ids.includes(Number(this.props.match.params.channelId)) ? (
          <Route path='/messages/:channelId' component={MessagesContainer} />
        ) : (
          <Redirect to='/messages/1' />
        )}


      </div>
    )
  }
}

export default Channels;