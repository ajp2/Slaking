class UserChannel < ApplicationRecord
  validates :user_id, :channel_id, presence: true
end