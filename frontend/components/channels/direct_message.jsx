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
    this.filterResults = this.filterResults.bind(this);
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

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.users.length === 0) return;
    
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

  filterResults(allUsers) {
    return allUsers.filter(user => user.username.includes(this.state.search));
  }

  render() {
    let allUsers = Object.values(this.props.allUsers);
    const currentUser = allUsers.findIndex(user => user.id === this.props.currentUserId);
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
          <ul>
            {allUsers.map((user, idx) => (
              <li key={idx} onClick={() => this.handleClick(user)}>
                <a>{user.username}</a>
              </li>
            ))}
          </ul>
        </div>

      </div>
    );
  }
}

export default DirectMessageForm;
