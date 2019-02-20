import React, { Component } from 'react';

export class ChannelHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSettings: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  handleClick() {
    this.setState({ showSettings: true }, () => document.addEventListener('click', this.closeMenu));
    console.log(this.state);
  }

  closeMenu(e) {
    if (this.settings !== null && !this.settings.contains(e.target)) {
      this.setState({
        showSettings: false
      }, () => document.removeEventListener('click', this.closeMenu));
    }
  }

  render() {
    return (
      <div className='channel-header'>
        <h2># {this.props.channel.name}</h2>
        <p>{this.props.channel.description}</p>

        <i className="fas fa-cog settings-dropdown" onClick={this.handleClick} ref={el => (this.settings = el)}></i>
          {this.state.showSettings ? 
          <div className="header-settings">
            <a>Edit Channel</a>
            <a>Leave Channel</a>
            <a>Delete Channel</a>
          </div>
          : null}
      </div>
    )
  }
}

export default ChannelHeader;