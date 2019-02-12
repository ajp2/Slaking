class Channel < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  validates :private, inclusion: [true, false]
  validates :owner_id, presence: true
end