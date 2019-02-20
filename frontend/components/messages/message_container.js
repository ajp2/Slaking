import { connect } from 'react-redux';
import Message from './message';

import { createEmoji, deleteEmoji } from '../../util/emoji_api_util';

const mapStateToProps = (state, ownProps) => ({
  message: ownProps.message,
  currentUserId: state.session.id,
  messageAuthor: id => state.entities.users[id],
  createEmoji: emoji => createEmoji(emoji),
  deleteEmoji: id => deleteEmoji(id)
});

export default connect(mapStateToProps)(Message);