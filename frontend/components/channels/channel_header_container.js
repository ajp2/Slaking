import { connect } from 'react-redux';
import ChannelHeader from './channel_header';
import { deleteChannel } from '../../util/channel_api_util';

const mapStateToProps = (state, ownProps) => ({
  channel: state.entities.channels[ownProps.match.params.channelId],
  currentUser: state.entities.users[state.session.id],
  deleteChannel: id => deleteChannel(id)
});


export default connect(
  mapStateToProps
)(ChannelHeader);