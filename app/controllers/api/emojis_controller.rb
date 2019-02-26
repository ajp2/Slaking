class Api::EmojisController < ApplicationController
  before_action :require_logged_in
  
  def create
    @emoji = Emoji.new(emoji_params)
    if @emoji.save
      emoji_cable(@emoji)
      render :show
    else
      render json: @emoji.errors.full_messages, status: 422
    end
  end

  def destroy
    @emoji = Emoji.find(params[:id])
    if @emoji
      @emoji.destroy
      emoji_cable(@emoji)
      render json: {}
    else
      render json: ["No emoji found with that id"]
    end
  end

  private
  def emoji_params
    params.require(:emoji).permit(:content, :author_id, :message_id)
  end

  def emoji_cable(emoji)
    @message = emoji.message
    ActionCable.server.broadcast(
      "messages#{@message.channel_id}",
      html: html(@message)
    )
  end

  def html(message)
    res = ApplicationController.render(
      partial: 'api/messages/message',
      locals: { message: message }
    )
    JSON.parse(res)
  end
end