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
          const res = JSON.parse(data.html);
          if (res.channel_id == this.channelId) {
            console.log(data.html);
            this.props.receiveMessage(res);
          }
        }
      });
  }

  render() {
    const { messages, messageAuthor } = this.props;

    return (
      <div className='main-messages'>
        <Route path='/messages/:channelId' component={ChannelHeaderContainer} />
        
        <div className="messages">
          <ul>
            {messages.map((message, idx) => (
              <li key={idx} className='message'>
                <img src={messageAuthor(message.author_id).avatarUrl} alt="" />
                <div className="message-container">
                  <div className="message-info">
                    <span className='message-author'>{messageAuthor(message.author_id).username}</span>
                    <span>{message.time}</span>
                    <span>-</span>
                    <span>{message.date} ago</span>
                  </div>
                  <p>{message.content}</p>
                </div>
              </li>
            ))}
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