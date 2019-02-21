import { connect } from 'react-redux';
import ChannelHeader from './channel_header';
import { deleteChannel, editChannel } from '../../util/channel_api_util';
import { deleteUserChannel } from '../../actions/channel_actions';

const mapStateToProps = (state, ownProps) => ({
  channel: state.entities.channels[ownProps.match.params.channelId],
  currentUser: state.entities.users[state.session.id],
  deleteChannel: id => deleteChannel(id),
  editChannel: (channel, id) => editChannel(channel, id)
});

const mapDispatchToProps = dispatch => ({
  deleteUserChannel: (userId, channelId) => dispatch(deleteUserChannel(userId, channelId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelHeader);