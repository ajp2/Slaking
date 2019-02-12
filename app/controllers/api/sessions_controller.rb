class Api::SessionsController < ApplicationController
  def create
    username = params[:user][:username]
    password = username == "guest" ? "password123" : params[:user][:password]
    @user = User.find_by_credentials(
      username,
      password
    )
    if @user
      login!(@user)
      render "api/users/show"
    else
      render json: ["Invalid credentials"], status: 401
    end
  end

  def destroy
    if current_user
      current_user.reset_session_token!
      session[:session_token] = nil
      render json: {}
    else
      render json: ["Not logged in"], status: 404
    end
  end


end