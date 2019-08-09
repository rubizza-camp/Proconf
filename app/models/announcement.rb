class Announcement < ApplicationRecord
  validates :title, :date, :target_resource, presence: true

  belongs_to :episode
end
