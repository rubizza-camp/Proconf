require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'validations' do
    it { should validate_presence_of :email }
    it { should validate_presence_of :password }
  end

  describe 'associations' do
    it { should belong_to(:role) }
    it { should have_many(:credentials) }
  end
 end
