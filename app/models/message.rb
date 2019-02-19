class Message < ApplicationRecord
  validates :content, :author_id, :channel_id, presence: true

  has_many :emojis
end