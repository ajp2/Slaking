export const createMessage = message => (
  $.ajax({
    method: 'POST',
    url: '/api/messages',
    data: { message }
  })
);

export const fetchMessages = channelId => (
  $.ajax({
    method: 'GET',
    url: '/api/messages',
    data: { channelId }
  })
);

export const updateMessage = (message, id) => (
  $.ajax({
    method: 'PATCH',
    url: `/api/messages/${id}`,
    data: { message }
  })
);

export const deleteMessage = id => (
  $.ajax({
    method: 'DELETE',
    url: `/api/messages/${id}`
  })
);