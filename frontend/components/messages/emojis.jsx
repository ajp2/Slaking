import React, { Component } from 'react';
import { Emoji } from 'emoji-mart';

export class Emojis extends Component {
  render() {
    if (!this.props.emojis) return null;
    const emojis = Object.values(this.props.emojis);
    
    return (
      <div className='emoji-bar'>
        {emojis.map(emoji => 
          <Emoji size={16} emoji={emoji.content} key={emoji.id} />
          )}
      </div>
    )
  }
}

export default Emojis;