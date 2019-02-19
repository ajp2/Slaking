export const createEmoji = emoji => (
  $.ajax({
    method: 'POST',
    url: '/api/emojis',
    data: { emoji }
  })
);

export const deleteEmoji = id => (
  $.ajax({
    method: 'DELETE',
    url: `/api/emojis/${id}`
  })
);