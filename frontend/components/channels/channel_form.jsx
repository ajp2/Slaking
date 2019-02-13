import React, { Component } from 'react';

export class ChannelForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const channel = {
      ...this.state,
      owner_id: this.props.currentUserId
    };

    this.props.createChannel(channel)
      .then(action => {
        const userChannel = {
          user_id: this.props.currentUserId,
          channel_id: action.channel.id
        };
        this.props.createUserChannel(userChannel);

        this.setState({ name: "", description: "" });
      });
  }

  render() {
    return (
      <form>
        <label htmlFor="channel_name">Name:</label>
        <input type="text" id="channel_name" name="name" onChange={this.handleChange} value={this.state.name} />

        <label htmlFor="channel_description">Description:</label>
        <input type="text" id="channel_description" name="description" onChange={this.handleChange} value={this.state.description} />

        <button onClick={this.handleSubmit}>Create</button>
      </form>
    );
  }
}

export default ChannelForm;
