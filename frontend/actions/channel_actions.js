import * as ChannelAPIUtil from '../util/channel_api_util';

export const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS';
export const RECEIVE_CHANNEL = 'RECEIVE_CHANNEL';
export const REMOVE_CHANNEL = 'REMOVE_CHANNEL';
export const START_LOADING_ALL_CHANNELS = 'START_LOADING_ALL_CHANNELS';

export const RECEIVE_USER_CHANNEL = 'RECEIVE_USER_CHANNEL';
export const REMOVE_USER_CHANNEL = 'REMOVE_USER_CHANNEL';

export const RECEIVE_CHANNEL_ERRORS = 'RECEIVE_CHANNEL_ERRORS';
export const CLEAR_CHANNEL_ERRORS = 'CLEAR_CHANNEL_ERRORS';

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

export const removeUserChannel = (userId, channelId) => ({
  type: REMOVE_USER_CHANNEL,
  userId,
  channelId
});

export const receiveChannelErrors = errors => ({
  type: RECEIVE_CHANNEL_ERRORS,
  errors
});

export const clearChannelErrors = () => ({
  type: CLEAR_CHANNEL_ERRORS
});

export const startLoadingAllChannels = () => ({
  type: START_LOADING_ALL_CHANNELS
});

export const fetchChannels = () => dispatch => {
  dispatch(startLoadingAllChannels());
  return ChannelAPIUtil.fetchChannels()
    .then(channels => dispatch(receiveChannels(channels)));
};

export const createUserChannel = formUserChannel => dispatch => ChannelAPIUtil.createUserChannel(formUserChannel)
  .then(userChannel => dispatch(receiveUserChannel(userChannel)));

export const deleteUserChannel = (userId, channelId) => dispatch => ChannelAPIUtil.deleteUserChannel(userId, channelId)
  .then(userChannel => dispatch(removeUserChannel(userId, channelId)));