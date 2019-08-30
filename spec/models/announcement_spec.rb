require 'rails_helper'

RSpec.describe Announcement, type: :model do
  describe 'validations' do
    it { should validate_presence_of :title }
    it { should validate_presence_of :date }
    it { should validate_presence_of :target_resource }

    it { should allow_value('telegram').for(:target_resource) }
    it { should allow_value('twitter').for(:target_resource) }
  end

  describe 'associations' do
    it { should belong_to(:episode) }
  end
end
