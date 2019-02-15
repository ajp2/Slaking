class ThreadsChannel < ApplicationCable::Channel
  def subscribed
    # 'threads' is an alias for the application's channel
    stream_from "threads"
  end
end