import { connect } from 'react-redux';
import ChannelList from './channel_list';
import { 
  fetchChannels, 
  createChannel, 
  editChannel, 
  deleteChannel 
} from '../../actions/channel_actions';
import { selectAllChannels } from '../../reducers/selectors';

const mapStateToProps = state => ({
  channels: selectAllChannels(state)
});

const mapDispatchToProps = dispatch => ({
  fetchChannels: () => dispatch(fetchChannels())
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);