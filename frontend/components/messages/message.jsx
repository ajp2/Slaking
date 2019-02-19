import React, { Component } from 'react';

export class Message extends Component {
  render() {
    const { message, messageAuthor } = this.props;

    return (
      <li className='message'>
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
    )
  }
}

export default Message;