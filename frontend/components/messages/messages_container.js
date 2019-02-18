import { connect } from 'react-redux';
import Messages from './messages';
import { fetchMessages, receiveMessage } from '../../actions/message_actions';
import { createMessage } from '../../util/message_api_util';
import { selectAllMessages } from '../../reducers/selectors';

const mapStateToProps = state => ({
  messages: selectAllMessages(state),
  currentUser: state.entities.users[state.session.id],
  createMessage: message => createMessage(message),
  messageAuthor: id => state.entities.users[id]
});

const mapDispatchToProps = dispatch => ({
  fetchMessages: id => dispatch(fetchMessages(id)),
  receiveMessage: message => dispatch(receiveMessage(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(Messages);