import { START_LOADING_ALL_CHANNELS } from '../../actions/channel_actions';
import { RECEIVE_MESSAGES } from '../../actions/message_actions';

const loadingReducer = (state = true, action) => {
  switch (action.type) {
    case RECEIVE_MESSAGES:
      return false;
    default:
      return state;
  }
};

export default loadingReducer;