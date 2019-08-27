class Guest < ApplicationRecord
  validates :name, :surname, presence: true
  has_and_belongs_to_many :episodes
end
