require 'rails_helper'

RSpec.describe Timecode, type: :model do
  describe 'validations' do
    it { should validate_presence_of :title }
    it { should validate_presence_of :time }
  end

  describe 'associations' do
    it { should belong_to(:episode) }
  end
end
