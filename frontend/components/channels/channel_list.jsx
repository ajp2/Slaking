import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import ChannelFormContainer from './channel_form_container';
import MessagesContainer from '../messages/messages_container';

export class ChannelList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };

    this.handleModalClick = this.handleModalClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchChannels();
    this.props.fetchUsers().then(this.props.fetchCurrentUser);
    this.createSocket();
  }

  joinChannel(channelId) {
    const userChannel = {
      user_id: this.props.currentUser.id,
      channel_id: channelId
    }
    this.props.createUserChannel(userChannel);
  }

  createSocket() {
    this.socket = App.cable.subscriptions.create({
      channel: 'ThreadsChannel'
    }, {
        received: data => this.props.receiveChannel(data),
      });
  }

  handleModalClick(e) {
    if (this.state.showModal && e.target.classList[0] === 'modal') {
      this.setState({ showModal: false });
    } else {
      this.setState({ showModal: true });
    }
    console.log(e.target);
  }

  render() {
    const { channels, currentUser, userChannels } = this.props;
    if (channels && channels.length === 0) return null;
    if (!userChannels) return null;

    const allChannels = () => (
      <div className="modal" onClick={this.handleModalClick}>
        <ul className='all-channels'>
          {channels.map((channel, idx) =>
            <li key={idx}>
              <span>{channel.name}</span>
              {!currentUser.channel_ids.includes(channel.id) ? (
                <button onClick={() => this.joinChannel(channel.id)}>Join</button>
              ) : false}
            </li>
          )}
        </ul>
      </div>
    )

    return (
      <div className='chat'>
        <section className="channels">

          {this.state.showModal ? allChannels() : null}

          <h2 onClick={this.handleModalClick}>Channels</h2>
          <ul>
            {userChannels.map((channel, idx) => <li key={idx}><Link to={`/messages/${channel.id}`}>{channel.name}</Link></li>)}
          </ul>
        </section>

        {/* <ChannelFormContainer /> */}
        <Route path='/messages/:channelId' component={MessagesContainer} />
      </div>
    )
  }
}

export default ChannelList;