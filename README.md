# Slaking

[Slaking](https://cryptic-escarpment-65990.herokuapp.com/) is a slack inspired real time chat application.

![Screenshot](/docs/screenshots/main-screenshot.png)

## Features

### Real Time Messaging

Users are subscribed to a websocket connection whenever they log on. When another user makes a CRUD action on a channel or message, the change is broadcast to all connected users.

```
def update
  @message = Message.find(params[:id])
  if @message.update(message_params)
    message_cable(@message)
    render :show
  else
    render json: @message.errors.full_messages, status: 422
  end
end
```

```
def message_cable(message, broadcast_channel = nil)
  broadcast_channel = "messages#{message.channel_id}" if broadcast_channel.nil?
  ActionCable.server.broadcast(
    broadcast_channel,
    html: html(message)
  )
end
```

The client receives the change, and dispatches a corresponding redux action to change the state. React re-renders, and the change will be displayed without having to reload the page.

### Channels

Users can create channels or direct messages. Both are saved as a Channel in the database, where only the `private` boolean field differs. Users and channels have a many-to-many relationship and are connected throught a `user_channels` join table.

```
<ChannelListContainer channelType='public' channels={publicChannels} />
<ChannelListContainer channelType='private' channels={privateChannels} />
```

![Channels](/docs/screenshots/channels.png)

The redux state loads messages only for the channel the user is currently viewing, and will fetch the other messages on an as-needed basis.

![Direct Message](/docs/screenshots/direct-message.png)

### Profile Pictures

Users can upload a profile picture upon registration. A default image is assigned if they choose not to. Once the sign up form has been submitted, Rails will create a new user and check if it has an included image, and if not, it will attach a chosen default image, and then save the user to the databse. The image is hosted on AWS S3.

```
handleSubmit(e) {
  e.preventDefault();

  let user;
  if (this.props.formType === 'login') {
    user = {
      username: this.state.username,
      password: this.state.password
    };
  } else {
    user = new FormData();
    this.state.avatarFile ? user.append('user[avatar]', this.state.avatarFile) : false;
    user.append('user[username]', this.state.username);
    user.append('user[password]', this.state.password);
  }

  this.props.processForm(user)
    .then(() => this.props.history.push('/messages'));
}
```

```
after_commit :add_default_avatar

def add_default_avatar
  unless self.avatar.attached?
    self.avatar.attach(
      io: File.open("app/assets/images/default_avatar.jpg")),
      filename: 'default_avatar.jpg',
      content_type: "image/jpg"
    )
  end
end
```

## Technologies Used

- Ruby on Rails
- JavaScript
- React
- React Router
- Redux
- jQuery
- PostgeSQL
- AWS S3
- BCrypt
- Websocket (Rails Action Cable)
- Webpack, Babel

## Project Design

Various [documents](https://github.com/ajp2/Slaking/wiki) were created before the project began to plan and design what the end product would include and what it would look like.

These included a minimum viable product list, a sample database schema, a sample redux state, and the frontend and backend routes. [Wireframes](docs/wireframes) were also created.

## Possible Features to Add

- Multiple workspaces
- Search all messages
- Edit and view user profile (and view other users profiles)
- Pinned and starred messages
- Message threads
