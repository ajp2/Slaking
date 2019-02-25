export const RECEIVE_NOTIFICATION = 'RECEIVE_NOTIFICATION';
export const CLEAR_NOTIFICATIONS = 'CLEAR_NOTIFICATIONS';

export const receiveNotification = notification => ({
  type: RECEIVE_NOTIFICATION,
  notification
});

export const clearNotifications = () => ({
  type: CLEAR_NOTIFICATIONS
});