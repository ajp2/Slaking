import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ChannelFormContainer from './channel_form_container';
import DirectMessageContainer from './direct_message_container';
import AllChannels from './all_channels';

export class ChannelList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      public: false,
      publicForm: false,
      private: false
    };
  }

  handleModalClick(e, name) {
    if (e.target.classList[0] === 'modal') {
      this.setState({ [name]: false });
    }
  }

  toggleModal(name) {
    this.setState({ [name]: !this.state[name] });
  }

  formatName(name) {
    if (this.props.channelType === 'public') return name;
    let formattedName = name.split(', ').filter(username => username !== this.props.currentUser.username);
    return formattedName.length > 1 ? formattedName[0] + ' ...' : formattedName[0];
  }

  render() {
    const { channels, currentUser, channelType } = this.props;
    const publicChannel = channelType === 'public';
    const channelText = publicChannel ? 'Channels' : 'Direct Message';
    const formName = publicChannel ? 'publicForm' : 'private';

    const channelModal = () => (
      <div className="modal" onClick={e => this.handleModalClick(e, 'public')}>
        <AllChannels
          channels={this.props.allChannels}
          currentUser={currentUser}
          createUserChannel={this.props.createUserChannel}
          closeModal={() => this.toggleModal('public')}
        />
      </div>
    );
    const channelFormModal = () => (
      <div className="modal" onClick={e => this.handleModalClick(e, 'publicForm')}>
        <ChannelFormContainer closeModal={() => this.toggleModal('publicForm')} />
      </div>
    );
    const privateFormModal = () => (
      <div className="modal" onClick={e => this.handleModalClick(e, 'private')}>
        <DirectMessageContainer closeModal={() => this.toggleModal('private')} />
      </div>
    );
    
    return (
      <div>
        <div className="channel-list">
          <div className='channel-text'>
            <h2 onClick={e => this.toggleModal(channelType)}>{channelText}</h2>
            <span onClick={e => this.toggleModal(formName)}>+</span>
          </div>
          <ul>
            {channels.map((channel, idx) => <li key={idx}><Link to={`/messages/${channel.id}`}># {this.formatName(channel.name)}</Link></li>)}
          </ul>
        </div>


        {/* List of all channels (opens modal) */}
        {this.state.public ?  channelModal() : null}

        {/* Form to create new channel (opens modal) */}
        {this.state.publicForm ? channelFormModal() : null}

        {/* Form to create a direct message (opens modal) */}
        {this.state.private ? privateFormModal() : null}

      </div>
    )
  }
}

export default ChannelList;