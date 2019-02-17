import React, { Component } from 'react'

export class ChannelHeader extends Component {
  render() {
    console.log(this.props.channel);
    return (
      <div className='channel-header'>
        <h2>{this.props.channel.name}</h2>
        <p>{this.props.channel.description}</p>

        <button>Edit Channel</button>
        <button>Leave Channel</button>
        <button>Delete Channel</button>
      </div>
    )
  }
}

export default ChannelHeader
