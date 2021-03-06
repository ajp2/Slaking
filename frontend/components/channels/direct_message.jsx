import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export class DirectMessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      users: [],
      existingChannel: undefined
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.filterResults = this.filterResults.bind(this);
    this.channelExists = this.channelExists.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleClick(selectedUser) {
    const inState = this.state.users.some(user => user.id === selectedUser.id);
    if (inState) return;

    const newUsers = this.state.users.slice();
    newUsers.push(selectedUser);
    this.setState({ users: newUsers });
  }

  removeUser(selectedUser) {
    const newUsers = this.state.users.slice().filter(user => user.id !== selectedUser.id);
    this.setState({ users: newUsers });
  }

  // If channel exists with the given name, return it
  channelExists(name) {
    return this.props.allChannels.find(channel => channel.name === name);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.users.length === 0) return;

    // Format list of usernames
    const dmList = this.state.users.slice().concat(this.props.currentUser);
    const namesList = dmList.map(user => user.username).sort().join(', ');

    const existingChannel = this.channelExists(namesList);
    // DM already exists, no need to create a new one; set state to redirect
    if (existingChannel) {
      this.setState({ existingChannel }, this.props.closeModal);
    } else {
      
      // create channel and user channel (for each person in DM)
      const channel = {
        name: namesList,
        description: `Members: ${namesList}`,
        owner_id: this.props.currentUser.id,
        private: true
      };

      this.props.createChannel(channel)
        .then(res => {
          dmList.forEach(user => {
            const userChannel = {
              user_id: user.id,
              channel_id: res.id
            };
            this.props.createUserChannel(userChannel);
          });

          this.setState({ search: "", users: [], existingChannel: res });
          this.props.closeModal();
        });

    }
  }

  filterResults(allUsers) {
    return allUsers.filter(user => user.username.toLowerCase().includes(this.state.search.toLowerCase()));
  }

  render() {
    let allUsers = Object.values(this.props.allUsers);
    const currentUser = allUsers.findIndex(user => user.id === this.props.currentUser.id);
    delete allUsers[currentUser];
    if (this.state.search) {
      allUsers = this.filterResults(allUsers);
    }

    return (
      <div className="all-channels">
        <h3>Direct Message</h3>

        <form className='direct-message-form'>
          <input
            type="text"
            placeholder="Start a conversation"
            name="search"
            onChange={this.handleChange}
            value={this.state.name}
          />

          <button onClick={this.handleSubmit}>Go</button>
        </form>

        <ul className='selected-users-list'>
          {this.state.users.map((user, idx) => (
            <li key={idx}>
              {user.username}
              <span onClick={() => this.removeUser(user)}>X</span>
            </li>
          ))}
        </ul>

        <div className="channel-detail">
          <p>List of users</p>
          <ul>
            {allUsers.map((user, idx) => (
              <li key={idx} onClick={() => this.handleClick(user)}>
                <img src={user.avatarUrl} alt="avatar" />
                <a>{user.username}</a>
              </li>
            ))}
          </ul>
        </div>

        {this.state.existingChannel ? <Redirect to={`/messages/${this.state.existingChannel.id}`} /> : null}

      </div>
    );
  }
}

export default DirectMessageForm;