import { 
  RECEIVE_CHANNELS,
  RECEIVE_CHANNEL,
  REMOVE_CHANNEL,
} from "../../actions/channel_actions";
import { merge } from "lodash";

const channelsReducer = (state = {}, action) => {
  let newState;
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_CHANNELS:
      return action.channels;
    case RECEIVE_CHANNEL:
      return merge({}, state, { [action.channel.id]: action.channel } );
    case REMOVE_CHANNEL:
      newState = merge({}, state);
      delete newState.action.id;
      return newState;
    default:
      return state;
  }
};

export default channelsReducer;
