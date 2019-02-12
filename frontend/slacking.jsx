import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';

import { fetchAllChannels, createChannel, editChannel, deleteChannel } from './util/channel_api_util';

document.addEventListener('DOMContentLoaded', () => {
  let store;
  
  if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: {
          [window.currentUser.id]: window.currentUser
        }
      },
      session: {
        id: window.currentUser.id
      }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  // Testing
  window.fetchAllChannels = fetchAllChannels;
  window.createChannel = createChannel;
  window.editChannel = editChannel;
  window.deleteChannel = deleteChannel;
  // End testing

  const rootEl = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, rootEl);
});