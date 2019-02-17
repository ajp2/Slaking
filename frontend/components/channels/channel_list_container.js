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

const mapStateToProps = (state, ownProps) => ({
  allChannels: selectAllChannels(state),
  currentUser: state.entities.users[state.session.id],
  channels: ownProps.channels,
  channelType: ownProps.channelType
});

const mapDispatchToProps = dispatch => ({
  createUserChannel: userChannel => dispatch(createUserChannel(userChannel)),
  receiveChannel: channel => dispatch(receiveChannel(channel))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);