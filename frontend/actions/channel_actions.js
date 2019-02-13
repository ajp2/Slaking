import * as ChannelAPIUtil from '../util/channel_api_util';

export const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS';
export const RECEIVE_CHANNEL = 'RECEIVE_CHANNEL';
export const REMOVE_CHANNEL = 'REMOVE_CHANNEL';

export const RECEIVE_USER_CHANNEL = 'RECEIVE_USER_CHANNEL';
export const REMOVE_USER_CHANNEL = 'REMOVE_USER_CHANNEL';

export const receiveChannels = channels => ({
  type: RECEIVE_CHANNELS,
  channels
});

export const receiveChannel = channel => ({
  type: RECEIVE_CHANNEL,
  channel
});

export const removeChannel = id => ({
  type: REMOVE_CHANNEL,
  id
});

export const receiveUserChannel = userChannel => ({
  type: RECEIVE_USER_CHANNEL,
  userChannel
});

export const fetchChannels = () => dispatch => ChannelAPIUtil.fetchChannels()
  .then(channels => dispatch(receiveChannels(channels)));

export const createChannel = formChannel => dispatch => ChannelAPIUtil.createChannel(formChannel)
  .then(channel => dispatch(receiveChannel(channel)));

export const editChannel = formChannel => dispatch => ChannelAPIUtil.editChannel(formChannel)
  .then(channel => dispatch(receiveChannel(channel)));

export const deleteChannel = id => dispatch => ChannelAPIUtil.deleteChannel(id)
  .then(() => dispatch(deleteChannel(id)));

export const createUserChannel = formUserChannel => dispatch => ChannelAPIUtil.createUserChannel(formUserChannel)
  .then(userChannel => dispatch(receiveUserChannel(userChannel)));