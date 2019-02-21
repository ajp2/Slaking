import { connect } from 'react-redux';
import Channels from './channels';

import { fetchChannels, receiveChannel, removeChannel, removeUserChannel } from '../../actions/channel_actions';
import { fetchUsers, fetchCurrentUser, logout } from '../../actions/session_actions';
import { selectAllChannels, selectUserChannels } from '../../reducers/selectors';

const mapStateToProps = state => ({
  channels: selectAllChannels(state),
  userChannels: selectUserChannels(state, state.session.id),
  currentUser: state.entities.users[state.session.id]
});

const mapDispatchToProps = dispatch => ({
  fetchChannels: () => dispatch(fetchChannels()),
  fetchUsers: () => dispatch(fetchUsers()),
  fetchCurrentUser: () => dispatch(fetchCurrentUser()),
  receiveChannel: channel => dispatch(receiveChannel(channel)),
  removeChannel: id => dispatch(removeChannel(id)),
  removeUserChannel: (userId, channelId) => dispatch(removeUserChannel(userId, channelId)),
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Channels);