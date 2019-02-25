import notificationsReducer from './notifications_reducer';
import { combineReducers } from 'redux';

const uiReducer = combineReducers({
  notifications: notificationsReducer
});

export default uiReducer;