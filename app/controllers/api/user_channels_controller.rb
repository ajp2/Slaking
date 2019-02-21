class Api::UserChannelsController < ApplicationController
  before_action :require_logged_in

  def create
    @user_channel = UserChannel.new(user_channel_params)
    if @user_channel.save
      render json: @user_channel
    else
      render json: @user_channel.errors.full_messages, status: 422
    end
  end

  def find_and_destroy
    @user_channel = UserChannel.where("user_id = ? AND channel_id = ?", params[:userId], params[:channelId]).first
    puts @user_channel
    if @user_channel
      @user_channel.destroy
      render json: {}
    else
      render json: ["Not found"], status: 404
    end
  end

  private
  def user_channel_params
    params.require(:userChannel).permit(:user_id, :channel_id)
  end
end