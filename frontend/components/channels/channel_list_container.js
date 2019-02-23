import { connect } from 'react-redux';
import ChannelList from './channel_list';
import { 
  receiveChannel, 
  createUserChannel
} from '../../actions/channel_actions';
import { selectAllChannels } from '../../reducers/selectors';

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