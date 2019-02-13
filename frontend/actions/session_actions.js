import * as SessionAPIUtil from '../util/session_api_util';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';

export const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users
});

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

export const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER
});

export const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

export const fetchUsers = () => dispatch => SessionAPIUtil.fetchUsers()
  .then(
    users => dispatch(receiveUsers(users))
  );

export const fetchCurrentUser = () => (dispatch, getState) => (
  SessionAPIUtil.fetchCurrentUser(getState().session.id)
).then(
  user => dispatch(receiveCurrentUser(user))
);

export const login = formUser => dispatch => SessionAPIUtil.login(formUser)
  .then(
    user => dispatch(receiveCurrentUser(user),
    err => dispatch(receiveErrors(err.responseJSON)))
  );

export const signup = formUser => dispatch => SessionAPIUtil.signup(formUser)
  .then(
    user => dispatch(receiveCurrentUser(user),
    err => dispatch(receiveErrors(err.responseJSON))
  ));

export const logout = () => dispatch => SessionAPIUtil.logout()
  .then(
    () => dispatch(logoutCurrentUser(),
    err => dispatch(receiveErrors(err.responseJSON))
  ));