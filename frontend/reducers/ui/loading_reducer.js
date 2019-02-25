import { START_LOADING_ALL_CHANNELS } from '../../actions/channel_actions';
import { RECEIVE_MESSAGES } from '../../actions/message_actions';

const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case START_LOADING_ALL_CHANNELS:
      return true;
    case RECEIVE_MESSAGES:
      return false;
    default:
      return state;
  }
};

export default loadingReducer;