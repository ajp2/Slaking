json.partial! "api/users/user", user: @user
json.channel_ids do
  json.array! @user.channels.map(&:id)
end