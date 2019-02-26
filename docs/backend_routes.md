# Backend Routes

## HTML

* `GET /` `StaticPagesController#root`

## API Endpoints

### `users`

* `GET /api/users` - returns user information
* `POST /api/uses` - sign up

### `session`

* `GET /api/session` - log in
* `DELETE /api/session` - log out

### `channels`

* `GET /api/channels` - returns all channels, filtered by data: currentUser
* `POST api/channels` - create channel
* `GET /api/channels/:channelId` - return channel
* `PATCH /api/channels/:channelId` - edit channel
* `DELETE /api/channels/:channelId` - delete channel

### `user_channels`

* `POST /api/channels/:channelId/user_channels` - join channel
* `DELETE /apichannels/:channelId/user_channels/` - leave channel

### `messages`

* `GET /api/messages` - returns all messages, filtered by data: currentChannel/params
* `POST /api/messages` - create message
* `PATCH api/messages/:id` - edit message
* `DELETE /api/messages/:id` - delete message


### `emojis`

* `POST /api/emojis` - add emoji
* `DELETE api/emojis/:id` - delete emoji
