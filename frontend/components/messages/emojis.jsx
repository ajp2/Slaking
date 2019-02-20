import React, { Component } from 'react';
import { Emoji } from 'emoji-mart';

export class Emojis extends Component {
  formatEmojis(emojis) {
    const formatted = {};
    Object.values(emojis).forEach(emoji => {
      if (!formatted[emoji.content]) {
        formatted[emoji.content] = {
          id: emoji.id,
          content: emoji.content,
          author_ids: [emoji.author_id],
          frequency: 1
        };
      } else {
        formatted[emoji.content].frequency += 1;
        formatted[emoji.content].author_ids.push(emoji.author_id);
      }
    });
    return Object.values(formatted);
  }

  formatEmojiText(emoji) {
    const usernames = emoji.author_ids.map((id, idx) => {
      const length = emoji.author_ids.length;
      const prefix = (idx === length - 1 && length > 1) ? 'and ' : '';
      if (id === this.props.currentUserId) {
        return prefix + 'you';
      }
      return prefix + this.props.messageAuthor(id).username;
    });

    return usernames.join(', ') + ' reacted with ' + emoji.content;
  }

  toggleEmoji(emoji) {
    if (emoji.author_ids.includes(this.props.currentUserId)) {
      console.log(emoji);
    } else {
      console.log("adding emoji");
      
    }
  }

  render() {
    if (!this.props.emojis) return null;
    const emojis = this.formatEmojis(this.props.emojis);
    
    return (
      <div className='emoji-bar'>
        {emojis.map(emoji => 
          <span className='emoji-item' onClick={() => this.toggleEmoji(emoji)} key={emoji.id} data-title={this.formatEmojiText(emoji)}>
            <Emoji size={16} emoji={emoji.content} />
            <span className='emoji-num'>{emoji.frequency}</span>
          </span>
          )}
      </div>
    )
  }
}

export default Emojis;