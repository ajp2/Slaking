class MessagesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "messages#{params[:channel_room]}"
  end
end