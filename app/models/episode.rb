class Episode < ApplicationRecord
  validates :title, :date, presence: true

  has_many :timecodes
  belongs_to :status
  has_and_belongs_to_many :authors
end
