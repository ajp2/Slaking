import { connect } from 'react-redux';
import Channels from './channels';

import { fetchChannels, receiveChannel, removeChannel, removeUserChannel } from '../../actions/channel_actions';
import { fetchUsers, fetchCurrentUser } from '../../actions/session_actions';
import { selectAllChannels, selectUserChannels } from '../../reducers/selectors';

const mapStateToProps = state => ({
  channels: selectAllChannels(state),
  userChannels: selectUserChannels(state, state.session.id),
  currentUserId: state.session.id
});

const mapDispatchToProps = dispatch => ({
  fetchChannels: () => dispatch(fetchChannels()),
  fetchUsers: () => dispatch(fetchUsers()),
  fetchCurrentUser: () => dispatch(fetchCurrentUser()),
  receiveChannel: channel => dispatch(receiveChannel(channel)),
  removeChannel: id => dispatch(removeChannel(id)),
  removeUserChannel: (userId, channelId) => dispatch(removeUserChannel(userId, channelId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Channels);