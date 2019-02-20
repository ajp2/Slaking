class Message < ApplicationRecord
  validates :content, :author_id, :channel_id, presence: true

  belongs_to :channel
  has_many :emojis, dependent: :destroy
end