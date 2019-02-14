import * as MessageAPIUtil from '../util/message_api_util';

export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGE';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE';

const receiveMessages = messages => ({
  type: RECEIVE_MESSAGES,
  messages
});

const receiveMessage = message => ({
  type: RECEIVE_MESSAGE,
  message
});

const removeMessage = id => ({
  type: REMOVE_MESSAGE,
  id
});

export const fetchMessages = channelId => dispatch => MessageAPIUtil.fetchMessages(channelId)
  .then(messages => dispatch(receiveMessages(messages)));

export const createMessage = formMessage => dispatch => MessageAPIUtil.createMessage(formMessage)
  .then(message => dispatch(receiveMessage(message)));

export const updateMessage = (formMessage, id) => dispatch => MessageAPIUtil.updateMessage(formMessage, id)
  .then(message => dispatch(receiveMessage(message)));

export const deleteMessage = id => dispatch => MessageAPIUtil.deleteMessage(id)
  .then(() => dispatch(removeMessage(id)));