class Episode < ApplicationRecord
  validates :title, :date, presence: true

  has_many :timecodes
  has_and_belongs_to_many :authors
end
