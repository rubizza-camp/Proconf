class Status < ApplicationRecord
  validates :name, presence: true

  has_many :episodes
end
