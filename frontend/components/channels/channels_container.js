import { connect } from 'react-redux';
import Channels from './channels';

import { fetchChannels, receiveChannel } from '../../actions/channel_actions';
import { fetchUsers, fetchCurrentUser } from '../../actions/session_actions';
import { selectAllChannels, selectUserChannels } from '../../reducers/selectors';

const mapStateToProps = state => ({
  channels: selectAllChannels(state),
  userChannels: selectUserChannels(state, state.session.id)
});

const mapDispatchToProps = dispatch => ({
  fetchChannels: () => dispatch(fetchChannels()),
  fetchUsers: () => dispatch(fetchUsers()),
  fetchCurrentUser: () => dispatch(fetchCurrentUser()),
  receiveChannel: channel => dispatch(receiveChannel(channel))
});

export default connect(mapStateToProps, mapDispatchToProps)(Channels);