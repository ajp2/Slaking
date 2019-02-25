class ThreadsChannel < ApplicationCable::Channel
  def subscribed
    # 'threads' is an alias for a Slaking channel
    stream_from "threads"
  end
end