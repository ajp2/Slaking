import {
  RECEIVE_MESSAGES,
  RECEIVE_MESSAGE,
  REMOVE_MESSAGE
} from "../../actions/message_actions";
import { merge } from "lodash";

const messagesReducer = (state = {}, action) => {
  let newState;
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_MESSAGES:
      return action.messages;
    case RECEIVE_MESSAGE:
      newState = merge({}, state, { [action.message.id]: action.message });
      newState[action.message.id].emojis = merge({}, action.message.emojis);
      return newState;
    case REMOVE_MESSAGE:
      newState = merge({}, state);
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
};

export default messagesReducer;
