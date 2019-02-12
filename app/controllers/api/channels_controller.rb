class Api::ChannelsController < ApplicationController
  def create
    @channel = Channel.new(channel_params)
    if @channel.save
      render :show
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end

  def index
    @channels = Channel.all
    render :index
  end

  def update
    @channel = Channel.find(params[:id])
    if @channel.update(channel_params)
      render :show
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end

  def destroy
    @channel = Channel.find(params[:id])
    if @channel
      @channel.destroy
      render json: {}
    else
      render json: ["Channel does not exist"], status: 404
    end
  end

  private
  def channel_params
    params.require(:channel).permit(:name, :description, :private, :owner_id)
  end
end