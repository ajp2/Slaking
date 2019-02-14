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
      author_id: this.props.currentUser,
      channel_id: this.props.channelId
    }
    this.props.createMessage(message)
      .then(() => this.setState({ content: "" }));
  }

  render() {
    return (
      <form>
        <input type="text" onChange={this.handleChange} value={this.state.content} />
        <button onClick={this.handleSubmit}>Submit</button>
      </form>
    )
  }
}

export default MessageForm;