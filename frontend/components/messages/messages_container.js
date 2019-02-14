import { connect } from 'react-redux';
import Messages from './messages';
import { fetchMessages, createMessage } from '../../actions/message_actions';
import { selectAllMessages } from '../../reducers/selectors';

const mapStateToProps = state => ({
  messages: selectAllMessages(state),
  currentUser: state.session.id
});

const mapDispatchToProps = dispatch => ({
  fetchMessages: id => dispatch(fetchMessages(id)),
  createMessage: message => dispatch(createMessage(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(Messages);