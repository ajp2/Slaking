import { connect } from 'react-redux';
import ChannelHeader from './channel_header';

const mapStateToProps = (state, ownProps) => ({
  channel: state.entities.channels[ownProps.match.params.channelId],
  currentUserId: state.session.id
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelHeader);