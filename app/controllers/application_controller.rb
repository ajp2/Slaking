class ApplicationController < ActionController::Base
  helper_method :current_user, :format_time

  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def login!(user)
    session[:session_token] = user.session_token
  end

  def require_logged_in
    render json: { base: [ 'You must be logged in to do that'] }, status: 401 if current_user.nil?
  end

  def format_time(datetime)
    datetime.strftime('%r')
  end
end
