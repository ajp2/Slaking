import { combineReducers } from 'redux';
import notificationsReducer from './notifications_reducer';
import loadingReducer from './loading_reducer';

const uiReducer = combineReducers({
  notifications: notificationsReducer,
  loading: loadingReducer
});

export default uiReducer;