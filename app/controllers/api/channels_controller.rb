class Api::ChannelsController < ApplicationController
  before_action :require_logged_in
  
  def create
    @channel = Channel.new(channel_params)
    if @channel.save
      channel_cable(@channel)
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
      channel_cable(@channel)
      render :show
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end

  def destroy
    @channel = Channel.find(params[:id])
    if @channel
      @channel.destroy
      delete_channel_cable(@channel)
      render json: {}
    else
      render json: ["Channel does not exist"], status: 404
    end
  end

  private
  def channel_params
    params.require(:channel).permit(:name, :description, :private, :owner_id)
  end

  def channel_cable(channel)
    ActionCable.server.broadcast(
      "threads",
      id: channel.id,
      name: channel.name,
      description: channel.description,
      private: channel.private,
      owner_id: channel.owner_id
    )
  end

  def delete_channel_cable(channel)
    ActionCable.server.broadcast(
      "threads",
      id: channel.id,
      action: 'delete'
    )
  end
end