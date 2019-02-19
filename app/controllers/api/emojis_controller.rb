class EmojisController < ApplicationController
  def create
    @emoji = Emoji.new(emoji_params)
    if @emoji.save
      render :show
    else
      render json: @emoji.errors.full_messages, status: 422
    end
  end

  def destroy
    @emoji = Emoji.find(params[:id])
    if @emoji
      @emoji.destroy
      render json: {}
    else
      render json: ["No emoji found with that id"]
    end
  end

  private
  def emoji_params
    params.require(:emoji).permit(:content, :author_id, :message_id)
  end
end