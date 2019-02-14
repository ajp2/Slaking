import { connect } from 'react-redux';
import Messages from './messages';
import { fetchMessages } from '../../actions/message_actions';
import { selectAllMessages } from '../../reducers/selectors';

const mapStateToProps = state => ({
  messages: selectAllMessages(state)
});

const mapDispatchToProps = dispatch => ({
  fetchMessages: id => dispatch(fetchMessages(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Messages);