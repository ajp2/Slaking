class Channel < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  validates :private, inclusion: [true, false]
  validates :owner_id, presence: true

  has_many :user_channels, dependent: :destroy
  has_many :users, through: :user_channels
end