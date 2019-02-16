import { connect } from 'react-redux';
import DirectMessage from './direct_message';
import { createUserChannel } from '../../actions/channel_actions';
import { createChannel } from '../../util/channel_api_util';

const mapStateToProps = state => ({
  currentUserId: state.session.id,
  allUsers: state.entities.users,
  createChannel: channel => createChannel(channel)
});

const mapDispatchToProps = dispatch => ({
  createUserChannel: userChannel => dispatch(createUserChannel(userChannel))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DirectMessage);