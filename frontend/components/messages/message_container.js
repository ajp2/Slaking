import { connect } from 'react-redux';
import Message from './message';

import { createEmoji, deleteEmoji } from '../../util/emoji_api_util';
import { deleteMessage, updateMessage } from '../../util/message_api_util';
import { receiveMessageErrors, clearMessageErrors } from '../../actions/message_actions';

const mapStateToProps = (state, ownProps) => ({
  message: ownProps.message,
  currentUserId: state.session.id,
  messageAuthor: id => state.entities.users[id],
  createEmoji: emoji => createEmoji(emoji),
  deleteEmoji: id => deleteEmoji(id),
  deleteMessage: id => deleteMessage(id),
  updateMessage: (message, id) => updateMessage(message, id)
});

const mapDispatchToProps = dispatch => ({
  receiveMessageErrors: error => dispatch(receiveMessageErrors([error])),
  clearMessageErrors: () => dispatch(clearMessageErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(Message);