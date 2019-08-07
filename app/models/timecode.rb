class Timecode < ApplicationRecord
  validates :title, :time, presence: true

  belongs_to :episode
end
