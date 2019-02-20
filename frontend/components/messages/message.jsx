import React, { Component } from 'react';
import Emojis from './emojis';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

export class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEmojiForm: false
    };

    this.showEmojiForm = this.showEmojiForm.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.addEmoji = this.addEmoji.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
    this.editMessage = this.editMessage.bind(this);
  }

  showEmojiForm() {
    this.setState({ 
      showEmojiForm: true
    }, () => document.addEventListener('click', this.closeMenu));
  }

  closeMenu(e) {
    if (this.emojiPicker !== null && !this.emojiPicker.contains(e.target)) {
      this.setState({
        showEmojiForm: false
      }, () => document.removeEventListener('click', this.closeMenu));
    }
  }

  addEmoji(e) {
    const emoji = {
      content: e.colons,
      author_id: this.props.currentUserId,
      message_id: this.props.message.id
    };
    this.props.createEmoji(emoji);
  }

  deleteMessage(e) {
    this.props.deleteMessage(this.props.message.id);
    console.log("deleting");
  }

  editMessage(e) {
    console.log("editing");
  }

  render() {
    const { message, messageAuthor, currentUserId, createEmoji, deleteEmoji } = this.props;

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
          <Emojis 
            emojis={message.emojis} 
            messageAuthor={messageAuthor}
            currentUserId={currentUserId}
            createEmoji={createEmoji}
            deleteEmoji={deleteEmoji}
            messageId={message.id}
          />
        </div>

        <div className="icons">
          <i className="far fa-grin" onClick={this.showEmojiForm}></i>
          <i className="far fa-edit" onClick={this.editMessage}></i>
          <i className="fas fa-times" onClick={this.deleteMessage}></i>
        </div>

        {this.state.showEmojiForm ?
          <span className='emoji-form' ref={el => (this.emojiPicker = el)}>
            <Picker 
              onSelect={this.addEmoji} 
              title='Pick your emoji…' 
              emoji='point_up'
            />
          </span>
          :
          null}
      </li>
    )
  }
}

export default Message;