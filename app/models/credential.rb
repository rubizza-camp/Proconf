class Credential < ApplicationRecord
  validates :service, presence: true

  belongs_to :user
end
