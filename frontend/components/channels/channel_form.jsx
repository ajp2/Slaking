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
      .then(res => {
        const userChannel = {
          user_id: res.owner_id,
          channel_id: res.id
        };
        this.props.createUserChannel(userChannel);

        this.setState({ name: "", description: "" });
      });
  }

  render() {
    return (
      <form className='form'>
        <h2>Create Channel</h2>

        <input 
          type="text" 
          placeholder="Channel Name" 
          name="name" 
          onChange={this.handleChange}
          value={this.state.name} 
        />

        <input 
          type="text" 
          placeholder="Channel Description" 
          name="description" 
          onChange={this.handleChange} 
          value={this.state.description} 
        />

        <button onClick={this.handleSubmit}>Create</button>
      </form>
    );
  }
}

export default ChannelForm;
