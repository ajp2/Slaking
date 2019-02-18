import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

import MessageForm from '../messages/message_form';
import ChannelHeaderContainer from '../channels/channel_header_container';

export class Messages extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.channelId = this.props.match.params.channelId;
    this.props.fetchMessages(this.channelId);
    this.createSocket();
  }

  componentDidUpdate(prevProps) {
    this.channelId = this.props.match.params.channelId;
    if (prevProps.match.params.channelId !== this.channelId) {
      this.props.fetchMessages(this.channelId);
      this.createSocket();
    }
  }

  createSocket() {
    this.socket = App.cable.subscriptions.create({
      channel: 'MessagesChannel',
      channel_room: this.channelId
    }, {
        received: data => {
          if (data.channel_id == this.channelId) {
            this.props.receiveMessage(data);
          }
        }
      });
  }

  render() {
    const { messages } = this.props;

    return (
      <div className='main-messages'>
        <Route path='/messages/:channelId' component={ChannelHeaderContainer} />
        
        <div className="messages">
          <ul>
            {messages.map((message, idx) => <li key={idx}>{message.content}</li>)}
          </ul>
        </div>

        <MessageForm
          createMessage={this.props.createMessage}
          currentUserId={this.props.currentUser.id}
          channelId={this.channelId}
        />

      </div>
    )
  }
}

export default withRouter(Messages);