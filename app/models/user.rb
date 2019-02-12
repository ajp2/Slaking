class User < ApplicationRecord
  attr_reader :password

  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
  validates :session_token, presence: true, uniqueness: true
  validates :password_digest, presence: { message: "Password can't be blank "}
  validates :password, length: { minimum: 6, allow_nil: true }
  after_initialize :ensure_session_token

  has_many :user_channels
  has_many :channels, through: :user_channels

  def self.find_by_credentials(username, password)
    @user = User.find_by(username: username)
    @user && @user.is_password?(password) ? @user : nil
  end

  def self.generate_session_token
    SecureRandom::urlsafe_base64(16)
  end

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save
    self.session_token
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end
end