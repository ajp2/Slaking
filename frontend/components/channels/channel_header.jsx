import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

export class ChannelHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSettings: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.deleteChannel = this.deleteChannel.bind(this);
    this.leaveChannel = this.leaveChannel.bind(this);
  }

  handleClick() {
    this.setState({ showSettings: true }, () => document.addEventListener('click', this.closeMenu));
  }

  closeMenu(e) {
    if (this.settings !== null && !this.settings.contains(e.target)) {
      this.setState({
        showSettings: false
      }, () => document.removeEventListener('click', this.closeMenu));
    }
  }

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
    }
  }

  leaveChannel() {
    // Cannot leave the general channel or any DMs
    if (this.props.channel.name !== 'general' && !this.props.channel.private) {
      this.props.deleteUserChannel(this.props.currentUser.id, this.props.channel.id);
      this.props.history.push('/messages');
    }
  }

  render() {
    const channel_name = this.formatName(this.props.channel.name);

    return (
      <div className='channel-header'>
        <h2># {channel_name}</h2>
        <p>{this.props.channel.description}</p>

        <i className="fas fa-cog settings-dropdown" onClick={this.handleClick} ref={el => (this.settings = el)}></i>
          
        {this.state.showSettings ?
          <div className="header-settings">
            <a onClick={this.leaveChannel}>Leave Channel</a>
            <a onClick={this.deleteChannel}>Delete Channel</a>
          </div>
          : null}
      </div>
    )
  }
}

export default withRouter(ChannelHeader);