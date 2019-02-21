export const fetchChannels = () => (
  $.ajax({
    method: 'GET',
    url: '/api/channels',
  })
);

export const createChannel = channel => (
  $.ajax({
    method: 'POST',
    url: '/api/channels',
    data: { channel }
  })
);

export const editChannel = (channel, id) => (
  $.ajax({
    method: 'PATCH',
    url: `/api/channels/${id}`,
    data: { channel }
  })
);

export const deleteChannel = id => (
  $.ajax({
    method: 'DELETE',
    url: `/api/channels/${id}`
  })
);

export const createUserChannel = userChannel => (
  $.ajax({
    method: 'POST',
    url: '/api/user_channels',
    data: { userChannel }
  })
);

export const deleteUserChannel = (userId, channelId) => (
  $.ajax({
    method: 'GET',
    url: '/api/user_channels/find_and_destroy',
    data: { userId, channelId }
  })
);