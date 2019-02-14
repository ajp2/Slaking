export const selectAllChannels = state => (
  Object.values(state.entities.channels)
);

export const selectUserChannels = (state, userId) => {
  const channelIds = state.entities.users[userId].channel_ids;
  if (channelIds) {
    return channelIds.map(id => state.entities.channels[id]);
  }
};

export const selectAllMessages = state => (
  Object.values(state.entities.messages)
);