import React, { Component } from 'react';

import ChannelListContainer from '../channels/channel_list_container';

export class Messages extends Component {
  render() {
    return (
      <div>
        <ChannelListContainer />
      </div>
    )
  }
}

export default Messages;