import { connect } from 'react-redux';
import ChannelForm from './channel_form';
import { createChannel, createUserChannel } from '../../actions/channel_actions';

const mapStateToProps = state => ({
  currentUserId: state.session.id
});

const mapDispatchToProps = dispatch => ({
  createChannel: channel => dispatch(createChannel(channel)),
  createUserChannel: userChannel => dispatch(createUserChannel(userChannel))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelForm);