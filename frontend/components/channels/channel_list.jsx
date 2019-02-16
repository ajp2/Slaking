import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import ChannelFormContainer from './channel_form_container';
import MessagesContainer from '../messages/messages_container';
import AllChannels from './all_channels';
import { createUserChannel } from '../../actions/channel_actions';

export class ChannelList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channelModal: false,
      channelFormModal: false,
      dmModal: false
    };
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

  handleModalClick(e, name) {
    if (this.state[name] && e.target.classList[0] === 'modal') {
      this.setState({ [name]: false });
    } else {
      this.setState({ [name]: true });
    }
  }

  render() {
    const { channels, currentUser, userChannels } = this.props;
    if (channels && channels.length === 0) return null;
    if (!userChannels) return null;

    const publicChannels = userChannels.filter(channel => !channel.private);
    const privateChannels = userChannels.filter(channel => channel.private);

    const channelModal = () => (
      <div className="modal" onClick={e => this.handleModalClick(e, 'channelModal')}>
        <AllChannels
          channels={channels}
          currentUser={currentUser}
          createUserChannel={this.props.createUserChannel}
        />
      </div>
    );
    const channelFormModal = () => (
      <div className="modal" onClick={e => this.handleModalClick(e, 'channelFormModal')}>
        <ChannelFormContainer />
      </div>
    );
    
    return (
      <div className='chat'>
        <section className="channels">

          <div className='channel-text'>
            <h2 onClick={e => this.handleModalClick(e, 'channelModal')}>Channels</h2>
            <span onClick={e => this.handleModalClick(e, 'channelFormModal')}>+</span>
          </div>
          <ul>
            {publicChannels.map((channel, idx) => <li key={idx}><Link to={`/messages/${channel.id}`}># {channel.name}</Link></li>)}
          </ul>

          {/* List of all channels (opens modal) */}
          {this.state.channelModal ?  channelModal() : null}

          {/* Form to create new channel (opens modal) */}
          {this.state.channelFormModal ? channelFormModal() : null}

          <div className='channel-text'>
            <h2 onClick={e => this.handleModalClick(e, 'dmModal')}>Direct Messages</h2>
            <span>+</span>
          </div>
          <ul>
            {privateChannels.map((channel, idx) => <li key={idx}><Link to={`/messages/${channel.id}`}>@ {channel.name}</Link></li>)}
          </ul>
        </section>

        {this.state.dmModal ? console.log("modal open") : console.log("modal closed")}

        <Route path='/messages/:channelId' component={MessagesContainer} />
      </div>
    )
  }
}

export default ChannelList;