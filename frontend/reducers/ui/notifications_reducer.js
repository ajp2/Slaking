import { RECEIVE_NOTIFICATION, CLEAR_NOTIFICATIONS } from '../../actions/notification_actions';

const notificationsReducer = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_NOTIFICATION:
      return action.notification;
    case CLEAR_NOTIFICATIONS:
      return [];
    default:
      return state;
  }
};

export default notificationsReducer;