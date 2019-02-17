import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import ChannelListContainer from './channel_list_container';
import MessagesContainer from '../messages/messages_container';

export class Channels extends Component {
  constructor(props) {
    super(props);
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
        received: data => this.props.receiveChannel(data),
      });
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

          <ChannelListContainer channelType='public' channels={publicChannels} />
          <ChannelListContainer channelType='private' channels={privateChannels} />

        </section>

        <Route path='/messages/:channelId' component={MessagesContainer} />

      </div>
    )
  }
}

export default Channels;