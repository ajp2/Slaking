class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    # automatically log in guest without requiring password
    @user.password = 'password123' if @user.username == 'guest'
    if @user.save
      login!(@user)
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
    params.require(:user).permit(:username, :email, :password, :avatar_url)
  end
end