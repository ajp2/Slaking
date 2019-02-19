export const fetchUsers = () => (
  $.ajax({
    method: 'GET',
    url: '/api/users'
  })
);

export const fetchCurrentUser = id => (
  $.ajax({
    method: 'GET',
    url: `/api/users/${id}`,
  })
)

export const signup = user => (
  $.ajax({
    method: 'POST',
    url: '/api/users',
    data: user,
    contentType: false,
    processData: false
  })
);

export const login = user => (
  $.ajax({
    method: 'POST',
    url: '/api/session',
    data: { user }
  })
);

export const logout = () => (
  $.ajax({
    method: 'DELETE',
    url: '/api/session'
  })
);