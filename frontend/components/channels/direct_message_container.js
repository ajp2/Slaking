import { connect } from 'react-redux';
import DirectMessage from './direct_message';
import { createChannel, createUserChannel } from '../../util/channel_api_util';
import { selectAllChannels } from '../../reducers/selectors';

const mapStateToProps = (state, ownProps) => ({
  closeModal: ownProps.closeModal,
  currentUser: state.entities.users[state.session.id],
  allUsers: state.entities.users,
  createChannel: channel => createChannel(channel),
  allChannels: selectAllChannels(state),
  createUserChannel: userChannel => createUserChannel(userChannel)
});

export default connect(
  mapStateToProps
)(DirectMessage);