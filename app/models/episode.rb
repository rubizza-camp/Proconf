class Episode < ApplicationRecord
  validates :title, :date, presence: true

  has_many :timecodes
  has_and_belongs_to_many :authors

  include AASM

  aasm column: 'status' do
    state :draft, initial: true
    state :announcement, :online, :processing, :finished

    event :announcement do
      transitions from: :draft, to: :announcement
    end

    event :online do
      transitions from: :announcement, to: :online
    end

    event :processing do
      transitions from: :online, to: :processing
    end

    event :finished do
      transitions from: :processing, to: :finished
    end
  end
end
