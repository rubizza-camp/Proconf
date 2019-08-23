require 'rails_helper'

RSpec.describe Episode, type: :model do
  describe 'validations' do
    it { should validate_presence_of :title }
    it { should validate_presence_of :date }
  end

  describe 'associations' do
    it { should have_many(:announcements) }
    it { should have_many(:timecodes) }
    it { should have_and_belong_to_many(:authors) }
  end
end
