# Slaking

[Slaking](https://cryptic-escarpment-65990.herokuapp.com/) is a slack inspired real time chat application

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
Users can create channels or direct messages. Both are saved as a Channel in the database, where only the `private` boolean field differs.

Messages belong to a channel, and the redux state only loads messages for the current channel the user is viewing.

### Profile Pictures
Users can upload a profile picture upon registration. A default image is assigned if they choose not to.

The image is hosted on AWS S3.

## Technologies Used
* Ruby on Rails
* JavaScript
* React
* React Router
* Redux
* jQuery
* PostgeSQL
* AWS S3
* BCrypt
* Websocket (Rails Action Cable)
* Webpack, Babel