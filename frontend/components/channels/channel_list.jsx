import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import ChannelFormContainer from './channel_form_container';
import MessagesContainer from '../messages/messages_container';
import AllChannels from './all_channels';
import { createUserChannel } from '../../actions/channel_actions';

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
    console.log("sldfjkasdf");
    console.log(this.state);
    console.log(e.target);
    if (this.state[name] && e.target.classList[0] === 'modal') {
      this.setState({ [name]: false });
    } else {
      this.setState({ [name]: true });
    }
  }

  render() {

    const channelModal = () => (
      <div className="modal" onClick={e => this.handleModalClick(e, 'public')}>
        <AllChannels
          channels={channels}
          currentUser={currentUser}
          createUserChannel={this.props.createUserChannel}
        />
      </div>
    );
    const channelFormModal = () => (
      <div className="modal" onClick={e => this.handleModalClick(e, 'publicForm')}>
        <ChannelFormContainer />
      </div>
    );
    const privateFormModal = () => (
      <div className="modal" onClick={e => this.handleModalClick(e, 'private')}>
        <ChannelFormContainer />
      </div>
    );

    const { channels, currentUser, channelType } = this.props;
    const publicChannel = channelType === 'public';
    const channelText = publicChannel ? 'Channels' : 'Direct Message';
    const formName = publicChannel ? 'publicForm' : 'private';
    
    return (
      <div>

        <div className='channel-text'>
          <h2 onClick={e => this.handleModalClick(e, channelType)}>{channelText}</h2>
          <span onClick={e => this.handleModalClick(e, formName)}>+</span>
        </div>
        <ul>
          {channels.map((channel, idx) => <li key={idx}><Link to={`/messages/${channel.id}`}># {channel.name}</Link></li>)}
        </ul>


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