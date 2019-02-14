import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import ChannelListContainer from '../channels/channel_list_container';

export class Messages extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.channelId = this.props.match.params.channelId;
    this.props.fetchMessages(this.channelId);
  }

  componentDidUpdate(prevProps) {
    this.channelId = this.props.match.params.channelId;
    if (prevProps.match.params.channelId !== this.channelId) {
      this.props.fetchMessages(this.channelId);
    }
  }

  render() {
    const { messages } = this.props;

    return (
      <div>
        <h1>Messsages</h1>
        <ul>
          {messages.map((message, idx) => <li key={idx}>{message.content}</li>)}
        </ul>
      </div>
    )
  }
}

export default withRouter(Messages);