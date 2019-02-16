import React, { Component } from 'react';

export class DirectMessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      users: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    // const channel = {
    //   ...this.state,
    //   owner_id: this.props.currentUserId
    // };

    // this.props.createChannel(channel)
    //   .then(res => {
    //     const userChannel = {
    //       user_id: res.owner_id,
    //       channel_id: res.id
    //     };
    //     this.props.createUserChannel(userChannel);

    //     this.setState({ name: "", description: "" });
    //   });
  }

  render() {
    const allUsers = Object.values(this.props.allUsers);
    console.log(allUsers);

    return (
      // fetchUsers; list all users to DM, can add multiple
      // search bar to search users
      
      <form className='form direct-message-form'>
        <h2>Direct Message</h2>

        <input
          type="text"
          placeholder="Start a conversation"
          name="search"
          onChange={this.handleChange}
          value={this.state.name}
        />

        <button onClick={this.handleSubmit}>Go</button>

        <ul>
          {allUsers.map((user, idx) => <li key={idx}>{user.username}</li>)}
        </ul>

      </form>
    );
  }
}

export default DirectMessageForm;
