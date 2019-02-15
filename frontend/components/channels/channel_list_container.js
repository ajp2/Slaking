import { connect } from 'react-redux';
import ChannelList from './channel_list';
import { 
  fetchChannels, 
  receiveChannel, 
  editChannel, 
  deleteChannel ,
  createUserChannel
} from '../../actions/channel_actions';
import { fetchUsers, fetchCurrentUser } from '../../actions/session_actions';
import { selectAllChannels, selectUserChannels } from '../../reducers/selectors';

const mapStateToProps = state => ({
  currentUser: state.entities.users[state.session.id],
  channels: selectAllChannels(state),
  userChannels: selectUserChannels(state, state.session.id)
});

const mapDispatchToProps = dispatch => ({
  fetchChannels: () => dispatch(fetchChannels()),
  fetchUsers: () => dispatch(fetchUsers()),
  fetchCurrentUser: () => dispatch(fetchCurrentUser()),
  createUserChannel: userChannel => dispatch(createUserChannel(userChannel)),
  receiveChannel: channel => dispatch(receiveChannel(channel))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);