import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

export class ChannelHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSettings: false,
      description: this.props.channel.description,
      editing: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.deleteChannel = this.deleteChannel.bind(this);
    this.leaveChannel = this.leaveChannel.bind(this);
    this.editChannel = this.editChannel.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.createSocket();
  }

  componentDidUpdate() {
    this.createSocket();
  }

  // Socket used to display notification of DM received
  createSocket() {
    this.socket = App.cable.subscriptions.create({
      channel: 'MessageAlertChannel'
    }, {
        received: data => {
          const foundChannel = this.props.findChannel(data.html.channel_id);
          if (foundChannel.private && 
              this.props.currentUser.channel_ids.includes(foundChannel.id) &&
              data.html.author_id !== this.props.currentUser.id) {
                this.notifyDM(data.html);
          }
        }
      });
  }

  notifyDM(message) {
    const user = this.props.messageAuthor(message.author_id);
    this.props.receiveNotification(`You have received a DM from ${user.username}`);
    setTimeout(this.props.clearNotifications, 3000);
  }

  handleClick() {
    this.setState({ showSettings: true }, () => document.addEventListener('click', this.closeMenu));
  }

  // closes channel settings dropdown
  closeMenu(e) {
    if (this.settings !== null && !this.settings.contains(e.target)) {
      this.setState({
        showSettings: false
      }, () => document.removeEventListener('click', this.closeMenu));
    }
  }

  // Removes current user's name from list of names in DM
  formatName(name) {
    if (!this.props.channel.private) return name;
    let formattedName = name.split(', ').filter(username => username !== this.props.currentUser.username);
    return formattedName.join(', ');
  }

  deleteChannel() {
    // Can delete any channels user has created (not the general channel) or any DMs
    if ((this.props.channel.owner_id === this.props.currentUser.id &&
          this.props.channel.name !== 'general') || this.props.channel.private) {
      this.props.deleteChannel(this.props.channel.id);
    } else {
      this.props.receiveChannelErrors('You do not have permission to do that');
      setTimeout(this.props.clearChannelErrors, 2000);
    }
  }

  leaveChannel() {
    // Cannot leave the general channel or any DMs
    if (this.props.channel.name !== 'general' && !this.props.channel.private) {
      this.props.deleteUserChannel(this.props.currentUser.id, this.props.channel.id);
      this.props.history.push('/messages');
    } else {
      this.props.receiveChannelErrors('You cannot leave this channel');
      setTimeout(this.props.clearChannelErrors, 2000);
    }
  }

  editChannel() {
    this.setState({ editing: true });
    this.setState({ description: this.props.channel.description });
  }

  handleChange(e) {
    this.setState({ description: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.editChannel({ description: this.state.description }, this.props.channel.id);
    this.setState({ editing: false });
  }

  render() {
    const channel_name = this.formatName(this.props.channel.name);
    const editForm = () => (
      <form onSubmit={this.handleSubmit}>
        <input
          type='text'
          value={this.state.description}
          onChange={this.handleChange}
        />
      </form>
    )

    return (
      <div className='channel-header'>
        <h2># {channel_name}</h2>
        {this.state.editing ? 
          editForm()
          :
          <p className='description' onClick={this.editChannel}>{this.props.channel.description || 'Add a description'}</p>
        }

        <i className="fas fa-cog settings-dropdown" onClick={this.handleClick} ref={el => (this.settings = el)}></i>
          
        {this.state.showSettings ?
          <div className="header-settings">
            <a onClick={this.leaveChannel}>Leave Channel</a>
            <a onClick={this.deleteChannel}>Delete Channel</a>
          </div>
          : null}

          {this.props.errors.length > 0 ? (
            <ul className='notification errors-list'>
              {this.props.errors.map((err, idx) => <li key={idx}>{err}</li>)}
            </ul>
          ) : false}
        {this.props.notifications.length > 0 ? (
          <ul className='notification receive-dm-list'>
            {this.props.notifications.map((note, idx) => <li key={idx}>{note}</li>)}
          </ul>
        ) : false}
      </div>
    )
  }
}

export default withRouter(ChannelHeader);