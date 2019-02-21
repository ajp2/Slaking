import { RECEIVE_USERS, RECEIVE_CURRENT_USER } from '../../actions/session_actions';
import { RECEIVE_USER_CHANNEL, REMOVE_USER_CHANNEL } from '../../actions/channel_actions';
import { merge } from 'lodash';

const usersReducer = (state = {}, action) => {
  let newState;
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_USERS:
      return action.users;
    case RECEIVE_CURRENT_USER:
      return merge({}, state, { [action.currentUser.id]: action.currentUser });

    case RECEIVE_USER_CHANNEL:
      const currentUserId = action.userChannel.user_id;

      // Not the current user; dispatching a multiple user DM
      if (!state[currentUserId].channel_ids) return state;

      let channel_ids = state[currentUserId].channel_ids.slice();
      channel_ids.push(action.userChannel.channel_id);
      newState = merge({}, state);
      newState[currentUserId].channel_ids = channel_ids;
      return newState;
      
    case REMOVE_USER_CHANNEL:
      newState = merge({}, state);
      let userChannels = state[action.userId].channel_ids.slice();
      
      delete userChannels[userChannels.indexOf(action.channelId)];
      userChannels = userChannels.filter(Boolean);
      newState[action.userId].channel_ids = userChannels;

      return newState;
    default:
      return state;
  }
};

export default usersReducer;