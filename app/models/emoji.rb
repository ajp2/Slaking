class Emoji < ApplicationRecord
  validates :content, :author_id, :message_id, presence: true
  validates :content, uniqueness: { scope: [:author_id, :message_id] }

  belongs_to :message
end