class MessageAlertChannel < ApplicationCable::Channel
  def subscribed
    stream_from "message_alert"
  end
end