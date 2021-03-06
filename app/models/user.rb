class User < ApplicationRecord
  attr_reader :password

  validates :username, presence: true, uniqueness: true
  validates :session_token, presence: true, uniqueness: true
  validates :password_digest, presence: { message: "Password can't be blank "}
  validates :password, length: { minimum: 6, allow_nil: true }
  after_initialize :ensure_session_token
  after_commit :add_default_avatar

  has_many :user_channels
  has_many :channels, through: :user_channels
  has_one_attached :avatar

  def add_default_avatar
    unless self.avatar.attached?
      self.avatar.attach(
        io: File.open("app/assets/images/default_avatar.jpg"), 
        filename: 'default_avatar.jpg', 
        content_type: "image/jpg"
      )
    end
  end

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