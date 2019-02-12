class UserChannelsController < ApplicationController
  def create
    @user_channel = UserChannel.new(user_channel_params)
    if @user_channel.save
      render json: @user_channel
    else
      render json: @user_channel.errors.full_messages, status: 422
    end
  end

  def destroy
    # channel id or id?
    @user_channel = UserChannel.where(user_id: params[:currentUser], channel_id: params[:channel_id])
    if @user_channel
      @user_channel.destroy
      render json: {}
    else
      render json: ["Not found"], status: 404
    end
  end

  private
  def user_channel_params
    params.require(:user_channel).permit(:user_id, :channel_id)
  end
end