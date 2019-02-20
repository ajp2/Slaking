class Api::MessagesController < ApplicationController
  def create
    @message = Message.new(message_params)
    if @message.save
      message_cable(@message)
      render :show
    else
      render json: @message.errors.full_messages, status: 422
    end
  end

  def index
    @messages = Message.where(channel_id: params[:channelId])
    render :index
  end

  def update
    @message = Message.find(params[:id])
    if @message.update(message_params)
      render :show
    else
      render json: @message.errors.full_messages, status: 422
    end
  end

  def destroy
    @message = Message.find(params[:id])
    if @message
      @message.destroy
      delete_message_cable(@message)
      render json: {}
    else
      render json: ["Message does not exist"], status: 404
    end
  end

  private
  def message_params
    params.require(:message).permit(:content, :author_id, :channel_id)
  end

  def message_cable(message)
    @message = message
    ActionCable.server.broadcast(
      "messages#{message.channel_id}",
      html: html(message)
    )
  end

  def html(message)
    res = ApplicationController.render(
      partial: 'api/messages/message',
      locals: { message: message }
    )
    JSON.parse(res)
  end

  def delete_message_cable(message)
    ActionCable.server.broadcast(
      "messages#{message.channel_id}",
      html: {
        id: message.id,
        channel_id: message.channel_id,
        action: 'delete'
      }
    )
  end
end