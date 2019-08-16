class Announcement < ApplicationRecord
  validates :title, :date, :target_resource, presence: true
  validates :target_resource, inclusion: { in: %w[telegram twitter], message: '%{value} is not a valid resourse' }

  belongs_to :episode
end
