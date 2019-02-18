import React, { Component } from 'react';

export class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ content: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const message = {
      content: this.state.content,
      author_id: this.props.currentUserId,
      channel_id: this.props.channelId
    }
    this.props.createMessage(message)
      .then(() => this.setState({ content: "" }));
  }

  render() {
    return (
      <form className='message-input' onSubmit={this.handleSubmit}>
        <input 
          type="text" 
          onChange={this.handleChange} 
          value={this.state.content} 
          placeholder='Message' 
        />
      </form>
    )
  }
}

export default MessageForm;