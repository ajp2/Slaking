import { connect } from 'react-redux';
import ChannelHeader from './channel_header';
import { deleteChannel, editChannel } from '../../util/channel_api_util';
import { deleteUserChannel, receiveChannelErrors, clearChannelErrors } from '../../actions/channel_actions';
import { receiveNotification, clearNotifications } from '../../actions/notification_actions';

const mapStateToProps = (state, ownProps) => ({
  channel: state.entities.channels[ownProps.match.params.channelId],
  currentUser: state.entities.users[state.session.id],
  deleteChannel: id => deleteChannel(id),
  editChannel: (channel, id) => editChannel(channel, id),
  errors: state.errors.messageErrors.concat(state.errors.channelErrors),
  findChannel: id => state.entities.channels[id],
  messageAuthor: id => state.entities.users[id],
  notifications: state.ui.notifications
});

const mapDispatchToProps = dispatch => ({
  deleteUserChannel: (userId, channelId) => dispatch(deleteUserChannel(userId, channelId)),
  receiveChannelErrors: error => dispatch(receiveChannelErrors([error])),
  clearChannelErrors: () => dispatch(clearChannelErrors()),
  receiveNotification: notification => dispatch(receiveNotification([notification])),
  clearNotifications: () => dispatch(clearNotifications())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelHeader);