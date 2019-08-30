class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  belongs_to :role
  has_many :credentials

  alias authenticate valid_password?

  def self.from_token_payload(payload)
    find payload['sub']
  end
end
