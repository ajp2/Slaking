import React, { Component } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';

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

  createSocket() {
    this.socket = App.cable.subscriptions.create({
      channel: 'ThreadsChannel'
    }, {
        received: data => {
          if (data.action && data.action === 'delete') {
            this.props.history.push('/messages/1');
            this.props.removeUserChannel(this.props.currentUser.id, data.id);
            this.props.removeChannel(data.id);
          } else {
            this.props.receiveChannel(data);
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
    if (channels && channels.length === 0) return null;
    if (!userChannels) return null;

    const publicChannels = userChannels.filter(channel => !channel.private);
    const privateChannels = userChannels.filter(channel => channel.private);

    return (
      <div className='chat'>
        <section className="channels">

          <div className="user-profile">
            <div className="img-container">
              <img src={this.props.currentUser.avatarUrl} alt="avatar" />
            </div>
            <h2>{this.props.currentUser.username}</h2>
            <span class="arrow-down"></span>

            <div className="dropdown">
              <ul>
                <li onClick={this.logout}>Logout</li>
              </ul>
            </div>
          </div>

          <ChannelListContainer channelType='public' channels={publicChannels} />
          <ChannelListContainer channelType='private' channels={privateChannels} />

        </section>

        <Route path='/messages/:channelId' component={MessagesContainer} />

      </div>
    )
  }
}

export default Channels;