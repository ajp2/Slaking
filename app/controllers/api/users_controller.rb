class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    # automatically log in guest without requiring password
    @user.password = 'password123' if @user.username == 'guest'
    
    if @user.save
      login!(@user)
      join_default_channel(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def index
    @users = User.all
    render :index
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  private
  def user_params
    puts params
    params.require(:user).permit(:username, :password, :avatar)
  end

  # Ensure user joins a channel rather than seeing an empty screen
  def join_default_channel(user)
    default_channel = Channel.find_by(name: "general")
    UserChannel.create(user_id: user.id, channel_id: default_channel.id)
  end
end